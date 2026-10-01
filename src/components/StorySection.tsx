import React from 'react';
import { Award, Compass, Heart, Shield, Star, Quote } from 'lucide-react';
import { Language } from '../types/cafe';
import { REVIEWS } from '../data/cafeData';

interface StorySectionProps {
  language: Language;
}

export const StorySection: React.FC<StorySectionProps> = ({ language }) => {
  const pillars = [
    {
      num: '01',
      titleEn: 'Direct-Trade Estate Coffees',
      titleHi: 'डायरेक्ट-ट्रेड सिंगल-ओरिजिन बीन्स',
      descEn:
        'We skip multinational brokers to work directly with generational coffee estates in Chikmagalur and the Ethiopian highlands, guaranteeing fair compensation and pristine harvest traceability.',
      descHi:
        'हम बिना किसी बिचौलिए के सीधे भारत और इथियोपिया के बागानों से हाथ से चुनी गई अरेबिका बीन्स लाते हैं, जिससे किसानों को उचित मूल्य और हमें सर्वोत्तम गुणवत्ता मिलती है।',
    },
    {
      num: '02',
      titleEn: 'Small-Batch Cast-Iron Roasting',
      titleHi: 'धीमी कास्ट-आयरन माइक्रो रोस्टिंग',
      descEn:
        'Every batch is roasted in 5kg micro-lots on our restored vintage drum roaster. We tailor heat curves to coax out delicate floral aromatics, caramel sweetness, and full-bodied chocolate notes.',
      descHi:
        'हमारी रोस्टरी में केवल 5 किलोग्राम के छोटे बैच में बीन्स रोस्ट की जाती हैं, जिससे बीन्स के प्राकृतिक मिठास, कोको और फलों के स्वाद पूरी तरह निखर कर आते हैं।',
    },
    {
      num: '03',
      titleEn: 'Slow Fermented Viennoiserie',
      titleHi: '36-घंटे फर्मेंटेड फ्रेंच बेकरी',
      descEn:
        'Our bakehouse wakes before dawn. Using 84% Normandy butter and a 6-year wild sourdough starter, each croissant is patiently laminated over three days for unparalleled golden flakiness.',
      descHi:
        'हर सुबह 6 बजे हमारे शेफ 84% शुद्ध बटर और 6 साल पुरानी प्राकृतिक सोरडो स्टार्टर से ताज़ा क्रोइसैंट और खट्टी ब्रेड तैयार करते हैं।',
    },
  ];

  return (
    <section id="story" className="py-20 bg-[#121110] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="text-xs uppercase tracking-widest text-[#C89B6D] font-medium mb-2">
            {language === 'en' ? 'Our Guiding Philosophy' : 'हमारा दर्शन'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#FAF7F2] [text-wrap:balance]">
            {language === 'en'
              ? 'An Obsession with the Purest Cup & Crust'
              : 'उत्कृष्टता, धैर्य और स्वाद के प्रति अटूट निष्ठा'}
          </h2>
          <p className="text-sm text-[#9E978E] mt-3">
            {language === 'en'
              ? 'We founded Café Terroir on a simple conviction: great coffee should not be rushed, and real baking honors ancient patience.'
              : 'हमारा मानना है कि अच्छी कॉफ़ी कभी जल्दबाज़ी में नहीं बनाई जा सकती और असली बेकिंग धैर्य का सम्मान करती है।'}
          </p>
        </div>

        {/* 3 Pillars (Editorial Numbering, no mechanical snake case) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="bg-[#181614] border border-[#262320] rounded-xl p-8 hover:border-[#3D3833] transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-serif text-[#C89B6D] font-light block mb-4">
                  {pillar.num}.
                </span>
                <h3 className="text-lg font-serif font-semibold text-[#FAF7F2] mb-3">
                  {language === 'en' ? pillar.titleEn : pillar.titleHi}
                </h3>
                <p className="text-xs text-[#9E978E] leading-relaxed">
                  {language === 'en' ? pillar.descEn : pillar.descHi}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Claim-to-Proof Adjacency: Attributable Patron & Critic Testimonials */}
        <div className="pt-12 border-t border-[#23201D]">
          <div className="text-center mb-10">
            <div className="text-xs uppercase tracking-widest text-[#C89B6D] font-medium mb-1">
              {language === 'en' ? 'Social Proof & Praise' : 'अतिथि समीक्षाएं'}
            </div>
            <h3 className="text-2xl font-serif font-medium text-[#FAF7F2]">
              {language === 'en' ? 'Words from Our Table Companions' : 'हमारे अतिथियों के अनुभव'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev, index) => (
              <div
                key={index}
                className="bg-[#181614] border border-[#262320] rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#C89B6D] mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C89B6D]" />
                    ))}
                  </div>
                  <p className="text-xs text-[#C2BCB3] italic leading-relaxed mb-4">
                    "{language === 'en' ? rev.text : rev.textHi}"
                  </p>
                </div>
                <div className="pt-3 border-t border-[#262320] text-xs">
                  <div className="font-semibold text-[#FAF7F2]">{rev.author}</div>
                  <div className="text-[#9E978E] text-[11px]">{rev.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
