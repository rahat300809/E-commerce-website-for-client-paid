import React from 'react';
import { CircularTestimonials, Testimonial } from './ui/circular-testimonials';
import { jerseyModelTestimonials } from './ui/demo';

interface FooterProps {
  brandName?: string;
  tagline?: string;
  phone?: string;
  email?: string;
  testimonials?: Testimonial[];
}

export const Footer: React.FC<FooterProps> = ({
  brandName = 'ZENVY',
  tagline = 'The New Era of Performance',
  phone = '+880 1700-000000',
  email = 'support@zenvy.com',
  testimonials = jerseyModelTestimonials,
}) => {
  return (
    <footer className="w-full bg-primary text-on-primary pt-10 pb-12 mt-auto border-t border-white/10">
      {/* Athlete & Model Showcase */}
      <div className="w-full border-b border-white/10 pb-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-grid-margin">
          <div className="text-center mb-6">
            <span className="text-[11px] font-mono-ui uppercase font-bold tracking-widest text-amber-400">
              PRO ATHLETES & JERSEY MODELS
            </span>
            <h3 className="font-display-sm text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Worn by Champions On & Off the Pitch
            </h3>
            <p className="text-xs text-on-primary/60 max-w-md mx-auto mt-1">
              Real athlete reviews on match-day performance, pro-aeroknit breathability, and custom name-and-number precision.
            </p>
          </div>
          <div className="flex justify-center">
            <CircularTestimonials
              testimonials={testimonials}
              autoplay={true}
              colors={{
                name: "#0f172a",
                designation: "#64748b",
                testimony: "#334155",
                arrowBackground: "#ffffff",
                arrowForeground: "#0f172a",
                arrowHoverBackground: "#000000",
              }}
              fontSizes={{
                name: "1.5rem",
                designation: "0.9rem",
                quote: "1.05rem",
              }}
            />
          </div>
        </div>
      </div>

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
