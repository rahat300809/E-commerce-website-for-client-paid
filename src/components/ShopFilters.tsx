'use client';

import React, { useState } from 'react';

interface ShopFiltersProps {
  onFilterChange: (filters: any) => void;
}

export const ShopFilters: React.FC<ShopFiltersProps> = ({ onFilterChange }) => {
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(['aura-pro', 'aura-classic']);
  const [maxPrice, setMaxPrice] = useState(300);

  const handleToggleBrand = (brand: string) => {
    const updated = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(updated);
    onFilterChange({ brands: updated, maxPrice });
  };

  const handlePriceChange = (price: number) => {
    setMaxPrice(price);
    onFilterChange({ brands: selectedBrands, maxPrice: price });
  };

  const handleReset = () => {
    setSelectedBrands(['aura-pro', 'aura-classic']);
    setMaxPrice(300);
    onFilterChange({ brands: ['aura-pro', 'aura-classic'], maxPrice: 300 });
  };

  return (
    <div className="col-span-1">
      {/* Mobile Filter Toggle Button */}
      <button
        onClick={() => setMobileExpanded(!mobileExpanded)}
        className="lg:hidden w-full bg-white border border-outline-variant/60 rounded-2xl p-4 flex justify-between items-center text-primary font-bold text-sm shadow-sm mb-4"
      >
        <span className="flex items-center gap-2">
          <span className="material-symbols-outlined">filter_list</span> Filter & Sort Products
        </span>
        <span className="material-symbols-outlined text-lg">
          {mobileExpanded ? 'expand_less' : 'expand_more'}
        </span>
      </button>

      {/* Filter Sidebar Panel */}
      <aside
        className={`flex flex-col gap-6 ${
          mobileExpanded ? 'block' : 'hidden lg:flex'
        }`}
      >
        <div className="glass-card p-6 rounded-2xl border border-white/80 sticky top-32 shadow-lg">
          <div className="flex justify-between items-center mb-6 pb-3 border-b border-outline-variant/30">
            <h3 className="font-headline-lg text-xl font-bold text-primary">Filters</h3>
            <button
              onClick={handleReset}
              className="font-mono-ui text-xs text-secondary hover:text-primary underline"
            >
              Reset
            </button>
          </div>

          {/* Brand Filter */}
          <div className="mb-6">
            <span className="font-label-caps text-xs text-primary font-bold block mb-3 uppercase tracking-wider">
              Brand / Collection
            </span>
            <div className="flex flex-col gap-2.5">
              {[
                { id: 'aura-pro', label: 'Aura Pro Series' },
                { id: 'aura-classic', label: 'Aura Classic Edition' },
                { id: 'aeroknit', label: 'AeroKnit Tech' },
                { id: 'preorder-drops', label: 'Preorder Limited Drops' },
              ].map((brand) => (
                <label key={brand.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand.id)}
                    onChange={() => handleToggleBrand(brand.id)}
                    className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
                  />
                  <span className="font-body-md text-sm text-secondary">{brand.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="mb-6 pt-4 border-t border-outline-variant/30">
            <div className="flex justify-between items-center mb-2">
              <span className="font-label-caps text-xs text-primary font-bold uppercase tracking-wider">
                Max Price
              </span>
              <span className="font-mono-ui text-xs font-bold text-primary">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="20"
              max="300"
              step="10"
              value={maxPrice}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              className="w-full accent-primary bg-surface-container rounded-lg h-2"
            />
          </div>
        </div>
      </aside>
    </div>
  );
};
