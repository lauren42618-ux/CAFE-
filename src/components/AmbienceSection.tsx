import React, { useState } from 'react';
import { Wifi, Sparkles, Volume2, Sun, Coffee, BookOpen } from 'lucide-react';
import { Language } from '../types/cafe';
import { CAFE_IMAGES } from '../data/cafeData';

interface AmbienceSectionProps {
  language: Language;
  onReserveTable: () => void;
}

export const AmbienceSection: React.FC<AmbienceSectionProps> = ({ language, onReserveTable }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'roastery' | 'glasshouse' | 'work-lounge'>('all');

  const spaces = [
    {
      id: 'roastery',
      titleEn: 'The Central Barista Bar',
      titleHi: 'सेंट्रल बरिस्ता रोस्टिंग बार',
      descEn: 'Raw travertine countertop framing our customized chrome espresso gear. Watch precision pour-overs up close.',
      descHi: 'संगमरमर का काउंटर और हाथ से तैयार की जाने वाली ताज़ी कॉफ़ी की खुशबू।',
      image: CAFE_IMAGES.espressoArt,
      featureEn: 'Front-row brew seating',
      featureHi: 'बरिस्ता के सामने बैठक',
    },
    {
      id: 'glasshouse',
      titleEn: 'The Sunlit Glasshouse',
      titleHi: 'सनलिट ग्लासहाउस',
      descEn: 'Floor-to-ceiling iron glass frames with tropical monstera and morning daylight. Ideal for quiet brunches.',
      descHi: 'काँच की विशाल खिड़कियाँ, प्राकृतिक धूप और हरी-भरी वनस्पतियों से घिरा शांतिपूर्ण कोना।',
      image: CAFE_IMAGES.heroAmbience,
      featureEn: 'Natural daylight & plants',
      featureHi: 'प्राकृतिक रोशनी व पौधे',
    },
    {
      id: 'work-lounge',
      titleEn: 'The Walnut Focus Corner',
      titleHi: 'वॉलनट फोकस कॉर्नर',
      descEn: 'Acoustic-treated walnut paneling, dedicated power outlets at every desk, and soft jazz tuned under 55dB.',
      descHi: 'शांतिपूर्ण वातावरण, हर टेबल पर चार्जिंग सॉकेट और 350 Mbps ऑप्टिकल वाई-फाई।',
      image: CAFE_IMAGES.coldBrewSignature,
      featureEn: '350 Mbps Wi-Fi & silent zones',
      featureHi: 'सुपरफास्ट वाई-फाई व शांत ज़ोन',
    },
  ];

  const filteredSpaces = activeTab === 'all' ? spaces : spaces.filter((s) => s.id === activeTab);

  return (
    <section id="ambience" className="py-20 bg-[#141210] border-t border-[#23201D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#C89B6D] font-medium mb-2">
              {language === 'en' ? 'Spatial Design' : 'वास्तु व माहौल'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#FAF7F2] [text-wrap:balance]">
              {language === 'en' ? 'Crafted for Solitude & Conversation' : 'सुकून, बातचीत और रचना का ठिकाना'}
            </h2>
          </div>

          {/* Interactive space filter buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#1A1816] border border-[#2A2724] rounded-lg self-start md:self-auto">
            {[
              { id: 'all', labelEn: 'All Spaces', labelHi: 'सभी स्थान' },
              { id: 'roastery', labelEn: 'Barista Bar', labelHi: 'कॉफ़ी बार' },
              { id: 'glasshouse', labelEn: 'Glasshouse', labelHi: 'ग्लासहाउस' },
              { id: 'work-lounge', labelEn: 'Work Lounge', labelHi: 'वर्क लाउंज' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#C89B6D] text-[#121110] font-semibold'
                    : 'text-[#9E978E] hover:text-[#FAF7F2]'
                }`}
              >
                {language === 'en' ? tab.labelEn : tab.labelHi}
              </button>
            ))}
          </div>
        </div>

        {/* Space Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredSpaces.map((space) => (
            <div
              key={space.id}
              className="bg-[#181614] border border-[#262320] rounded-xl overflow-hidden group hover:border-[#3D3833] transition-all flex flex-col justify-between"
            >
              <div className="relative h-60 w-full overflow-hidden bg-[#1E1C1A]">
                <img
                  src={space.image}
                  alt={space.titleEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181614] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 bg-[#121110]/85 backdrop-blur-sm px-2.5 py-1 text-[11px] text-[#C89B6D] font-medium border border-[#2A2724] rounded">
                  {language === 'en' ? space.featureEn : space.featureHi}
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif font-semibold text-[#FAF7F2] mb-1.5">
                    {language === 'en' ? space.titleEn : space.titleHi}
                  </h3>
                  <p className="text-xs text-[#9E978E] leading-relaxed">
                    {language === 'en' ? space.descEn : space.descHi}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#23201D] flex items-center justify-between">
                  <span className="text-xs text-[#C2BCB3]">
                    {language === 'en' ? 'Open for reservations' : 'आरक्षण उपलब्ध'}
                  </span>
                  <button
                    onClick={onReserveTable}
                    className="text-xs font-semibold text-[#C89B6D] hover:text-[#DEBA93] transition-colors"
                  >
                    {language === 'en' ? 'Reserve Here →' : 'टेबल चुनें →'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
