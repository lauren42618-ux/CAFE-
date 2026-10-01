import React, { useState } from 'react';
import { X, CheckCircle, Coffee, Clock, ShieldCheck, ArrowRight, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, CartItem } from '../types/cafe';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  cartItems: CartItem[];
  orderSummary: {
    subtotal: number;
    discount: number;
    tax: number;
    tip: number;
    total: number;
    orderType: 'dine-in' | 'takeaway';
    tableOrPickupNote: string;
  } | null;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  language,
  cartItems,
  orderSummary,
  onOrderCompleted,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'counter'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen || !orderSummary) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `TR-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderConfirmed(true);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#C89B6D', '#E5C7A5', '#FAF7F2', '#3D3833'],
        });
      } catch (err) {
        // Fallback gracefully
      }

      onOrderCompleted();
    }, 900);
  };

  const handleCloseAll = () => {
    setOrderConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#181614] border border-[#2A2724] rounded-xl text-[#FAF7F2] shadow-2xl overflow-hidden p-6 sm:p-8">
        <button
          onClick={handleCloseAll}
          className="absolute top-4 right-4 p-2 text-[#9E978E] hover:text-[#FAF7F2] rounded-lg transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderConfirmed ? (
          <div>
            <div className="text-xs uppercase tracking-widest text-[#C89B6D] font-medium mb-1">
              {language === 'en' ? 'Final Step' : 'अंतिम चरण'}
            </div>
            <h2 className="text-2xl font-serif font-medium text-[#FAF7F2] mb-1">
              {language === 'en' ? 'Confirm Your Order' : 'ऑर्डर की पुष्टि करें'}
            </h2>
            <p className="text-xs text-[#9E978E] mb-6">
              {language === 'en'
                ? `Total payable: ₹${orderSummary.total} (${orderSummary.orderType.toUpperCase()} · ${orderSummary.tableOrPickupNote})`
                : `कुल देय: ₹${orderSummary.total} (${orderSummary.tableOrPickupNote})`}
            </p>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C2BCB3] mb-1.5">
                  {language === 'en' ? 'Full Name' : 'आपका नाम'} *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={language === 'en' ? 'e.g., Rohan Kapoor' : 'जैसे, रोहन कपूर'}
                  className="w-full bg-[#1C1A18] border border-[#2E2A26] rounded-lg px-3 py-2 text-xs text-[#FAF7F2] placeholder-[#6E675E] focus:outline-none focus:border-[#C89B6D]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C2BCB3] mb-1.5">
                  {language === 'en' ? 'Contact Mobile Number' : 'मोबाइल नंबर'} *
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="10-digit mobile (e.g., 9812345678)"
                  className="w-full bg-[#1C1A18] border border-[#2E2A26] rounded-lg px-3 py-2 text-xs text-[#FAF7F2] placeholder-[#6E675E] focus:outline-none focus:border-[#C89B6D]"
                />
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C2BCB3] mb-1.5">
                  {language === 'en' ? 'Payment Preference' : 'भुगतान का प्रकार'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'upi', labelEn: '⚡ Instant UPI', labelHi: '⚡ यूपीआई' },
                    { id: 'card', labelEn: '💳 Card at Table', labelHi: '💳 कार्ड' },
                    { id: 'counter', labelEn: '💵 Pay at Counter', labelHi: '💵 काउंटर' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPaymentMethod(p.id as any)}
                      className={`p-2.5 rounded-lg border text-center text-xs font-medium transition-colors ${
                        paymentMethod === p.id
                          ? 'bg-[#C89B6D] text-[#121110] border-[#C89B6D] font-semibold'
                          : 'bg-[#1C1A18] text-[#C2BCB3] border-[#2E2A26] hover:border-[#453F3A]'
                      }`}
                    >
                      {language === 'en' ? p.labelEn : p.labelHi}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mini Item Recap */}
              <div className="p-3 bg-[#141311] border border-[#262320] rounded-lg text-xs space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-[#9E978E] font-medium">
                  {language === 'en' ? 'Order Summary' : 'ऑर्डर सारांश'}:
                </div>
                {cartItems.map((ci) => (
                  <div key={ci.cartItemId} className="flex justify-between text-[#C2BCB3]">
                    <span className="truncate max-w-[280px]">
                      {ci.quantity}x {language === 'en' ? ci.menuItem.name.en : ci.menuItem.name.hi}
                    </span>
                    <span className="tabular-nums font-mono">₹{ci.unitPrice * ci.quantity}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-[#262320] flex justify-between font-semibold text-[#FAF7F2]">
                  <span>{language === 'en' ? 'Total with GST & Tip' : 'कुल देय राशि'}</span>
                  <span className="text-[#C89B6D] tabular-nums font-mono">₹{orderSummary.total}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#121110] bg-[#C89B6D] hover:bg-[#DEBA93] rounded transition-colors whitespace-nowrap active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{language === 'en' ? 'Sending to Barista...' : 'बरिस्ता को भेजा जा रहा है...'}</span>
                ) : (
                  <>
                    <span>{language === 'en' ? 'Confirm & Place Order' : 'ऑर्डर कन्फर्म करें'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Success View */
          <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-600/40 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-[#C89B6D] font-medium mb-1">
                {language === 'en' ? 'Order Confirmed' : 'ऑर्डर स्वीकृत हुआ'}
              </div>
              <h3 className="text-2xl font-serif font-medium text-[#FAF7F2]">
                {language === 'en' ? 'Brewing in Progress!' : 'आपकी कॉफ़ी तैयार की जा रही है!'}
              </h3>
              <p className="text-xs text-[#9E978E] mt-1">
                {language === 'en'
                  ? `Thank you, ${customerName}. Order #${orderId} has been sent to our head barista.`
                  : `धन्यवाद, ${customerName}! ऑर्डर #${orderId} बरिस्ता काउंटर पर भेज दिया गया है।`}
              </p>
            </div>

            {/* Preparation Timeline */}
            <div className="bg-[#1C1A18] border border-[#2E2A26] rounded-lg p-4 text-left space-y-3">
              <div className="flex items-center gap-3 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[#FAF7F2] font-medium">
                  {language === 'en' ? 'Grinding Fresh Arabica Beans...' : 'ताज़ा अरेबिका बीन्स ग्राइंड हो रहे हैं...'}
                </span>
                <span className="ml-auto text-[11px] text-[#9E978E] tabular-nums font-mono">~10 mins</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#9E978E]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3D3833]" />
                <span>
                  {orderSummary.orderType === 'dine-in'
                    ? language === 'en' ? `Serving to: ${orderSummary.tableOrPickupNote}` : `परोसा जाएगा: ${orderSummary.tableOrPickupNote}`
                    : language === 'en' ? 'Ready for Pickup at Barista Counter' : 'काउंटर पर पिकअप हेतु तैयार होगा'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleCloseAll}
                className="py-2.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#121110] bg-[#C89B6D] hover:bg-[#DEBA93] rounded transition-colors"
              >
                {language === 'en' ? 'Back to Café' : 'कैफ़े पर लौटें'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
