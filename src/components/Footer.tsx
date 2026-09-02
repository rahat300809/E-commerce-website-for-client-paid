'use client';

import React from 'react';

interface FooterProps {
  brandName?: string;
  tagline?: string;
  phone?: string;
  email?: string;
}

export const Footer: React.FC<FooterProps> = ({
  brandName = 'ZENVY',
  tagline = 'The New Era of Performance',
  phone = '+880 1700-000000',
  email = 'support@zenvy.com',
}) => {
  return (
    <footer className="w-full bg-primary text-on-primary pt-16 pb-12 mt-auto border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-grid-margin grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="font-display-sm text-2xl font-extrabold tracking-tighter text-white mb-2">
            {brandName}
          </h2>
          <p className="font-body-md text-sm text-on-primary/70 mb-4">{tagline}</p>
          <div className="text-xs font-mono-ui text-on-primary/60 space-y-1">
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
          </div>
        </div>

        <div>
          <h4 className="font-label-caps text-xs text-white uppercase tracking-widest font-bold mb-4">
            Collections
          </h4>
          <ul className="text-xs font-body-md space-y-2 text-on-primary/70">
            <li><a href="#" className="hover:text-white">Football Jerseys</a></li>
            <li><a href="#" className="hover:text-white">Cricket Kits</a></li>
            <li><a href="#" className="hover:text-white">3D Custom Studio</a></li>
            <li><a href="#" className="hover:text-white">Preorder Limited Drops</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-label-caps text-xs text-white uppercase tracking-widest font-bold mb-4">
            Customer Care
          </h4>
          <ul className="text-xs font-body-md space-y-2 text-on-primary/70">
            <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white">Size Guide</a></li>
            <li><a href="#" className="hover:text-white">Order Tracking</a></li>
            <li><a href="#" className="hover:text-white">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-label-caps text-xs text-white uppercase tracking-widest font-bold mb-4">
            Newsletter
          </h4>
          <p className="text-xs font-body-md text-on-primary/70 mb-3">
            Subscribe for exclusive drop alerts and custom jersey discounts.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 text-white placeholder-white/50 text-xs px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-white flex-grow border border-white/20"
            />
            <button className="bg-white text-primary text-xs font-bold px-4 py-2 rounded-xl hover:bg-white/90">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-grid-margin mt-12 pt-6 border-t border-white/10 flex justify-between items-center text-xs text-on-primary/50 font-mono-ui flex-wrap gap-4">
        <p>© 2026 {brandName} Inc. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Stitch MCP Sync</a>
        </div>
      </div>
    </footer>
  );
};
