import React from 'react';
import { ArrowDown, Sparkles, Clock, Coffee, ShieldCheck } from 'lucide-react';
import { Language } from '../types/cafe';
import { CAFE_IMAGES, CAFE_INFO } from '../data/cafeData';

interface HeroProps {
  language: Language;
  onExploreMenu: () => void;
  onReserveTable: () => void;
  onOpenBrewFinder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onExploreMenu,
  onReserveTable,
  onOpenBrewFinder,
}) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background with measured contrast scrim for media overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={CAFE_IMAGES.heroAmbience}
          alt="Café Terroir architectural interior"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[#121110]/60 to-[#121110]/70" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle unboxed status & location kicker */}
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C89B6D] mb-5">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{language === 'en' ? 'Roasting Daily in Connaught Enclave' : 'ताज़ा अरेबिका रोस्टिंग · प्रतिदिन'}</span>
          <span aria-hidden="true">·</span>
          <span>{language === 'en' ? 'Open Today 7:30 AM – 11:30 PM' : 'खुला है आज रात 11:30 बजे तक'}</span>
        </div>

        {/* Primary Headline with text-wrap: balance */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-medium tracking-tight text-[#FAF7F2] leading-[1.08] mb-6 [text-wrap:balance]">
          {language === 'en' ? (
            <>
              Where Craft Roasting Meets <br />
              <span className="italic text-[#E5C7A5]">Quiet Parisian Elegance</span>
            </>
          ) : (
            <>
              शुद्ध अरेबिका कॉफ़ी और <br />
              <span className="italic text-[#E5C7A5]">पेरिसियन बेकरी का उत्कृष्ट संगम</span>
            </>
          )}
        </h1>

        {/* Subtitle with measure 65-75ch */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#C2BCB3] leading-relaxed mb-10 [text-wrap:balance]">
          {language === 'en'
            ? 'Single-estate shade-grown beans micro-roasted on site, 27-layer butter croissants pulled warm at dawn, and an acoustic walnut sanctuary for discerning conversations.'
            : 'भारत के शीर्ष बागानों की सिंगल-ओरिजिन अरेबिका बीन्स, हर सुबह 6 बजे ओवन से ताज़ा निकले फ्रेंच बटर क्रोइसैंट और सुकून भरा विश्वस्तरीय माहौल।'}
        </p>

        {/* Primary & Secondary Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            onClick={onExploreMenu}
            className="px-7 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#121110] bg-[#C89B6D] hover:bg-[#DEBA93] rounded transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap active:scale-[0.98]"
          >
            {language === 'en' ? 'Explore Full Menu' : 'मेनू देखें व ऑर्डर करें'}
          </button>

          <button
            onClick={onReserveTable}
            className="px-7 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#1E1C1A]/90 hover:bg-[#2A2724] border border-[#3D3833] rounded transition-all duration-200 whitespace-nowrap active:scale-[0.98]"
          >
            {language === 'en' ? 'Reserve a Table' : 'टेबल बुक करें'}
          </button>

          <button
            onClick={onOpenBrewFinder}
            className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium text-[#C89B6D] hover:text-[#FAF7F2] transition-colors whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-[#C89B6D]" />
            <span>{language === 'en' ? 'Coffee Quiz: Find Your Cup' : 'कॉफ़ी क्विज़'}</span>
          </button>
        </div>

        {/* Quantitative Trust Markers (Claim-to-Proof Adjacency) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#2A2724]/80 text-left">
          {CAFE_INFO.stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-2xl sm:text-3xl font-serif font-semibold text-[#FAF7F2] tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs text-[#9E978E]">
                {language === 'en' ? stat.labelEn : stat.labelHi}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
