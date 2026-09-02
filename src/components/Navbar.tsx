'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
  brandName?: string;
  logoUrl?: string;
  cartCount: number;
  wishlistCount: number;
  activeTab: string;
  onViewChange: (view: string) => void;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  brandName = 'ZENVY',
  logoUrl,
  cartCount,
  wishlistCount,
  activeTab,
  onViewChange,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: string) => {
    onViewChange(view);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav flex flex-col transition-all duration-300">
      <!-- Top Announcement Bar -->
      <div className="bg-primary text-on-primary py-1.5 px-4 text-center text-xs font-mono-ui flex justify-between items-center border-b border-white/10">
        <div className="hidden sm:flex items-center gap-2 text-on-primary/70">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Next.js Full-Stack Platform Active
        </div>
        <div class="mx-auto sm:mx-0 font-label-caps tracking-widest text-[11px] text-white/90">
          FREE WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER $150
        </div>
        <div class="hidden md:flex items-center gap-3 text-on-primary/80">
          <button
            onClick={() => handleNavClick('admin')}
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <span class="material-symbols-outlined text-[14px]">admin_panel_settings</span> Admin Portal
          </button>
        </div>
      </div>

      <!-- Main Header Row -->
      <div className="flex justify-between items-center px-4 sm:px-grid-margin py-3 max-w-full">
        <!-- Logo / Brand -->
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={() => handleNavClick('home')}
            className="font-display-sm text-2xl sm:text-3xl font-extrabold tracking-tighter text-primary hover:scale-105 transition-transform duration-200 flex items-center gap-2"
          >
            {logoUrl ? (
              <img src={logoUrl} alt={brandName} className="h-8 object-contain" />
            ) : (
              brandName
            )}
          </button>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-label-caps uppercase bg-primary/5 text-primary border border-primary/10">
            Elite Sportswear
          </span>
        </div>

        <!-- Desktop Navigation Tabs -->
        <div className="hidden md:flex gap-1 items-center bg-white/50 p-1.5 rounded-full border border-white/60 shadow-inner">
          <button
            onClick={() => handleNavClick('home')}
            className={`font-body-md text-sm px-4 py-1.5 rounded-full transition-all duration-200 ${
              activeTab === 'home'
                ? 'text-primary font-bold bg-white shadow-sm'
                : 'text-secondary hover:text-primary hover:bg-white/60'
            }`}
          >
            Home & Arrivals
          </button>
          <button
            onClick={() => handleNavClick('shop')}
            className={`font-body-md text-sm px-4 py-1.5 rounded-full transition-all duration-200 ${
              activeTab === 'shop'
                ? 'text-primary font-bold bg-white shadow-sm'
                : 'text-secondary hover:text-primary hover:bg-white/60'
            }`}
          >
            Jerseys Shop
          </button>
          <button
            onClick={() => handleNavClick('customizer')}
            className={`font-body-md text-sm px-4 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1 ${
              activeTab === 'customizer'
                ? 'text-primary font-bold bg-white shadow-sm'
                : 'text-secondary hover:text-primary hover:bg-white/60'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-amber-600">3d_rotation</span> Custom Jersey
          </button>
          <button
            onClick={() => handleNavClick('checkout')}
            className={`font-body-md text-sm px-4 py-1.5 rounded-full transition-all duration-200 ${
              activeTab === 'checkout'
                ? 'text-primary font-bold bg-white shadow-sm'
                : 'text-secondary hover:text-primary hover:bg-white/60'
            }`}
          >
            Checkout
          </button>
          <button
            onClick={() => handleNavClick('admin')}
            className={`font-body-md text-sm px-4 py-1.5 rounded-full transition-all duration-200 ${
              activeTab === 'admin'
                ? 'text-primary font-bold bg-white shadow-sm'
                : 'text-secondary hover:text-primary hover:bg-white/60'
            }`}
          >
            Admin Suite
          </button>
        </div>

        <!-- Action Icons (Profile, Wishlist, Cart, Mobile Menu) -->
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => alert('LoggedIn User: ZENVY Elite Member')}
            className="hover:scale-105 transition-transform duration-200 p-2 sm:p-2.5 rounded-full hover:bg-white/80 text-primary"
            title="Account"
          >
            <span className="material-symbols-outlined text-[20px]">person</span>
          </button>

          <button
            onClick={() => alert(`Wishlist contains ${wishlistCount} item(s)`)}
            className="hover:scale-105 transition-transform duration-200 p-2 sm:p-2.5 rounded-full hover:bg-white/80 text-primary relative"
            title="Wishlist"
          >
            <span className="material-symbols-outlined text-[20px]">favorite</span>
            <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
              {wishlistCount}
            </span>
          </button>

          <button
            onClick={onOpenCart}
            className="hover:scale-105 transition-transform duration-200 p-2 sm:p-2.5 rounded-full bg-primary text-on-primary shadow-md flex items-center gap-1.5 px-3 sm:px-3.5"
            title="Cart Drawer"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            <span className="bg-white text-primary rounded-full px-2 py-0.5 text-[11px] font-bold font-mono-ui">
              {cartCount}
            </span>
          </button>

          <!-- Mobile Hamburger Menu Button -->
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-primary hover:bg-white/80"
            title="Mobile Navigation"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer Overlay -->
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden pt-[88px]">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          ></div>
          <div className="relative bg-white/95 backdrop-blur-2xl border-b border-white/80 shadow-2xl p-5 flex flex-col gap-2 z-50">
            <div className="text-[11px] font-label-caps text-secondary uppercase tracking-widest pb-2 border-b border-outline-variant/30 font-bold">
              Navigation Menu
            </div>
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container font-body-md text-sm text-primary font-bold"
            >
              <span className="material-symbols-outlined text-lg">home</span> Home & Arrivals
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container font-body-md text-sm text-primary font-bold"
            >
              <span className="material-symbols-outlined text-lg">shopping_bag</span> Jerseys Shop & Catalog
            </button>
            <button
              onClick={() => handleNavClick('customizer')}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container font-body-md text-sm text-primary font-bold"
            >
              <span className="material-symbols-outlined text-lg text-amber-600">3d_rotation</span> Custom Jersey 3D Studio
            </button>
            <button
              onClick={() => handleNavClick('checkout')}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container font-body-md text-sm text-primary font-bold"
            >
              <span className="material-symbols-outlined text-lg">credit_card</span> Checkout Flow
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container font-body-md text-sm text-primary font-bold"
            >
              <span className="material-symbols-outlined text-lg">admin_panel_settings</span> Admin Management Suite
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
