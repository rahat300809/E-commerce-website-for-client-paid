'use client';

import React, { useState } from 'react';

interface CustomizerPanelProps {
  onAddToCart: (product: any) => void;
}

export const CustomizerPanel: React.FC<CustomizerPanelProps> = ({ onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedSleeve, setSelectedSleeve] = useState('Long Sleeve');
  const [selectedPatch, setSelectedPatch] = useState('UEFA Champions League');
  const [enablePrint, setEnablePrint] = useState(true);
  const [customName, setCustomName] = useState('JONATHAN');
  const [customNumber, setCustomNumber] = useState('77');
  const [view3dOpen, setView3dOpen] = useState(false);
  const [previewAngle, setPreviewAngle] = useState<'front' | 'back' | 'side'>('back');

  // Base price calculation
  const basePrice = 120.0;
  const sleevePrice = selectedSleeve === 'Long Sleeve' ? 15.0 : 0.0;
  const patchPrice = selectedPatch === 'UEFA Champions League' ? 25.0 : selectedPatch !== 'No Patch' ? 20.0 : 0.0;
  const printPrice = enablePrint && (customName || customNumber) ? 20.0 : 0.0;
  const totalPrice = basePrice + sleevePrice + patchPrice + printPrice;

  const handleAddCustomJersey = () => {
    onAddToCart({
      id: 'custom-jersey-001',
      name: 'Custom Jersey 3D Edition',
      price: totalPrice,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCRowvY21H_JGsJ0D3Rb2f-8naBTnt9Jms1AYjLFn11PTIGUdeUvabLQLyg4lHvBgCo5jnX53OLUb9GKGkPZlPEtwe5E_UcsL7SiN_hYTfVKeV0JQIpVQemU_qBThBMnnndy2kPH9nZcmp6Hmm0tFA4Exgg1FLktCNtYjxIzzjJym2AnNw8SHk89KELYY8NKiPRjJBKe24w3Jw3BSbAg0Ek1gn9WmcYadKUBFOCTZbCYAa1zL8H6y6JoA',
      details: `${selectedSize} • ${selectedSleeve} • ${selectedPatch} • Print: ${
        enablePrint ? `${customName || 'NAME'} #${customNumber || '00'}` : 'None'
      }`,
      qty: 1,
      sleeve: selectedSleeve,
      patchName: selectedPatch,
      customName: enablePrint ? customName : '',
      customNumber: enablePrint ? customNumber : '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-grid-margin py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Jersey Canvas Preview */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="glass-card rounded-2xl p-6 relative h-[380px] sm:h-[540px] flex items-center justify-center bg-surface-container-low overflow-hidden shadow-2xl border border-white/80">
            {/* View Angle Selector Buttons */}
            <div className="absolute top-4 left-4 z-10 flex gap-2 bg-white/80 backdrop-blur-md p-1 rounded-full border border-white/60 shadow-sm">
              <button
                onClick={() => setPreviewAngle('front')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  previewAngle === 'front' ? 'bg-primary text-white' : 'text-secondary hover:text-primary'
                }`}
              >
                Front
              </button>
              <button
                onClick={() => setPreviewAngle('back')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  previewAngle === 'back' ? 'bg-primary text-white' : 'text-secondary hover:text-primary'
                }`}
              >
                Back (Print)
              </button>
            </div>

            {/* 3D Rotation Trigger Button */}
            <button
              onClick={() => setView3dOpen(true)}
              className="absolute top-4 right-4 z-10 bg-amber-500/90 text-white font-label-caps text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md hover:bg-amber-600 transition-colors backdrop-blur-md"
            >
              <span className="material-symbols-outlined text-[16px]">3d_rotation</span> 3D Viewport
            </button>

            {/* Main Jersey Image */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRowvY21H_JGsJ0D3Rb2f-8naBTnt9Jms1AYjLFn11PTIGUdeUvabLQLyg4lHvBgCo5jnX53OLUb9GKGkPZlPEtwe5E_UcsL7SiN_hYTfVKeV0JQIpVQemU_qBThBMnnndy2kPH9nZcmp6Hmm0tFA4Exgg1FLktCNtYjxIzzjJym2AnNw8SHk89KELYY8NKiPRjJBKe24w3Jw3BSbAg0Ek1gn9WmcYadKUBFOCTZbCYAa1zL8H6y6JoA"
              alt="Custom Jersey Base"
              className="w-4/5 max-h-[420px] object-contain cutout-image transition-transform duration-500"
            />

            {/* Real-time Custom Name & Squad Number Overlay (Back View) */}
            {previewAngle === 'back' && enablePrint && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none transform -translate-y-2">
                <span className="font-display-lg text-xl sm:text-3xl font-extrabold tracking-widest text-primary/95 uppercase drop-shadow-md">
                  {customName || 'NAME'}
                </span>
                <span className="font-display-lg text-5xl sm:text-8xl font-black text-primary/95 leading-none drop-shadow-lg">
                  {customNumber || '00'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Customization Controls Panel */}
        <div className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-2xl border border-white/80 shadow-2xl flex flex-col gap-6">
          <div>
            <span className="bg-primary/10 text-primary font-label-caps text-[10px] px-2.5 py-1 rounded-md uppercase font-bold">
              3D Interactive Studio
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-primary mt-2">
              Custom Pro Kit
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-secondary mt-1">
              Personalize sleeve style, official tournament patches, and custom name printing.
            </p>
          </div>

          {/* Size Chips */}
          <div>
            <span className="font-label-caps text-xs text-primary font-bold block mb-2 uppercase tracking-wider">
              Select Size
            </span>
            <div className="flex flex-wrap gap-2">
              {['S', 'M', 'L', 'XL', '2XL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-11 h-11 rounded-xl text-xs font-mono-ui font-bold border transition-all ${
                    selectedSize === size
                      ? 'bg-primary text-white border-primary shadow-md'
                      : 'bg-white text-secondary border-outline-variant/60 hover:border-primary'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Sleeve Style Selector */}
          <div>
            <span className="font-label-caps text-xs text-primary font-bold block mb-2 uppercase tracking-wider">
              Sleeve Style
            </span>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Short Sleeve', price: '+$0' },
                { name: 'Long Sleeve', price: '+$15' },
              ].map((sleeve) => (
                <button
                  key={sleeve.name}
                  onClick={() => setSelectedSleeve(sleeve.name)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    selectedSleeve === sleeve.name
                      ? 'bg-primary text-white border-primary shadow-md'
                      : 'bg-white text-secondary border-outline-variant/60 hover:border-primary'
                  }`}
                >
                  <div className="font-headline-lg text-xs font-bold">{sleeve.name}</div>
                  <div className="font-mono-ui text-[11px] opacity-80 mt-0.5">{sleeve.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Patch Selector */}
          <div>
            <span className="font-label-caps text-xs text-primary font-bold block mb-2 uppercase tracking-wider">
              Tournament Patch
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { name: 'No Patch', price: '+$0' },
                { name: 'UEFA Champions League', price: '+$25' },
                { name: 'Premier League', price: '+$20' },
                { name: 'La Liga', price: '+$20' },
              ].map((patch) => (
                <button
                  key={patch.name}
                  onClick={() => setSelectedPatch(patch.name)}
                  className={`p-2.5 rounded-xl text-left border transition-all ${
                    selectedPatch === patch.name
                      ? 'bg-primary text-white border-primary shadow-md'
                      : 'bg-white text-secondary border-outline-variant/60 hover:border-primary'
                  }`}
                >
                  <div className="font-headline-lg text-[11px] font-bold truncate">{patch.name}</div>
                  <div className="font-mono-ui text-[10px] opacity-80 mt-0.5">{patch.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Personalization Section */}
          <div className="pt-3 border-t border-outline-variant/30">
            <label className="flex items-center justify-between cursor-pointer mb-3">
              <span className="font-label-caps text-xs text-primary font-bold uppercase tracking-wider">
                Name & Number Printing
              </span>
              <input
                type="checkbox"
                checked={enablePrint}
                onChange={(e) => setEnablePrint(e.target.checked)}
                className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
              />
            </label>

            {enablePrint && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/40">
                <div>
                  <label className="block text-[10px] font-mono-ui font-bold text-secondary mb-1">
                    Custom Name (+$20)
                  </label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                    placeholder="e.g. JONATHAN"
                    maxLength={14}
                    className="w-full bg-white border border-outline-variant/60 rounded-lg px-3 py-2 text-xs font-mono-ui font-bold text-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono-ui font-bold text-secondary mb-1">
                    Squad Number
                  </label>
                  <input
                    type="text"
                    value={customNumber}
                    onChange={(e) => setCustomNumber(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="e.g. 77"
                    maxLength={2}
                    className="w-full bg-white border border-outline-variant/60 rounded-lg px-3 py-2 text-xs font-mono-ui font-bold text-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Price Breakdown & Add to Cart */}
          <div className="pt-4 border-t border-outline-variant/30">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-xs text-secondary font-body-md block">Total Custom Price</span>
                <span className="font-mono-ui text-2xl font-bold text-primary">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="text-right text-[11px] font-mono-ui text-secondary">
                Base: ${basePrice} | Sleeve: +${sleevePrice} | Patch: +${patchPrice}
              </div>
            </div>

            <button
              onClick={handleAddCustomJersey}
              className="w-full bg-primary text-on-primary font-body-md text-sm font-bold py-4 rounded-full hover:bg-black/90 transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">shopping_bag</span>
              ADD CUSTOM JERSEY TO CART
            </button>
          </div>
        </div>
      </div>

      {/* 3D Viewport Modal */}
      {view3dOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setView3dOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          ></div>
          <div className="relative bg-white/95 backdrop-blur-2xl rounded-2xl p-6 max-w-xl w-full border border-white/80 shadow-2xl z-10 flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-4">
              <h3 className="font-headline-lg text-lg font-bold text-primary">3D Model Interactive Viewport</h3>
              <button
                onClick={() => setView3dOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            <div className="w-full h-80 bg-surface-container-low rounded-xl flex items-center justify-center relative overflow-hidden border border-outline-variant/40">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRowvY21H_JGsJ0D3Rb2f-8naBTnt9Jms1AYjLFn11PTIGUdeUvabLQLyg4lHvBgCo5jnX53OLUb9GKGkPZlPEtwe5E_UcsL7SiN_hYTfVKeV0JQIpVQemU_qBThBMnnndy2kPH9nZcmp6Hmm0tFA4Exgg1FLktCNtYjxIzzjJym2AnNw8SHk89KELYY8NKiPRjJBKe24w3Jw3BSbAg0Ek1gn9WmcYadKUBFOCTZbCYAa1zL8H6y6JoA"
                alt="3D Preview"
                className="w-3/4 h-3/4 object-contain animate-spin-slow"
              />
              <span className="absolute bottom-3 font-mono-ui text-[11px] bg-black/60 text-white px-3 py-1 rounded-full backdrop-blur">
                Drag to Rotate 360° • WebGL Render Active
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
