'use client';

import React from 'react';

export interface CartItemType {
  id: string;
  name: string;
  price: number;
  image: string;
  details: string;
  qty: number;
  sleeve?: string;
  patchName?: string;
  customName?: string;
  customNumber?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemType[];
  onRemoveItem: (index: number) => void;
  onUpdateQty: (index: number, delta: number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQty,
  onCheckout,
}) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <!-- Backdrop -->
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      ></div>

      <!-- Sliding Panel -->
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white/90 backdrop-blur-2xl border-l border-white/80 shadow-2xl p-6 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center pb-4 border-b border-outline-variant/30">
          <div className="flex items-center gap-2">
            <h2 className="font-headline-lg text-2xl font-bold text-primary">Your Cart</h2>
            <span className="bg-primary/10 text-primary font-mono-ui text-xs px-2.5 py-0.5 rounded-full font-bold">
              {items.reduce((acc, i) => acc + i.qty, 0)} Items
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-grow overflow-y-auto custom-scrollbar py-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12 text-secondary">
              <span className="material-symbols-outlined text-4xl mb-2 text-outline">shopping_bag</span>
              <p className="font-body-md text-sm">Your cart is empty</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="glass-card p-4 rounded-xl flex gap-4 items-center relative group"
              >
                <div className="w-16 h-20 bg-surface-container-low rounded-lg p-1 flex items-center justify-center flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain cutout-image"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-headline-lg text-sm font-bold text-primary truncate">
                      {item.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="text-secondary hover:text-red-600 transition-colors p-1"
                    >
                      <span className="material-symbols-outlined text-xs">delete</span>
                    </button>
                  </div>
                  <p className="font-body-md text-xs text-secondary truncate mt-0.5">
                    {item.details}
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center border border-outline-variant/60 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => onUpdateQty(index, -1)}
                        className="px-2 py-0.5 hover:bg-surface-container text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="px-2.5 text-xs font-mono-ui font-bold text-primary">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onUpdateQty(index, 1)}
                        className="px-2 py-0.5 hover:bg-surface-container text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-mono-ui font-bold text-sm text-primary">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Totals & Checkout CTA */}
        {items.length > 0 && (
          <div className="pt-4 border-t border-outline-variant/30 space-y-3">
            <div className="flex justify-between text-xs font-body-md text-secondary">
              <span>Subtotal</span>
              <span className="font-mono-ui font-bold text-primary">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs font-body-md text-secondary">
              <span>Shipping (Calculated at checkout)</span>
              <span className="font-mono-ui font-bold text-emerald-600">Calculated</span>
            </div>
            <div className="flex justify-between text-base font-headline-lg font-bold text-primary pt-2 border-t border-outline-variant/20">
              <span>Estimated Total</span>
              <span className="font-mono-ui text-lg">${subtotal.toFixed(2)}</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full bg-primary text-on-primary font-body-md text-sm font-bold py-3.5 rounded-full hover:bg-black/90 transition-all duration-300 shadow-xl flex items-center justify-center gap-2 mt-2"
            >
              PROCEED TO CHECKOUT
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
