import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { StorySection } from './components/StorySection';
import { AmbienceSection } from './components/AmbienceSection';
import { ReservationSection } from './components/ReservationSection';
import { VisitSection } from './components/VisitSection';
import { Footer } from './components/Footer';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { BrewFinderModal } from './components/BrewFinderModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Language, MenuItem, CartItem, CartCustomizationSelection } from './types/cafe';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('cafe_lang') as Language) || 'en';
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cafe_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBrewFinderOpen, setIsBrewFinderOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSummary, setOrderSummary] = useState<{
    subtotal: number;
    discount: number;
    tax: number;
    tip: number;
    total: number;
    orderType: 'dine-in' | 'takeaway';
    tableOrPickupNote: string;
  } | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync language with localStorage
  const handleToggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === 'en' ? 'hi' : 'en';
      localStorage.setItem('cafe_lang', next);
      return next;
    });
  };

  // Sync cart with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cafe_cart', JSON.stringify(cartItems));
    } catch (e) {
      // safe fallback
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add customized item to cart
  const handleAddToCart = (
    item: MenuItem,
    quantity: number,
    selectedCustomizations: CartCustomizationSelection,
    unitPrice: number,
    specialInstructions?: string
  ) => {
    const customKey = `${item.id}-${JSON.stringify(selectedCustomizations)}-${specialInstructions || ''}`;
    
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.cartItemId === customKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          cartItemId: customKey,
          menuItem: item,
          quantity,
          selectedCustomizations,
          unitPrice,
          specialInstructions,
        };
        return [...prev, newItem];
      }
    });

    showToast(
      language === 'en'
        ? `Added ${quantity}x ${item.name.en} to order`
        : `ऑर्डर में जोड़ा गया: ${item.name.hi}`
    );
  };

  // Quick add without customization
  const handleQuickAdd = (item: MenuItem) => {
    const defaults: CartCustomizationSelection = {};
    if (item.customizationGroups) {
      item.customizationGroups.forEach((g) => {
        if (g.defaultOption) defaults[g.id] = g.defaultOption;
      });
    }

    handleAddToCart(item, 1, defaults, item.price);
  };

  // Update quantity in cart
  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // Remove item
  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // Clear entire cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Proceed to Checkout
  const handleProceedToCheckout = (summary: {
    subtotal: number;
    discount: number;
    tax: number;
    tip: number;
    total: number;
    orderType: 'dine-in' | 'takeaway';
    tableOrPickupNote: string;
  }) => {
    setOrderSummary(summary);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = () => {
    setCartItems([]);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-[#121110] text-[#E8E4DF] flex flex-col font-sans selection:bg-[#C89B6D] selection:text-[#121110]">
      {/* Navbar following strict Top Bar Contract */}
      <Navbar
        language={language}
        onToggleLanguage={handleToggleLanguage}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => scrollToSection('reservations')}
        onOpenBrewFinder={() => setIsBrewFinderOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          language={language}
          onExploreMenu={() => scrollToSection('menu')}
          onReserveTable={() => scrollToSection('reservations')}
          onOpenBrewFinder={() => setIsBrewFinderOpen(true)}
        />

        {/* Menu Showcase with Filtering & Customization */}
        <MenuSection
          language={language}
          onSelectItem={(item) => setCustomizingItem(item)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Story & Roasting Ethos */}
        <StorySection language={language} />

        {/* Ambience & Work Spaces */}
        <AmbienceSection
          language={language}
          onReserveTable={() => scrollToSection('reservations')}
        />

        {/* Table Reservation Module */}
        <ReservationSection language={language} />

        {/* Location, Hours & Amenities */}
        <VisitSection language={language} />
      </main>

      {/* Clean Footer */}
      <Footer
        language={language}
        onOpenBrewFinder={() => setIsBrewFinderOpen(true)}
        onOpenReservation={() => scrollToSection('reservations')}
      />

      {/* Modals & Drawers */}
      <ItemCustomizerModal
        item={customizingItem}
        isOpen={Boolean(customizingItem)}
        onClose={() => setCustomizingItem(null)}
        language={language}
        onAddToCart={handleAddToCart}
      />

      <BrewFinderModal
        isOpen={isBrewFinderOpen}
        onClose={() => setIsBrewFinderOpen(false)}
        language={language}
        onSelectBrew={(item) => setCustomizingItem(item)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        language={language}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        language={language}
        cartItems={cartItems}
        orderSummary={orderSummary}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1A18] border border-[#C89B6D]/60 text-[#FAF7F2] px-4 py-3 rounded-lg shadow-xl flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom-3 duration-200">
          <div className="w-5 h-5 rounded-full bg-[#C89B6D] text-[#121110] flex items-center justify-center font-bold">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-[#C89B6D] hover:underline font-semibold"
          >
            {language === 'en' ? 'View Cart' : 'कार्ट देखें'}
          </button>
        </div>
      )}
    </div>
  );
}
