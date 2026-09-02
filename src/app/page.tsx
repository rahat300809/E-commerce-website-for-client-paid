'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer, CartItemType } from '@/components/CartDrawer';
import { CustomizerPanel } from '@/components/CustomizerPanel';
import { ShopFilters } from '@/components/ShopFilters';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'customizer' | 'checkout' | 'admin'>('home');
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamic Brand Settings state
  const [brandSettings, setBrandSettings] = useState({
    brandName: 'ZENVY',
    logoUrl: '',
    tagline: 'The New Era of Performance',
    email: 'support@zenvy.com',
    phone: '+880 1700-000000',
  });

  // Cart State
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    {
      id: 'prod-1',
      name: 'Aura Strike Pro',
      price: 120.0,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCRowvY21H_JGsJ0D3Rb2f-8naBTnt9Jms1AYjLFn11PTIGUdeUvabLQLyg4lHvBgCo5jnX53OLUb9GKGkPZlPEtwe5E_UcsL7SiN_hYTfVKeV0JQIpVQemU_qBThBMnnndy2kPH9nZcmp6Hmm0tFA4Exgg1FLktCNtYjxIzzjJym2AnNw8SHk89KELYY8NKiPRjJBKe24w3Jw3BSbAg0Ek1gn9WmcYadKUBFOCTZbCYAa1zL8H6y6JoA',
      details: "Men's Authentic Jersey • L",
      qty: 1,
    },
  ]);

  // Checkout State
  const [checkoutData, setCheckoutData] = useState({
    name: 'Rahat Ahmed',
    email: 'rahat@example.com',
    phone: '+880 1711-223344',
    address: 'House 42, Road 11, Banani',
    city: 'Dhaka',
    paymentMethod: 'CASH_ON_DELIVERY',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (product: any) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.name === product.name && item.details === product.details
    );
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].qty += 1;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, product]);
    }
    showToast(`Added "${product.name}" to cart`);
    setCartOpen(true);
  };

  const handleRemoveCartItem = (index: number) => {
    const item = cartItems[index];
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    showToast(`Removed "${item.name}" from cart`);
  };

  const handleUpdateCartQty = (index: number, delta: number) => {
    const updated = [...cartItems];
    updated[index].qty += delta;
    if (updated[index].qty <= 0) {
      updated.splice(index, 1);
    }
    setCartItems(updated);
  };

  const handlePlaceOrder = () => {
    showToast(`Order Placed Successfully! Order #ZNV-9842 confirmed.`);
    setCartItems([]);
    setActiveTab('home');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const isDhaka = checkoutData.city.toLowerCase().includes('dhaka');
  const shippingFee = subtotal > 150 ? 0 : isDhaka ? 3.0 : 5.0;
  const orderTotal = subtotal + shippingFee;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        brandName={brandSettings.brandName}
        logoUrl={brandSettings.logoUrl}
        cartCount={cartItems.reduce((acc, i) => acc + i.qty, 0)}
        wishlistCount={wishlistCount}
        activeTab={activeTab}
        onViewChange={(v: any) => setActiveTab(v)}
        onOpenCart={() => setCartOpen(true)}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onUpdateQty={handleUpdateCartQty}
        onCheckout={() => setActiveTab('checkout')}
      />

      {/* Main Content Area */}
      <main className="pt-[88px] flex-grow">
        {/* VIEW 1: HOME & ARRIVALS */}
        {activeTab === 'home' && (
          <div>
            {/* Announcement Marquee Ticker */}
            <section className="w-full bg-primary text-on-primary py-2.5 overflow-hidden border-b border-white/10">
              <div className="animate-marquee whitespace-nowrap flex items-center gap-12 font-label-caps text-xs tracking-widest text-on-primary/90">
                <span>THE NEW SEASON - SHOP JERSEYS</span>
                <span className="text-white/40">•</span>
                <span>FREE SHIPPING ON ORDERS OVER $150</span>
                <span className="text-white/40">•</span>
                <span>3D CUSTOMIZATION STUDIO LIVE</span>
                <span className="text-white/40">•</span>
                <span>ETHERIAL TECHNICAL FABRIC TECHNOLOGY</span>
                <span className="text-white/40">•</span>
                <span>THE NEW SEASON - SHOP JERSEYS</span>
              </div>
            </section>

            {/* Main Hero Banner (Sleek Compact Height) */}
            <section className="relative w-full h-[440px] md:h-[540px] min-h-[360px] overflow-hidden flex items-center">
              <div className="absolute inset-0 z-0">
                <div
                  className="w-full h-full bg-cover bg-center object-cover transition-transform duration-1000 transform scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDEkIfW4povNNZmCZPpAtkbLE-KG7dymS7UvkxUxqgQLCfTYnQHY48OliKbOPxD4V1Krqxp6XqSFuA-NF73ut75mxMqPgULyY1TejG0qSMm8dZw6V6pLygkBx-CvLyIGmmGJLleT0_opdEUd36xIXylzO5tYti0T9C2k39YYp9yBFCfnh08ZuqeEa-LKdjw-ZQoSn86jCP351D4dTOZJ2dL_tDZKbLceB1OZSaeyoZ9CUE-wKzo0M9jOA')",
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent"></div>
              </div>

              <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-grid-margin py-4 md:py-8">
                <div className="glass-panel p-5 md:p-10 rounded-2xl max-w-2xl border border-white/80 shadow-2xl">
                  <span className="inline-block px-3 py-1 bg-black text-white font-label-caps text-[10px] md:text-[11px] tracking-widest rounded-md mb-2 md:mb-3">
                    SPRING / SUMMER 26 COLLECTION
                  </span>
                  <h1 className="font-display-lg text-2xl md:text-5xl text-primary mb-2 md:mb-4 leading-tight font-extrabold tracking-tight">
                    THE NEW ERA OF PERFORMANCE
                  </h1>
                  <p className="font-body-lg text-xs md:text-base text-secondary mb-4 md:mb-6 leading-relaxed">
                    Engineering high-energy athletics with luxury editorial aesthetics. Lightweight glassmorphism meets ultra-breathable AeroKnit technology.
                  </p>
                  <div className="flex flex-wrap gap-2.5 md:gap-4">
                    <button
                      onClick={() => setActiveTab('shop')}
                      className="bg-primary text-on-primary font-body-md text-xs md:text-base px-5 md:px-8 py-3 md:py-3.5 rounded-full hover:bg-black/80 transition-all duration-300 shadow-xl flex items-center gap-2 group"
                    >
                      SHOP ARRIVALS
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </button>
                    <button
                      onClick={() => setActiveTab('customizer')}
                      className="bg-white/80 backdrop-blur-md text-primary border border-primary/20 font-body-md text-xs md:text-base px-5 md:px-8 py-3 md:py-3.5 rounded-full hover:bg-white transition-all duration-300 shadow-md"
                    >
                      3D STUDIO
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Product Grid */}
            <section className="max-w-7xl mx-auto px-4 md:px-grid-margin py-12">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <span className="font-label-caps text-xs text-secondary tracking-widest uppercase">
                    Curated Collection
                  </span>
                  <h2 className="font-headline-lg text-2xl md:text-3xl font-extrabold text-primary">
                    Just Dropped
                  </h2>
                </div>
                <button
                  onClick={() => setActiveTab('shop')}
                  className="font-body-md text-xs md:text-sm text-primary font-bold hover:underline flex items-center gap-1"
                >
                  View All Products <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: 'Aura Strike Pro',
                    category: "Men's Authentic Jersey",
                    price: 120,
                    image:
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuCRowvY21H_JGsJ0D3Rb2f-8naBTnt9Jms1AYjLFn11PTIGUdeUvabLQLyg4lHvBgCo5jnX53OLUb9GKGkPZlPEtwe5E_UcsL7SiN_hYTfVKeV0JQIpVQemU_qBThBMnnndy2kPH9nZcmp6Hmm0tFA4Exgg1FLktCNtYjxIzzjJym2AnNw8SHk89KELYY8NKiPRjJBKe24w3Jw3BSbAg0Ek1gn9WmcYadKUBFOCTZbCYAa1zL8H6y6JoA',
                  },
                  {
                    name: 'Velocity Track Top',
                    category: 'Preorder Drop • Ship 14 Days',
                    price: 145,
                    badge: 'PREORDER',
                    image:
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuDG8MiBCTEJ9_yWnNhoeNhMOOSmZHbvDKLHXXwBw2x1BkoBDe9tU-XobPDwlW0ZynnUzXV_J2Oi9i4tEpr4ZliH8Mxcc3fkH5be13vj2mcxvBGyBQkRmFtEsa9Gu1KQkQkJ-FfenxUCp8wSq162R-3k-tkzumX3rZ0GtyR4SfVvHkokXixT1Ww7Sa56-FkqkPU5DKCkBmWACD6agq3vvp4pPeH1rnoV2F9L-4f86JeAxOMx-InEiB1pLw',
                  },
                  {
                    name: 'Nimbus Windbreaker',
                    category: 'Outerwear Jacket',
                    price: 210,
                    image:
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuCRtghZsGtFKHlZIYqaxAa8EcbW83K4egjcrZw6V4BKNThg-IAlTlMAK7mBkx_cl17Vu7d2UuuImJuqgR8VWEBruONytgmwd_u56NZOtXfIj4EccnfmiRjMoLpTVBSjXF2sCqgz2Xbmmtc4gMfUG1L_-q82tQjpjnb76hU4-UPXEwVHQis53FgqSKTFOUlJYAHop_oph-8ZHd2YUllJzjsxTPEerlfKDZ2ysTRoudBnK-P0058K9dNXJA',
                  },
                ].map((item, i) => (
                  <div key={i} className="glass-card rounded-2xl p-5 group flex flex-col justify-between">
                    <div className="relative h-[280px] bg-surface-container-low rounded-xl p-4 flex items-center justify-center mb-4 overflow-hidden">
                      {item.badge && (
                        <span className="absolute top-3 left-3 bg-red-600 text-white font-label-caps text-[10px] px-2 py-0.5 rounded tracking-wider font-bold">
                          {item.badge}
                        </span>
                      )}
                      <img src={item.image} alt={item.name} className="w-4/5 h-auto object-contain cutout-image" />
                    </div>
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-headline-lg text-lg text-primary font-bold">{item.name}</h4>
                          <p className="font-body-md text-xs text-secondary">{item.category}</p>
                        </div>
                        <span className="font-mono-ui text-base font-bold text-primary">${item.price}</span>
                      </div>
                      <button
                        onClick={() =>
                          handleAddToCart({
                            id: `item-${i}`,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            details: `${item.category} • Standard L`,
                            qty: 1,
                          })
                        }
                        className="w-full bg-primary text-on-primary font-label-caps text-xs py-2.5 rounded-full hover:bg-black/90 transition-colors shadow-md mt-2"
                      >
                        QUICK ADD
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: JERSEYS SHOP */}
        {activeTab === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 md:px-grid-margin py-8">
            <div className="mb-6">
              <h1 className="font-display-sm text-3xl font-extrabold text-primary">All Jerseys & Sportswear</h1>
              <p className="font-body-md text-sm text-secondary">Explore authentic team kits, player versions, and performance outerwear.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <ShopFilters onFilterChange={() => {}} />

              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    name: 'Aura Strike Pro',
                    category: "Men's Authentic Jersey",
                    price: 120,
                    image:
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuCRowvY21H_JGsJ0D3Rb2f-8naBTnt9Jms1AYjLFn11PTIGUdeUvabLQLyg4lHvBgCo5jnX53OLUb9GKGkPZlPEtwe5E_UcsL7SiN_hYTfVKeV0JQIpVQemU_qBThBMnnndy2kPH9nZcmp6Hmm0tFA4Exgg1FLktCNtYjxIzzjJym2AnNw8SHk89KELYY8NKiPRjJBKe24w3Jw3BSbAg0Ek1gn9WmcYadKUBFOCTZbCYAa1zL8H6y6JoA',
                  },
                  {
                    name: 'Velocity Track Top',
                    category: 'Preorder Drop • Ship 14 Days',
                    price: 145,
                    badge: 'PREORDER',
                    image:
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuDG8MiBCTEJ9_yWnNhoeNhMOOSmZHbvDKLHXXwBw2x1BkoBDe9tU-XobPDwlW0ZynnUzXV_J2Oi9i4tEpr4ZliH8Mxcc3fkH5be13vj2mcxvBGyBQkRmFtEsa9Gu1KQkQkJ-FfenxUCp8wSq162R-3k-tkzumX3rZ0GtyR4SfVvHkokXixT1Ww7Sa56-FkqkPU5DKCkBmWACD6agq3vvp4pPeH1rnoV2F9L-4f86JeAxOMx-InEiB1pLw',
                  },
                  {
                    name: 'Nimbus Windbreaker',
                    category: 'Outerwear Jacket',
                    price: 210,
                    image:
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuCRtghZsGtFKHlZIYqaxAa8EcbW83K4egjcrZw6V4BKNThg-IAlTlMAK7mBkx_cl17Vu7d2UuuImJuqgR8VWEBruONytgmwd_u56NZOtXfIj4EccnfmiRjMoLpTVBSjXF2sCqgz2Xbmmtc4gMfUG1L_-q82tQjpjnb76hU4-UPXEwVHQis53FgqSKTFOUlJYAHop_oph-8ZHd2YUllJzjsxTPEerlfKDZ2ysTRoudBnK-P0058K9dNXJA',
                  },
                  {
                    name: 'AeroWeave Gold Kit',
                    category: 'Limited Edition Replica',
                    price: 135,
                    image:
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuAjE-u9ZbD3Zf91Xzpg4EuZQktBr2xHI0kqspcQpvxMzdAcwL7L_YWCfTwEgj2zuajHQCiPlTyQ4jQsAkp89r74ikyrtMpXFo8qR6lMFc9RP-NPOT80-C7OuX__-USSY51q5SPChtyZwtScWgWq8SCa44kOR1C1KCO6b9WtoXzsKTJYs4nBiADZ5k4SGaOaP0SUmxwtrkFLHbEhU4Q8-PkTXsEVZUw6y4sfQRRtKWgy46Cg6KJlFAJgow',
                  },
                ].map((item, i) => (
                  <div key={i} className="glass-card rounded-2xl p-5 flex flex-col justify-between">
                    <div className="relative h-[260px] bg-surface-container-low rounded-xl p-4 flex items-center justify-center mb-4 overflow-hidden">
                      {item.badge && (
                        <span className="absolute top-3 left-3 bg-red-600 text-white font-label-caps text-[10px] px-2 py-0.5 rounded font-bold">
                          {item.badge}
                        </span>
                      )}
                      <img src={item.image} alt={item.name} className="w-4/5 h-auto object-contain cutout-image" />
                    </div>
                    <div>
                      <h4 className="font-headline-lg text-base font-bold text-primary">{item.name}</h4>
                      <p className="font-body-md text-xs text-secondary mb-2">{item.category}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-mono-ui text-base font-bold text-primary">${item.price}</span>
                        <button
                          onClick={() =>
                            handleAddToCart({
                              id: `shop-${i}`,
                              name: item.name,
                              price: item.price,
                              image: item.image,
                              details: `${item.category} • Size L`,
                              qty: 1,
                            })
                          }
                          className="bg-primary text-on-primary font-label-caps text-xs px-4 py-2 rounded-full hover:bg-black/90"
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: CUSTOM JERSEY 3D STUDIO */}
        {activeTab === 'customizer' && <CustomizerPanel onAddToCart={handleAddToCart} />}

        {/* VIEW 4: CHECKOUT FLOW */}
        {activeTab === 'checkout' && (
          <div className="max-w-6xl mx-auto px-4 md:px-grid-margin py-8">
            <h1 className="font-display-sm text-3xl font-extrabold text-primary mb-6">Distraction-Free Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Shipping & Payment Form */}
              <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-2xl border border-white/80 shadow-xl space-y-6">
                <h3 className="font-headline-lg text-lg font-bold text-primary border-b border-outline-variant/30 pb-3">
                  1. Shipping Information (Bangladesh)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-ui font-bold text-secondary mb-1">Full Name</label>
                    <input
                      type="text"
                      value={checkoutData.name}
                      onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                      className="w-full bg-white border border-outline-variant/60 rounded-xl px-3.5 py-2.5 text-xs font-body-md text-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono-ui font-bold text-secondary mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={checkoutData.phone}
                      onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                      className="w-full bg-white border border-outline-variant/60 rounded-xl px-3.5 py-2.5 text-xs font-body-md text-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-ui font-bold text-secondary mb-1">City / Division</label>
                    <select
                      value={checkoutData.city}
                      onChange={(e) => setCheckoutData({ ...checkoutData, city: e.target.value })}
                      className="w-full bg-white border border-outline-variant/60 rounded-xl px-3.5 py-2.5 text-xs font-body-md text-primary"
                    >
                      <option value="Dhaka">Dhaka (Shipping $3.00)</option>
                      <option value="Chittagong">Chittagong (Shipping $5.00)</option>
                      <option value="Sylhet">Sylhet (Shipping $5.00)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono-ui font-bold text-secondary mb-1">Street Address</label>
                    <input
                      type="text"
                      value={checkoutData.address}
                      onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                      className="w-full bg-white border border-outline-variant/60 rounded-xl px-3.5 py-2.5 text-xs font-body-md text-primary"
                    />
                  </div>
                </div>

                <h3 className="font-headline-lg text-lg font-bold text-primary border-b border-outline-variant/30 pb-3 pt-4">
                  2. Payment Method
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'CASH_ON_DELIVERY', label: 'Cash on Delivery' },
                    { id: 'MFS_MOBILE', label: 'bKash / Nagad Mobile' },
                    { id: 'CARD', label: 'Debit / Credit Card' },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      onClick={() => setCheckoutData({ ...checkoutData, paymentMethod: pm.id })}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                        checkoutData.paymentMethod === pm.id
                          ? 'bg-primary text-white border-primary shadow-md'
                          : 'bg-white text-secondary border-outline-variant/60 hover:border-primary'
                      }`}
                    >
                      {pm.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Summary Snapshot Card */}
              <div className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-2xl border border-white/80 shadow-xl space-y-4">
                <h3 className="font-headline-lg text-lg font-bold text-primary border-b border-outline-variant/30 pb-3">
                  Order Summary
                </h3>

                <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <div>
                        <div className="font-bold text-primary">{item.name} x {item.qty}</div>
                        <div className="text-secondary text-[11px]">{item.details}</div>
                      </div>
                      <div className="font-mono-ui font-bold text-primary">${(item.price * item.qty).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-outline-variant/30 space-y-2 text-xs">
                  <div className="flex justify-between text-secondary">
                    <span>Subtotal</span>
                    <span className="font-mono-ui font-bold text-primary">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>Shipping ({checkoutData.city})</span>
                    <span className="font-mono-ui font-bold text-emerald-600">${shippingFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-primary pt-2 border-t border-outline-variant/20">
                    <span>Final Amount</span>
                    <span className="font-mono-ui text-xl">${orderTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-primary text-on-primary font-body-md text-sm font-bold py-4 rounded-full hover:bg-black/90 transition-all duration-300 shadow-xl mt-4"
                >
                  CONFIRM & PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: ADMIN MANAGEMENT SUITE */}
        {activeTab === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 md:px-grid-margin py-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="bg-amber-500/10 text-amber-700 font-label-caps text-[10px] px-2.5 py-1 rounded font-bold">
                  ADMIN AUTHORIZATION ACTIVE
                </span>
                <h1 className="font-display-sm text-3xl font-extrabold text-primary mt-1">Store Admin Portal</h1>
              </div>
            </div>

            {/* Admin Grid Tabs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Brand Settings Section */}
              <div className="lg:col-span-6 glass-card p-6 rounded-2xl border border-white/80 shadow-xl space-y-4">
                <h3 className="font-headline-lg text-lg font-bold text-primary border-b border-outline-variant/30 pb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-600">storefront</span> Dynamic Brand Settings
                </h3>

                <div>
                  <label className="block text-xs font-mono-ui font-bold text-secondary mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={brandSettings.brandName}
                    onChange={(e) => setBrandSettings({ ...brandSettings, brandName: e.target.value })}
                    className="w-full bg-white border border-outline-variant/60 rounded-xl px-3.5 py-2 text-xs font-body-md text-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-ui font-bold text-secondary mb-1">Logo Upload (URL or Local File)</label>
                  <input
                    type="text"
                    value={brandSettings.logoUrl}
                    onChange={(e) => setBrandSettings({ ...brandSettings, logoUrl: e.target.value })}
                    placeholder="e.g. /logo.png or image URL"
                    className="w-full bg-white border border-outline-variant/60 rounded-xl px-3.5 py-2 text-xs font-body-md text-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-ui font-bold text-secondary mb-1">Tagline</label>
                  <input
                    type="text"
                    value={brandSettings.tagline}
                    onChange={(e) => setBrandSettings({ ...brandSettings, tagline: e.target.value })}
                    className="w-full bg-white border border-outline-variant/60 rounded-xl px-3.5 py-2 text-xs font-body-md text-primary"
                  />
                </div>

                <button
                  onClick={() => showToast('Brand Settings Updated Globally')}
                  className="bg-primary text-on-primary font-body-md text-xs font-bold px-6 py-2.5 rounded-full hover:bg-black/90"
                >
                  SAVE BRAND SETTINGS
                </button>
              </div>

              {/* Preorder Capacity System */}
              <div className="lg:col-span-6 glass-card p-6 rounded-2xl border border-white/80 shadow-xl space-y-4">
                <h3 className="font-headline-lg text-lg font-bold text-primary border-b border-outline-variant/30 pb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-600">inventory_2</span> Preorder Capacity System
                </h3>

                <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/40 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span>Nimbus Windbreaker Drop</span>
                    <span className="bg-emerald-500/10 text-emerald-700 px-2 py-0.5 rounded">AVAILABLE</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                    <div className="bg-primary h-full w-[84%]"></div>
                  </div>
                  <div className="flex justify-between text-[11px] font-mono-ui text-secondary">
                    <span>Max Capacity: 1000 Slots</span>
                    <span>Sold: 842 / Remaining: 158</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer
        brandName={brandSettings.brandName}
        tagline={brandSettings.tagline}
        phone={brandSettings.phone}
        email={brandSettings.email}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary text-xs font-mono-ui px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-white/20">
          <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
