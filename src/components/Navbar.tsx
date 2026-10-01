import React, { useState, useEffect } from 'react';
import { ShoppingBag, Calendar, Menu as MenuIcon, X, Globe } from 'lucide-react';
import { Language } from '../types/cafe';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenBrewFinder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  cartCount,
  onOpenCart,
  onOpenReservation,
  onOpenBrewFinder,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#menu', labelEn: 'Menu', labelHi: 'मेनू' },
    { href: '#story', labelEn: 'Our Craft', labelHi: 'हमारा शिल्प' },
    { href: '#ambience', labelEn: 'Ambience', labelHi: 'एम्बियंस' },
    { href: '#reservations', labelEn: 'Reserve Table', labelHi: 'टेबल बुकिंग' },
    { href: '#visit', labelEn: 'Hours & Location', labelHi: 'समय और पता' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-[#121110]/95 backdrop-blur-md border-[#2A2724] py-3 shadow-lg'
          : 'bg-[#121110]/80 backdrop-blur-sm border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-2xl md:text-3xl font-serif font-medium tracking-tight text-[#FAF7F2] hover:text-[#C89B6D] transition-colors whitespace-nowrap shrink-0"
        >
          Café Terroir
        </a>

        {/* Zone 2: 4–6 nav links, 1–2 word labels, single-line */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#C2BCB3]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#FAF7F2] transition-colors whitespace-nowrap hover:underline underline-offset-8 decoration-[#C89B6D]"
            >
              {language === 'en' ? link.labelEn : link.labelHi}
            </a>
          ))}
          <button
            onClick={onOpenBrewFinder}
            className="text-xs uppercase tracking-wider text-[#C89B6D] hover:text-[#DEBA93] transition-colors whitespace-nowrap"
          >
            {language === 'en' ? 'Coffee Quiz' : 'कॉफ़ी खोजें'}
          </button>
        </nav>

        {/* Zone 3: 1–2 primary actions + language & cart */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Language Switcher */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#C2BCB3] hover:text-[#FAF7F2] hover:bg-[#1E1C1A] rounded transition-colors whitespace-nowrap"
            title="Switch Language / भाषा बदलें"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-[#C89B6D]" />
            <span className="font-medium tracking-wide">
              {language === 'en' ? 'हिंदी' : 'EN'}
            </span>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-[#C2BCB3] hover:text-[#FAF7F2] hover:bg-[#1E1C1A] rounded transition-colors whitespace-nowrap"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C89B6D] text-[#121110] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary CTA: Book a Table */}
          <button
            onClick={onOpenReservation}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#121110] bg-[#C89B6D] hover:bg-[#DEBA93] rounded transition-colors whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Book Table' : 'टेबल बुक करें'}</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#C2BCB3] hover:text-[#FAF7F2]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#181614] border-b border-[#2A2724] px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#E8E4DF] hover:text-[#C89B6D] py-1 border-b border-[#23201D]"
              >
                {language === 'en' ? link.labelEn : link.labelHi}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBrewFinder();
              }}
              className="text-left text-sm text-[#C89B6D] font-medium py-1"
            >
              {language === 'en' ? '✨ Find Your Perfect Brew (Quiz)' : '✨ अपनी मनपसंद कॉफ़ी चुनें (क्विज़)'}
            </button>
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-[#121110] bg-[#C89B6D] hover:bg-[#DEBA93] rounded"
            >
              {language === 'en' ? 'Book a Table' : 'टेबल बुक करें'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
