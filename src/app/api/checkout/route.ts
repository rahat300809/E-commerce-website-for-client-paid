import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateOrderTotal } from '@/lib/pricing';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, customerPhone, address, city, items, paymentMethod } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ success: false, error: 'Cart is empty' }, { status: 400 });
    }

    // Authoritative Server-side Price Calculation (NEVER trust client prices)
    const { subtotal, shippingFee, totalAmount, calculatedItems } = await calculateOrderTotal(items, city);

    // Create Order with Immutable Price Snapshot
    const orderNumber = `ZNV-${Math.floor(100000 + Math.random() * 900000)}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress: address,
        city,
        postalCode: '1212',
        country: 'Bangladesh',
        subtotal,
        shippingFee,
        totalAmount,
        paymentMethod: paymentMethod || 'CASH_ON_DELIVERY',
        items: {
          create: calculatedItems.map((item) => ({
            productId: item.productId,
            productName: item.calc.productName,
            size: item.size,
            sleeve: item.sleeve,
            patchName: item.patchName || 'No Patch',
            customName: item.customName || '',
            customNumber: item.customNumber || '',
            unitPrice: item.calc.unitPrice,
            quantity: item.quantity,
            totalPrice: item.calc.totalPrice,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
