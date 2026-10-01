import React, { useState } from 'react';
import { ArrowRight, Check, Heart, Instagram, Facebook } from 'lucide-react';
import { Language } from '../types/cafe';

interface FooterProps {
  language: Language;
  onOpenBrewFinder: () => void;
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenBrewFinder,
  onOpenReservation,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#0E0D0C] border-t border-[#23201D] text-[#C2BCB3] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <a
              href="#"
              className="text-2xl font-serif font-medium tracking-tight text-[#FAF7F2] hover:text-[#C89B6D] transition-colors"
            >
              Café Terroir
            </a>
            <p className="text-xs text-[#9E978E] leading-relaxed">
              {language === 'en'
                ? 'Artisanal roastery, slow fermented sourdough bakehouse, and acoustic sanctuary. Dedicated to single-origin estate beans and hospitality.'
                : 'हस्तनिर्मित रोस्टरी, प्राकृतिक सोरडो बेकरी और शांतिपूर्ण लाउंज। सिंगल-ओरिजिन अरेबिका बीन्स के प्रति समर्पित।'}
            </p>
            <div className="flex items-center gap-3 pt-2 text-[#9E978E]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FAF7F2] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FAF7F2] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]">
              {language === 'en' ? 'Quick Navigation' : 'त्वरित लिंक'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-[#FAF7F2] transition-colors">
                  {language === 'en' ? 'Artisanal Menu' : 'कॉफ़ी और बेकरी मेनू'}
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#FAF7F2] transition-colors">
                  {language === 'en' ? 'Our Roasting Ethos' : 'रोस्टिंग शिल्प'}
                </a>
              </li>
              <li>
                <a href="#ambience" className="hover:text-[#FAF7F2] transition-colors">
                  {language === 'en' ? 'The Space & Work Lounge' : 'वास्तु व माहौल'}
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenReservation}
                  className="hover:text-[#FAF7F2] transition-colors text-left"
                >
                  {language === 'en' ? 'Reserve a Table' : 'टेबल आरक्षण'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBrewFinder}
                  className="text-[#C89B6D] hover:underline transition-colors text-left"
                >
                  {language === 'en' ? 'Find Your Perfect Brew' : 'स्वाद सोम्मेलियर क्विज़'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]">
              {language === 'en' ? 'Service Hours' : 'खुलने का समय'}
            </h4>
            <div className="text-xs space-y-1.5 text-[#9E978E]">
              <div>
                <span className="text-[#FAF7F2]">Monday – Friday:</span> 7:30 AM – 11:00 PM
              </div>
              <div>
                <span className="text-[#FAF7F2]">Saturday – Sunday:</span> 7:30 AM – 11:30 PM
              </div>
              <div className="pt-2 text-[#C89B6D]">
                Fresh Viennoiserie Bakes from 6:00 AM daily
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]">
              {language === 'en' ? 'The Terroir Journal' : 'न्यूज़लेटर'}
            </h4>
            <p className="text-xs text-[#9E978E]">
              {language === 'en'
                ? 'Seasonal microlot releases, cupping workshops, and private jazz brunch invites.'
                : 'नए कॉफ़ी रोस्ट्स, बेकरी वर्कशॉप और विशेष आयोजनों के आमंत्रण हेतु जुड़ें।'}
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#1C261F] border border-emerald-800/50 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Welcome! Use code TERROIR10 for 10% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-1.5">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="flex-1 bg-[#181614] border border-[#2E2A26] rounded px-3 py-2 text-xs text-[#FAF7F2] placeholder-[#6E675E] focus:outline-none focus:border-[#C89B6D]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#C89B6D] hover:bg-[#DEBA93] text-[#121110] rounded text-xs font-semibold transition-colors"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & subtle note */}
        <div className="pt-8 border-t border-[#1C1A18] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#736B62]">
          <div>
            © {new Date().getFullYear()} Café Terroir Roastery & Slow Bakehouse. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Sector 29 · Connaught Enclave</span>
            <span aria-hidden="true">·</span>
            <span>Handcrafted with Care</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
