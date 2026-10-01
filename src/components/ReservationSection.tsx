import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, MapPin, CheckCircle2, Sparkles, Phone, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, ReservationData } from '../types/cafe';

interface ReservationSectionProps {
  language: Language;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ language }) => {
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [guestsCount, setGuestsCount] = useState(2);
  const [seatingZone, setSeatingZone] = useState<'indoor' | 'glasshouse' | 'garden' | 'barista-counter'>('glasshouse');
  const [occasion, setOccasion] = useState('Casual Catch-up');
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<ReservationData | null>(null);

  const timeSlots = [
    '8:30 AM',
    '10:00 AM',
    '11:30 AM',
    '1:00 PM',
    '3:30 PM',
    '5:00 PM',
    '6:30 PM',
    '8:00 PM',
    '9:30 PM',
  ];

  const seatingOptions = [
    {
      id: 'glasshouse',
      nameEn: 'Sunlit Glasshouse',
      nameHi: 'सनलिट ग्लासहाउस',
      descEn: 'Natural daylight, tropical ferns, lush peaceful greenery.',
      descHi: 'प्राकृतिक रोशनी, पौधे और सुकून भरा वातावरण।',
    },
    {
      id: 'indoor',
      nameEn: 'Acoustic Walnut Lounge',
      nameHi: 'अकोस्टिक वॉलनट लाउंज',
      descEn: 'Cozy private corners, soft jazz, ideal for deep focus or reading.',
      descHi: 'धीमा जैज़ संगीत, आरामदायक सोफ़ा और पढ़ाई/बातचीत के लिए उत्तम।',
    },
    {
      id: 'garden',
      nameEn: 'Garden Courtyard (Pet-Friendly)',
      nameHi: 'गार्डन आँगन (पालतू मित्रवत)',
      descEn: 'Open-air stone patio under flowering frangipani trees.',
      descHi: 'खुली हवा, फूलों के पेड़ और पालतू जानवरों के लिए सुलभ।',
    },
    {
      id: 'barista-counter',
      nameEn: 'Artisan Barista Counter',
      nameHi: 'बरिस्ता रोस्टिंग काउंटर',
      descEn: 'Front-row view of single-origin pour-overs and latte art.',
      descHi: 'बरिस्ता के सामने बैठकर पोर-ओवर और लाते आर्ट देखने का अनुभव।',
    },
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !phone.trim()) return;

    const newBooking: ReservationData = {
      id: `RES-${Math.floor(10000 + Math.random() * 90000)}`,
      guestName,
      phone,
      email: '',
      date,
      timeSlot,
      guestsCount,
      seatingZone,
      occasion,
      specialNotes,
      createdAt: new Date().toISOString(),
    };

    setConfirmedBooking(newBooking);

    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#C89B6D', '#E5C7A5', '#FAF7F2'],
      });
    } catch (e) {
      // safe fallback
    }
  };

  return (
    <section id="reservations" className="py-20 bg-[#161412] border-t border-b border-[#23201D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-[#C89B6D] font-medium mb-2">
            {language === 'en' ? 'Reserved Hospitality' : 'टेबल आरक्षण'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#FAF7F2] [text-wrap:balance]">
            {language === 'en' ? 'Reserve Your Sanctuary' : 'अपनी पसंदीदा टेबल अभी बुक करें'}
          </h2>
          <p className="text-sm text-[#9E978E] mt-3">
            {language === 'en'
              ? 'Whether it is a leisurely Sunday brunch, an intimate date, or a remote work session, we ensure your table is warm and ready.'
              : 'चाहे दोस्तों के साथ कॉफ़ी हो, मीटिंग या शांत पठन सत्र—हम आपकी टेबल को पहले से तैयार रखते हैं।'}
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-[#181614] border border-[#2A2724] rounded-2xl p-6 sm:p-10 shadow-2xl">
          {!confirmedBooking ? (
            <form onSubmit={handleBookingSubmit} className="space-y-8">
              {/* Row 1: Date, Time & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C2BCB3] mb-2 flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#C89B6D]" />
                    <span>{language === 'en' ? 'Select Date' : 'तारीख'} *</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#1C1A18] border border-[#2E2A26] rounded-lg px-3.5 py-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#C89B6D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C2BCB3] mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C89B6D]" />
                    <span>{language === 'en' ? 'Preferred Time' : 'समय'} *</span>
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-[#1C1A18] border border-[#2E2A26] rounded-lg px-3.5 py-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#C89B6D]"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts} className="bg-[#1C1A18]">
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C2BCB3] mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#C89B6D]" />
                    <span>{language === 'en' ? 'Party Size' : 'मेहमानों की संख्या'} *</span>
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-[#1C1A18] border border-[#2E2A26] rounded-lg px-3.5 py-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#C89B6D]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((n) => (
                      <option key={n} value={n} className="bg-[#1C1A18]">
                        {n} {n === 1 ? (language === 'en' ? 'Solo Guest' : 'अकेले') : (language === 'en' ? 'Guests' : 'मेहमान')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Seating Zone */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C2BCB3] mb-3 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C89B6D]" />
                  <span>{language === 'en' ? 'Select Preferred Seating Zone' : 'बैठने का पसंदीदा स्थान'}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {seatingOptions.map((opt) => {
                    const isSelected = seatingZone === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setSeatingZone(opt.id as any)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#23201D] border-[#C89B6D] text-[#FAF7F2] shadow-sm'
                            : 'bg-[#1C1A18] border-[#2E2A26] text-[#C2BCB3] hover:border-[#453F3A]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#FAF7F2]">
                            {language === 'en' ? opt.nameEn : opt.nameHi}
                          </span>
                          <span
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-[#C89B6D] bg-[#C89B6D]' : 'border-[#453F3A]'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#121110]" />}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#9E978E] mt-1 leading-normal">
                          {language === 'en' ? opt.descEn : opt.descHi}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: Contact & Special Occasion */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C2BCB3] mb-1.5">
                    {language === 'en' ? 'Full Name' : 'नाम'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder={language === 'en' ? 'e.g., Ananya Sengupta' : 'उदा. अनन्या सेनगुप्ता'}
                    className="w-full bg-[#1C1A18] border border-[#2E2A26] rounded-lg px-3.5 py-2.5 text-xs text-[#FAF7F2] placeholder-[#6E675E] focus:outline-none focus:border-[#C89B6D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C2BCB3] mb-1.5">
                    {language === 'en' ? 'Phone Number' : 'मोबाइल नंबर'} *
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="10-digit number"
                    className="w-full bg-[#1C1A18] border border-[#2E2A26] rounded-lg px-3.5 py-2.5 text-xs text-[#FAF7F2] placeholder-[#6E675E] focus:outline-none focus:border-[#C89B6D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C2BCB3] mb-1.5">
                    {language === 'en' ? 'Occasion' : 'अवसर'}
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full bg-[#1C1A18] border border-[#2E2A26] rounded-lg px-3.5 py-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#C89B6D]"
                  >
                    <option value="Casual Catch-up">Casual Catch-up / सामान्य मिलन</option>
                    <option value="Birthday Celebration">Birthday Celebration / जन्मदिन</option>
                    <option value="Romantic Anniversary">Romantic Date / डेट</option>
                    <option value="Business / Remote Work">Business Work Session / कार्य</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C2BCB3] mb-1.5">
                  {language === 'en' ? 'Special Requests (Optional)' : 'कोई विशेष आग्रह (वैकल्पिक)'}
                </label>
                <input
                  type="text"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder={
                    language === 'en'
                      ? 'e.g. Quiet corner, high chair for infant, anniversary candle on dessert'
                      : 'उदा. शांत कोना, बच्चे की कुर्सी, मोमबत्ती आदि'
                  }
                  className="w-full bg-[#1C1A18] border border-[#2E2A26] rounded-lg px-3.5 py-2.5 text-xs text-[#FAF7F2] placeholder-[#6E675E] focus:outline-none focus:border-[#C89B6D]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#121110] bg-[#C89B6D] hover:bg-[#DEBA93] rounded-lg transition-colors whitespace-nowrap active:scale-[0.99] shadow-md"
              >
                {language === 'en' ? 'Confirm Reservation (No Booking Fee)' : 'आरक्षण की पुष्टि करें (निःशुल्क)'}
              </button>
            </form>
          ) : (
            /* Confirmed Booking Voucher Card */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-950/70 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <div className="text-xs uppercase tracking-widest text-[#C89B6D] font-medium mb-1">
                  {language === 'en' ? 'Reservation Confirmed' : 'आरक्षण स्वीकृत'}
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#FAF7F2]">
                  {language === 'en' ? `We Look Forward to Welcoming You, ${confirmedBooking.guestName}` : `स्वागत है, ${confirmedBooking.guestName}!`}
                </h3>
                <p className="text-xs text-[#9E978E] mt-2">
                  {language === 'en'
                    ? `Booking Reference: ${confirmedBooking.id} · A confirmation SMS has been prepared for ${confirmedBooking.phone}.`
                    : `बुकिंग कोड: ${confirmedBooking.id} · आपके नंबर ${confirmedBooking.phone} पर एसएमएस भेजा गया है।`}
                </p>
              </div>

              {/* Voucher Details */}
              <div className="max-w-md mx-auto bg-[#1C1A18] border border-[#2E2A26] rounded-xl p-5 text-left space-y-3">
                <div className="flex justify-between text-xs border-b border-[#2A2724] pb-2">
                  <span className="text-[#9E978E]">{language === 'en' ? 'Date & Time' : 'तारीख व समय'}</span>
                  <span className="font-semibold text-[#FAF7F2]">
                    {confirmedBooking.date} at {confirmedBooking.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between text-xs border-b border-[#2A2724] pb-2">
                  <span className="text-[#9E978E]">{language === 'en' ? 'Guests' : 'मेहमान'}</span>
                  <span className="font-semibold text-[#FAF7F2]">
                    {confirmedBooking.guestsCount} {language === 'en' ? 'Guests' : 'लोग'}
                  </span>
                </div>
                <div className="flex justify-between text-xs border-b border-[#2A2724] pb-2">
                  <span className="text-[#9E978E]">{language === 'en' ? 'Seating Zone' : 'स्थान'}</span>
                  <span className="font-semibold text-[#C89B6D] capitalize">
                    {confirmedBooking.seatingZone.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#9E978E]">{language === 'en' ? 'Occasion' : 'अवसर'}</span>
                  <span className="font-semibold text-[#FAF7F2]">{confirmedBooking.occasion}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="py-2.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#121110] bg-[#C89B6D] hover:bg-[#DEBA93] rounded transition-colors"
                >
                  {language === 'en' ? 'Book Another Table' : 'अन्य बुकिंग करें'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
