import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Language, MenuItem } from '../types/cafe';
import { MENU_ITEMS } from '../data/cafeData';

interface BrewFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSelectBrew: (item: MenuItem) => void;
}

export const BrewFinderModal: React.FC<BrewFinderModalProps> = ({
  isOpen,
  onClose,
  language,
  onSelectBrew,
}) => {
  const [flavorPreference, setFlavorPreference] = useState<'bold' | 'sweet-creamy' | 'bright-floral'>('sweet-creamy');
  const [tempPreference, setTempPreference] = useState<'hot' | 'cold'>('hot');
  const [dairyPreference, setDairyPreference] = useState<'dairy' | 'plant'>('dairy');

  if (!isOpen) return null;

  // Compute recommendation
  const getRecommendation = (): MenuItem => {
    if (tempPreference === 'cold') {
      if (flavorPreference === 'bright-floral') {
        return MENU_ITEMS.find((m) => m.id === 'sig-cascara-tonic') || MENU_ITEMS[1];
      }
      return MENU_ITEMS.find((m) => m.id === 'sig-spanish-latte') || MENU_ITEMS[4];
    } else {
      if (flavorPreference === 'bright-floral') {
        return MENU_ITEMS.find((m) => m.id === 'sig-v60-pourover') || MENU_ITEMS[5];
      }
      if (flavorPreference === 'sweet-creamy') {
        return MENU_ITEMS.find((m) => m.id === 'sig-pistachio-latte') || MENU_ITEMS[2];
      }
      return MENU_ITEMS.find((m) => m.id === 'sig-terroir-cortado') || MENU_ITEMS[0];
    }
  };

  const recommendedItem = getRecommendation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#181614] border border-[#2A2724] rounded-xl p-6 sm:p-8 text-[#FAF7F2] shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#9E978E] hover:text-[#FAF7F2] rounded-lg transition-colors"
          aria-label="Close Brew Finder"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C89B6D] mb-2 font-medium">
          <Sparkles className="w-4 h-4" />
          <span>{language === 'en' ? 'Interactive Sommelier' : 'कॉफ़ी सोम्मेलियर'}</span>
        </div>

        <h2 className="text-2xl font-serif font-medium text-[#FAF7F2] mb-1">
          {language === 'en' ? 'Find Your Perfect Cup' : 'अपनी पसंद की कॉफ़ी पहचानें'}
        </h2>
        <p className="text-xs text-[#9E978E] mb-6">
          {language === 'en'
            ? 'Answer 3 quick preferences and let our roast master match your palate.'
            : '3 आसान सवाल और हमारे रोस्ट मास्टर आपके लिए सबसे उत्तम पेय चुनेंगे।'}
        </p>

        {/* Step 1: Temperature */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#C2BCB3] mb-2 font-medium">
              1. {language === 'en' ? 'Temperature Preference' : 'तापमान की पसंद'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTempPreference('hot')}
                className={`py-2.5 px-3 text-xs font-medium rounded border transition-colors ${
                  tempPreference === 'hot'
                    ? 'bg-[#C89B6D] text-[#121110] border-[#C89B6D] font-semibold'
                    : 'bg-[#1F1D1A] text-[#C2BCB3] border-[#2E2A26] hover:border-[#453F3A]'
                }`}
              >
                ☕ {language === 'en' ? 'Steamed & Warm' : 'गरम और ताज़ा'}
              </button>
              <button
                type="button"
                onClick={() => setTempPreference('cold')}
                className={`py-2.5 px-3 text-xs font-medium rounded border transition-colors ${
                  tempPreference === 'cold'
                    ? 'bg-[#C89B6D] text-[#121110] border-[#C89B6D] font-semibold'
                    : 'bg-[#1F1D1A] text-[#C2BCB3] border-[#2E2A26] hover:border-[#453F3A]'
                }`}
              >
                🧊 {language === 'en' ? 'Iced & Refreshing' : 'ठंडी और चिल्ड'}
              </button>
            </div>
          </div>

          {/* Step 2: Flavor Profile */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#C2BCB3] mb-2 font-medium">
              2. {language === 'en' ? 'Flavor Character' : 'स्वाद का प्रकार'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'bold', labelEn: 'Rich & Bold', labelHi: 'डार्क व बोल्ड' },
                { id: 'sweet-creamy', labelEn: 'Velvet & Sweet', labelHi: 'क्रीमी व मीठा' },
                { id: 'bright-floral', labelEn: 'Floral & Crisp', labelHi: 'फ्रूटी व फ्लोरल' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFlavorPreference(f.id as any)}
                  className={`py-2.5 px-2 text-[11px] font-medium rounded border transition-colors text-center ${
                    flavorPreference === f.id
                      ? 'bg-[#C89B6D] text-[#121110] border-[#C89B6D] font-semibold'
                      : 'bg-[#1F1D1A] text-[#C2BCB3] border-[#2E2A26] hover:border-[#453F3A]'
                  }`}
                >
                  {language === 'en' ? f.labelEn : f.labelHi}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Dairy */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#C2BCB3] mb-2 font-medium">
              3. {language === 'en' ? 'Dairy or Plant-Based' : 'दूध की पसंद'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDairyPreference('dairy')}
                className={`py-2.5 px-3 text-xs font-medium rounded border transition-colors ${
                  dairyPreference === 'dairy'
                    ? 'bg-[#C89B6D] text-[#121110] border-[#C89B6D] font-semibold'
                    : 'bg-[#1F1D1A] text-[#C2BCB3] border-[#2E2A26] hover:border-[#453F3A]'
                }`}
              >
                🥛 {language === 'en' ? 'Farm Fresh Dairy' : 'शुद्ध डेयरी दूध'}
              </button>
              <button
                type="button"
                onClick={() => setDairyPreference('plant')}
                className={`py-2.5 px-3 text-xs font-medium rounded border transition-colors ${
                  dairyPreference === 'plant'
                    ? 'bg-[#C89B6D] text-[#121110] border-[#C89B6D] font-semibold'
                    : 'bg-[#1F1D1A] text-[#C2BCB3] border-[#2E2A26] hover:border-[#453F3A]'
                }`}
              >
                🌱 {language === 'en' ? 'Oat / Almond Milk' : 'ओट / बादाम दूध'}
              </button>
            </div>
          </div>
        </div>

        {/* Recommended Result Box */}
        <div className="bg-[#1F1D1A] border border-[#2E2A26] rounded-lg p-4 mb-6">
          <div className="text-[11px] uppercase tracking-wider text-[#C89B6D] font-medium mb-1">
            {language === 'en' ? 'Recommended For You:' : 'आपके लिए अनुशंसित पेय:'}
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-base font-serif font-semibold text-[#FAF7F2]">
                {language === 'en' ? recommendedItem.name.en : recommendedItem.name.hi}
              </h4>
              <p className="text-xs text-[#9E978E] mt-0.5 line-clamp-2">
                {language === 'en' ? recommendedItem.description.en : recommendedItem.description.hi}
              </p>
              {recommendedItem.roastProfile && (
                <div className="text-[11px] text-[#C89B6D] mt-1.5">
                  {recommendedItem.roastProfile}
                </div>
              )}
            </div>
            <div className="text-base font-semibold text-[#FAF7F2] tabular-nums whitespace-nowrap">
              ₹{recommendedItem.price}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            onSelectBrew(recommendedItem);
            onClose();
          }}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#121110] bg-[#C89B6D] hover:bg-[#DEBA93] rounded transition-colors whitespace-nowrap"
        >
          <span>{language === 'en' ? 'Customize & Add This Brew' : 'यह कॉफ़ी कस्टमाइज़ और ऑर्डर करें'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
