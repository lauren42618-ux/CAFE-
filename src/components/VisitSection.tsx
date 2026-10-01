import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, MessageSquare, Navigation, CheckCircle, Wifi, Car, Dog, Zap } from 'lucide-react';
import { Language } from '../types/cafe';
import { CAFE_INFO } from '../data/cafeData';

interface VisitSectionProps {
  language: Language;
}

export const VisitSection: React.FC<VisitSectionProps> = ({ language }) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  // Check if cafe is currently open
  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    // Open between 7:30 AM (7) and 11:30 PM (23)
    setIsOpenNow(currentHour >= 7 && currentHour < 23);
  }, []);

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText(CAFE_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="visit" className="py-20 bg-[#121110] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-[#C89B6D] font-medium mb-2">
            {language === 'en' ? 'Location & Hospitality' : 'हमारा पता और समय'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#FAF7F2] [text-wrap:balance]">
            {language === 'en' ? 'A Warm Seat Awaits You' : 'हमारी चौखट पर आपका स्वागत है'}
          </h2>
          <p className="text-sm text-[#9E978E] mt-3">
            {language === 'en'
              ? 'Tucked inside the heritage quadrangle with shaded courtyard parking and whisper-quiet garden nooks.'
              : 'हेरिटेज चौक के शांत वातावरण में स्थित, जहाँ पार्किंग और सुकून भरा आँगन उपलब्ध है।'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left card: Hours, Status & Contact */}
          <div className="lg:col-span-6 bg-[#181614] border border-[#262320] rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div>
              {/* Real-time Open Indicator */}
              <div className="flex items-center justify-between pb-6 border-b border-[#262320]">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                    }`}
                  />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]">
                    {isOpenNow
                      ? language === 'en' ? 'Open Now for Service' : 'इस समय खुला है'
                      : language === 'en' ? 'Opens at 7:30 AM Tomorrow' : 'कल सुबह 7:30 बजे खुलेगा'}
                  </span>
                </div>
                <span className="text-xs text-[#9E978E] tabular-nums font-mono">
                  7:30 AM – 11:30 PM
                </span>
              </div>

              {/* Address details */}
              <div className="py-6 border-b border-[#262320] space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C89B6D] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#FAF7F2]">
                      {language === 'en' ? 'Address & Landmark' : 'पता व लैंडमार्क'}
                    </h4>
                    <p className="text-xs text-[#9E978E] mt-1 leading-relaxed">
                      {language === 'en' ? CAFE_INFO.address : CAFE_INFO.addressHi}
                    </p>
                    <p className="text-[11px] text-[#C89B6D] mt-1">
                      {language === 'en'
                        ? 'Adjacent to The Royal Court, Near Metro Gate 2'
                        : 'द रॉयल कोर्ट के समीप, मेट्रो गेट 2'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Operating Hours Table */}
              <div className="py-6 border-b border-[#262320] space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#FAF7F2]">
                  <Clock className="w-4 h-4 text-[#C89B6D]" />
                  <span>{language === 'en' ? 'Weekly Schedule' : 'साप्ताहिक समय सारिणी'}</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-[#9E978E]">
                    <span>{language === 'en' ? 'Monday – Friday' : 'सोमवार – शुक्रवार'}</span>
                    <span className="text-[#FAF7F2] tabular-nums font-mono">{CAFE_INFO.hours.weekdays}</span>
                  </div>
                  <div className="flex justify-between text-[#9E978E]">
                    <span>{language === 'en' ? 'Saturday – Sunday (Jazz Brunch)' : 'शनिवार – रविवार'}</span>
                    <span className="text-[#FAF7F2] tabular-nums font-mono">{CAFE_INFO.hours.weekends}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={`https://wa.me/${CAFE_INFO.whatsapp.replace('+', '')}?text=Hello%20Café%20Terroir,%20I%20would%20like%20to%20inquire%20about%20a%20table.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-[#1F2C24] hover:bg-[#25382B] border border-emerald-800/40 text-emerald-300 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Concierge</span>
              </a>

              <button
                onClick={handleCopyPhone}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-[#1E1C1A] hover:bg-[#2A2724] border border-[#2E2A26] text-[#FAF7F2] rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                {copiedPhone ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Phone className="w-3.5 h-3.5 text-[#C89B6D]" />}
                <span>{copiedPhone ? 'Copied Number!' : CAFE_INFO.phone}</span>
              </button>
            </div>
          </div>

          {/* Right card: Interactive Map Mockup + Amenities */}
          <div className="lg:col-span-6 space-y-6">
            {/* Visual Location Frame */}
            <div className="bg-[#181614] border border-[#262320] rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-[#C89B6D] font-medium">
                  {language === 'en' ? 'Neighborhood Map' : 'लोकेशन मैप'}
                </span>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent('Connaught Place Cafe New Delhi')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#C89B6D] hover:underline"
                >
                  <Navigation className="w-3 h-3" />
                  <span>{language === 'en' ? 'Get Driving Directions' : 'दिशा-निर्देश प्राप्त करें'}</span>
                </a>
              </div>

              {/* Styled Vector Map Preview */}
              <div className="relative h-56 rounded-xl bg-[#131211] border border-[#2E2A26] flex items-center justify-center overflow-hidden">
                {/* Decorative Map Grid Lines */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C89B6D_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="absolute w-full h-[1px] bg-[#332E29] top-1/3" />
                <div className="absolute w-full h-[1px] bg-[#332E29] top-2/3" />
                <div className="absolute h-full w-[1px] bg-[#332E29] left-1/3" />
                <div className="absolute h-full w-[1px] bg-[#332E29] left-2/3" />

                {/* Central Cafe Marker */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#C89B6D] text-[#121110] flex items-center justify-center shadow-xl animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="mt-2 bg-[#181614]/90 backdrop-blur-sm border border-[#3D3833] px-3 py-1 rounded text-xs font-semibold text-[#FAF7F2]">
                    Café Terroir
                  </div>
                  <div className="text-[10px] text-[#9E978E] mt-0.5">
                    Sector 29 / Connaught Quadrangle
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Amenities Grid */}
            <div className="bg-[#181614] border border-[#262320] rounded-2xl p-6">
              <h4 className="text-xs uppercase tracking-wider text-[#C2BCB3] font-semibold mb-4">
                {language === 'en' ? 'Guest Amenities & Comfort' : 'अतिथि सुविधाएं'}
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#1C1A18] border border-[#2A2724] rounded-lg flex items-center gap-2.5">
                  <Wifi className="w-4 h-4 text-[#C89B6D] shrink-0" />
                  <span className="text-[#C2BCB3]">350 Mbps Fiber Wi-Fi</span>
                </div>
                <div className="p-3 bg-[#1C1A18] border border-[#2A2724] rounded-lg flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-[#C89B6D] shrink-0" />
                  <span className="text-[#C2BCB3]">Plugs at every table</span>
                </div>
                <div className="p-3 bg-[#1C1A18] border border-[#2A2724] rounded-lg flex items-center gap-2.5">
                  <Car className="w-4 h-4 text-[#C89B6D] shrink-0" />
                  <span className="text-[#C2BCB3]">Valet Parking Service</span>
                </div>
                <div className="p-3 bg-[#1C1A18] border border-[#2A2724] rounded-lg flex items-center gap-2.5">
                  <Dog className="w-4 h-4 text-[#C89B6D] shrink-0" />
                  <span className="text-[#C2BCB3]">Pet-friendly Patio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
