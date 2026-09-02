// Authoritative Server-Side Pricing Engine
import { prisma } from './prisma';

export interface CustomizationPayload {
  productId: string;
  size: string;
  sleeve: string; // 'Short Sleeve' | 'Long Sleeve'
  patchName?: string;
  customName?: string;
  customNumber?: string;
  quantity: number;
}

export interface CalculationResult {
  basePrice: number;
  sleeveFee: number;
  patchFee: number;
  customPrintFee: number;
  unitPrice: number;
  totalPrice: number;
  productName: string;
}

export async function calculateItemPrice(item: CustomizationPayload): Promise<CalculationResult> {
  const product = await prisma.product.findUnique({
    where: { id: item.productId },
  });

  if (!product) {
    throw new Error(`Product with ID ${item.productId} not found.`);
  }

  const basePrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.basePrice;

  // Sleeve fee look-up
  let sleeveFee = 0;
  if (item.sleeve) {
    const sleeveRecord = await prisma.sleeveType.findUnique({
      where: { name: item.sleeve },
    });
    if (sleeveRecord) sleeveFee = sleeveRecord.additionalPrice;
    else if (item.sleeve === 'Long Sleeve') sleeveFee = 15.00;
  }

  // Patch fee look-up
  let patchFee = 0;
  if (item.patchName) {
    const patchRecord = await prisma.patch.findUnique({
      where: { name: item.patchName },
    });
    if (patchRecord) patchFee = patchRecord.price;
    else if (item.patchName !== 'No Patch') patchFee = 25.00;
  }

  // Custom Print Fee (Name & Number package)
  let customPrintFee = 0;
  if (item.customName || item.customNumber) {
    customPrintFee = 20.00; // Standard $20 customization package
  }

  const unitPrice = basePrice + sleeveFee + patchFee + customPrintFee;
  const totalPrice = unitPrice * Math.max(1, item.quantity);

  return {
    basePrice,
    sleeveFee,
    patchFee,
    customPrintFee,
    unitPrice,
    totalPrice,
    productName: product.name,
  };
}

export async function calculateOrderTotal(items: CustomizationPayload[], shippingAddressCity: string) {
  let subtotal = 0;
  const calculatedItems = [];

  for (const item of items) {
    const calc = await calculateItemPrice(item);
    subtotal += calc.totalPrice;
    calculatedItems.push({
      ...item,
      calc,
    });
  }

  // Dynamic Shipping Charge (Inside Dhaka $3.00, Outside Dhaka $5.00)
  const isDhaka = shippingAddressCity.toLowerCase().includes('dhaka');
  const shippingFee = subtotal > 150 ? 0 : (isDhaka ? 3.00 : 5.00);
  const totalAmount = subtotal + shippingFee;

  return {
    subtotal,
    shippingFee,
    totalAmount,
    calculatedItems,
  };
}
