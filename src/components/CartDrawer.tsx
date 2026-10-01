import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check } from 'lucide-react';
import { CartItem, Language } from '../types/cafe';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  language: Language;
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: (orderSummary: {
    subtotal: number;
    discount: number;
    tax: number;
    tip: number;
    total: number;
    orderType: 'dine-in' | 'takeaway';
    tableOrPickupNote: string;
  }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  language,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
}) => {
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [tableOrNote, setTableOrNote] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [tip, setTip] = useState(30);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const discount = Math.round((subtotal * discountPercent) / 100);
  const tax = Math.round((subtotal - discount) * 0.05); // 5% GST
  const grandTotal = subtotal - discount + tax + tip;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'TERROIR10' || code === 'FIRSTBREW' || code === 'WELCOME10') {
      setDiscountPercent(10);
      setCouponApplied(true);
    } else {
      setCouponError(language === 'en' ? 'Invalid promo code. Try "TERROIR10"' : 'अमान्य कोड! "TERROIR10" आज़माएं');
    }
  };

  const handleCheckoutClick = () => {
    onProceedToCheckout({
      subtotal,
      discount,
      tax,
      tip,
      total: grandTotal,
      orderType,
      tableOrPickupNote: tableOrNote.trim() || (orderType === 'dine-in' ? 'Table at Cafe' : 'Pickup at Counter'),
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#181614] border-l border-[#2A2724] text-[#FAF7F2] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-[#2A2724] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C89B6D]" />
              <h2 className="text-lg font-serif font-medium text-[#FAF7F2]">
                {language === 'en' ? 'Your Artisanal Order' : 'आपका कॉफ़ी ऑर्डर'}
              </h2>
              <span className="text-xs text-[#9E978E] tabular-nums">
                ({cartItems.reduce((a, b) => a + b.quantity, 0)} {language === 'en' ? 'items' : 'आइटम'})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#9E978E] hover:text-[#FAF7F2] rounded-lg transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#1F1D1A] border border-[#2E2A26] flex items-center justify-center text-[#C89B6D] mb-4">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="text-base font-serif font-medium text-[#FAF7F2] mb-1">
                {language === 'en' ? 'Your cup is empty' : 'आपका कार्ट खाली है'}
              </h3>
              <p className="text-xs text-[#9E978E] max-w-xs mb-6">
                {language === 'en'
                  ? 'Explore our single-origin coffees, slow bakes, and tartines to begin.'
                  : 'शुरुआत करने के लिए मेनू से अपनी पसंदीदा कॉफ़ी या बेकरी चुनें।'}
              </p>
              <button
                onClick={onClose}
                className="py-2.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#121110] bg-[#C89B6D] hover:bg-[#DEBA93] rounded transition-colors"
              >
                {language === 'en' ? 'Explore Menu' : 'मेनू देखें'}
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Order Mode: Dine-in vs Takeaway */}
              <div className="bg-[#1C1A18] border border-[#2E2A26] rounded-lg p-2.5">
                <div className="grid grid-cols-2 gap-1.5 mb-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('dine-in')}
                    className={`py-1.5 text-xs font-medium rounded transition-colors ${
                      orderType === 'dine-in'
                        ? 'bg-[#C89B6D] text-[#121110] font-semibold'
                        : 'text-[#C2BCB3] hover:text-[#FAF7F2]'
                    }`}
                  >
                    {language === 'en' ? '🍽️ Dine-In' : '🍽️ डाइन-इन'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`py-1.5 text-xs font-medium rounded transition-colors ${
                      orderType === 'takeaway'
                        ? 'bg-[#C89B6D] text-[#121110] font-semibold'
                        : 'text-[#C2BCB3] hover:text-[#FAF7F2]'
                    }`}
                  >
                    {language === 'en' ? '☕ Takeaway' : '☕ टेकअवे'}
                  </button>
                </div>
                <input
                  type="text"
                  value={tableOrNote}
                  onChange={(e) => setTableOrNote(e.target.value)}
                  placeholder={
                    orderType === 'dine-in'
                      ? language === 'en' ? 'Table Number (e.g., Table 4) or Seating Area' : 'टेबल नंबर (जैसे टेबल 4)'
                      : language === 'en' ? 'Pickup Name / Estimated Time (e.g. 15 mins)' : 'पिकअप नाम या समय'
                  }
                  className="w-full bg-[#141311] border border-[#2A2724] rounded px-3 py-1.5 text-xs text-[#FAF7F2] placeholder-[#6E675E] focus:outline-none focus:border-[#C89B6D]"
                />
              </div>

              {/* Itemized List */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-3 bg-[#1C1A18] border border-[#2E2A26] rounded-lg flex gap-3"
                  >
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name.en}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded object-cover shrink-0 bg-[#262320]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-semibold text-[#FAF7F2] truncate">
                          {language === 'en' ? item.menuItem.name.en : item.menuItem.name.hi}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-[#9E978E] hover:text-red-400 p-0.5"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization Details */}
                      {Object.keys(item.selectedCustomizations).length > 0 && (
                        <div className="text-[11px] text-[#C89B6D] mt-0.5 line-clamp-2">
                          {Object.values(item.selectedCustomizations).join(' · ')}
                        </div>
                      )}

                      {item.specialInstructions && (
                        <div className="text-[10px] text-[#9E978E] italic mt-0.5">
                          "{item.specialInstructions}"
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#262320]">
                        <span className="text-xs font-semibold text-[#FAF7F2] tabular-nums">
                          ₹{item.unitPrice * item.quantity}
                        </span>

                        <div className="flex items-center gap-2 bg-[#141311] border border-[#2A2724] rounded px-1.5 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                            className="text-[#9E978E] hover:text-[#FAF7F2]"
                            aria-label="Decrease"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs tabular-nums text-[#FAF7F2] px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                            className="text-[#9E978E] hover:text-[#FAF7F2]"
                            aria-label="Increase"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code input */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9E978E]" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Promo code (e.g. TERROIR10)"
                      className="w-full bg-[#1C1A18] border border-[#2E2A26] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#FAF7F2] placeholder-[#6E675E] uppercase focus:outline-none focus:border-[#C89B6D]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-semibold bg-[#262320] hover:bg-[#332E29] text-[#FAF7F2] rounded-lg border border-[#3D3833] transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>10% Craft Discount Applied!</span>
                  </div>
                )}
                {couponError && <div className="text-[11px] text-red-400">{couponError}</div>}
              </form>

              {/* Barista Tip Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#9E978E] font-medium">
                  {language === 'en' ? 'Tip the Artisan Baristas' : 'बरिस्ता के लिए टिप'}
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[0, 30, 50, 100].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTip(t)}
                      className={`py-1 text-xs rounded border transition-colors tabular-nums ${
                        tip === t
                          ? 'bg-[#C89B6D] text-[#121110] border-[#C89B6D] font-semibold'
                          : 'bg-[#1C1A18] text-[#C2BCB3] border-[#2A2724] hover:border-[#3D3833]'
                      }`}
                    >
                      {t === 0 ? 'No tip' : `₹${t}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Drawer Footer with calculation breakdown & checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-[#141311] border-t border-[#2A2724] space-y-3">
              <div className="space-y-1.5 text-xs text-[#9E978E]">
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Item Subtotal' : 'कुल राशि'}</span>
                  <span className="tabular-nums text-[#FAF7F2]">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>{language === 'en' ? 'Promo Discount' : 'छूट'}</span>
                    <span className="tabular-nums">-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Restaurant GST (5%)' : 'रेस्टोरेंट जीएसटी (5%)'}</span>
                  <span className="tabular-nums text-[#FAF7F2]">₹{tax}</span>
                </div>
                {tip > 0 && (
                  <div className="flex justify-between">
                    <span>{language === 'en' ? 'Barista Tip' : 'टिप'}</span>
                    <span className="tabular-nums text-[#FAF7F2]">₹{tip}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-semibold text-[#FAF7F2] pt-2 border-t border-[#2A2724]">
                  <span>{language === 'en' ? 'Total Payable' : 'कुल देय राशि'}</span>
                  <span className="tabular-nums text-[#C89B6D]">₹{grandTotal}</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#121110] bg-[#C89B6D] hover:bg-[#DEBA93] rounded transition-colors whitespace-nowrap active:scale-[0.99]"
              >
                <span>{language === 'en' ? 'Proceed to Order' : 'ऑर्डर करें'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
