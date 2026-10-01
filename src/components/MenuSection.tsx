import React, { useState, useMemo } from 'react';
import { Search, Plus, Sparkles, SlidersHorizontal } from 'lucide-react';
import { MenuItem, MenuCategory, DietaryTag, Language } from '../types/cafe';
import { MENU_ITEMS } from '../data/cafeData';

interface MenuSectionProps {
  language: Language;
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  language,
  onSelectItem,
  onQuickAdd,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', labelEn: 'All Creations', labelHi: 'सभी व्यंजन व पेय' },
    { id: 'signature', labelEn: 'Signature Brews', labelHi: 'सिग्नेचर ब्रू' },
    { id: 'espresso', labelEn: 'Artisanal Espresso', labelHi: 'एस्प्रेसो' },
    { id: 'cold-crafts', labelEn: 'Cold Crafts & Tonics', labelHi: 'कोल्ड ब्रू व टॉनिक' },
    { id: 'bakery', labelEn: 'French Bakes', labelHi: 'फ्रेंच बेकरी' },
    { id: 'brunch', labelEn: 'Gourmet Brunch', labelHi: 'स्वादिष्ट ब्रंच' },
    { id: 'botanical-tea', labelEn: 'Botanical Teas', labelHi: 'रॉयल चाय' },
  ];

  const dietaryFilters = [
    { id: 'all', labelEn: 'All Diets', labelHi: 'सभी' },
    { id: 'bestseller', labelEn: '⭐ Bestsellers', labelHi: '⭐ लोकप्रिय' },
    { id: 'veg', labelEn: '🌱 Vegetarian', labelHi: '🌱 शाकाहारी' },
    { id: 'vegan', labelEn: '🌿 100% Plant Vegan', labelHi: '🌿 वीगन' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (selectedDietary !== 'all') {
        if (!item.tags.includes(selectedDietary as DietaryTag)) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameMatch =
          item.name.en.toLowerCase().includes(query) ||
          item.name.hi.toLowerCase().includes(query);
        const descMatch =
          item.description.en.toLowerCase().includes(query) ||
          item.description.hi.toLowerCase().includes(query);
        return nameMatch || descMatch;
      }
      return true;
    });
  }, [selectedCategory, selectedDietary, searchQuery]);

  return (
    <section id="menu" className="py-20 bg-[#121110] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-widest text-[#C89B6D] font-medium mb-2">
            {language === 'en' ? 'Curated Repertoire' : 'विशेष मेनू'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#FAF7F2] [text-wrap:balance]">
            {language === 'en' ? 'Crafted for the Discerning Palate' : 'स्वाद और सुगंध की अद्भुत कला'}
          </h2>
          <p className="text-sm text-[#9E978E] mt-3">
            {language === 'en'
              ? 'From single-estate Ethiopian microlots to 27-layer butter croissants, every item is prepared to order.'
              : 'सिंगल-ओरिजिन बीन्स से लेकर ताज़ी बेकरी तक, हर पेय और व्यंजन पूर्ण समर्पण से तैयार किया जाता है।'}
          </p>
        </div>

        {/* Controls Bar: Search & Category Segmented Tabs */}
        <div className="space-y-4 mb-10">
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E978E]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'en'
                  ? 'Search flat white, croissant, cold brew, tartine...'
                  : 'कॉफ़ी, क्रोइसैंट, टोस्ट या चाय खोजें...'
              }
              className="w-full bg-[#181614] border border-[#2E2A26] rounded-lg pl-10 pr-4 py-2.5 text-xs text-[#FAF7F2] placeholder-[#736B62] focus:outline-none focus:border-[#C89B6D] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9E978E] hover:text-[#FAF7F2]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Interactive Category Tabs (functional buttons with click handlers) */}
          <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#C89B6D] text-[#121110] font-semibold shadow-sm'
                      : 'bg-[#181614] text-[#C2BCB3] hover:text-[#FAF7F2] border border-[#262320]'
                  }`}
                >
                  {language === 'en' ? cat.labelEn : cat.labelHi}
                </button>
              );
            })}
          </div>

          {/* Secondary Dietary Filter Bar */}
          <div className="flex items-center justify-center gap-2 text-xs">
            {dietaryFilters.map((df) => {
              const isActive = selectedDietary === df.id;
              return (
                <button
                  key={df.id}
                  onClick={() => setSelectedDietary(df.id)}
                  className={`px-2.5 py-1 rounded text-[11px] transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-[#2A2724] text-[#FAF7F2] border border-[#453F3A]'
                      : 'text-[#9E978E] hover:text-[#C2BCB3]'
                  }`}
                >
                  {language === 'en' ? df.labelEn : df.labelHi}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid: 3-column desktop, generous whitespace */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#161513] rounded-xl border border-[#262320] max-w-lg mx-auto">
            <p className="text-sm text-[#FAF7F2]">
              {language === 'en' ? 'No creations found matching your filter.' : 'आपकी खोज के अनुसार कोई व्यंजन नहीं मिला।'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDietary('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-[#C89B6D] hover:underline"
            >
              {language === 'en' ? 'Reset all filters' : 'फ़िल्टर हटाएं'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-[#181614] border border-[#262320] rounded-xl overflow-hidden hover:border-[#3D3833] transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col"
              >
                {/* Product Image: takes dominant portion of card */}
                <div
                  onClick={() => onSelectItem(item)}
                  className="relative h-52 sm:h-56 w-full bg-[#1C1A18] overflow-hidden cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name.en}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181614] via-transparent to-transparent opacity-80" />

                  {/* Clean unboxed tag in corner */}
                  {item.tags.includes('bestseller') && (
                    <div className="absolute top-3 left-3 bg-[#121110]/85 backdrop-blur-sm border border-[#2E2A26] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#C89B6D] font-medium rounded">
                      Signature Pick
                    </div>
                  )}
                  {item.tags.includes('vegan') && !item.tags.includes('bestseller') && (
                    <div className="absolute top-3 left-3 bg-[#121110]/85 backdrop-blur-sm border border-[#2E2A26] px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-400 font-medium rounded">
                      100% Plant Vegan
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Header line: Title & Price */}
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        onClick={() => onSelectItem(item)}
                        className="text-base font-serif font-semibold text-[#FAF7F2] hover:text-[#C89B6D] cursor-pointer transition-colors leading-snug"
                      >
                        {language === 'en' ? item.name.en : item.name.hi}
                      </h3>
                      <span className="text-base font-semibold text-[#FAF7F2] tabular-nums whitespace-nowrap">
                        ₹{item.price}
                      </span>
                    </div>

                    {/* Unboxed Metadata Line with typographic separators */}
                    <div className="flex items-center gap-1.5 text-[11px] text-[#9E978E] mt-1.5">
                      <span>{item.category.replace('-', ' ').toUpperCase()}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.prepTimeMinutes}m prep</span>
                      {item.roastProfile && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="truncate max-w-[150px]">{item.roastProfile}</span>
                        </>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#9E978E] mt-2.5 line-clamp-2 leading-relaxed">
                      {language === 'en' ? item.description.en : item.description.hi}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-[#23201D] flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectItem(item)}
                      className="text-xs text-[#C89B6D] hover:text-[#DEBA93] transition-colors font-medium whitespace-nowrap"
                    >
                      {item.customizationGroups ? (
                        language === 'en' ? 'Customize & Details' : 'कस्टमाइज़ करें'
                      ) : (
                        language === 'en' ? 'View Details' : 'विवरण देखें'
                      )}
                    </button>

                    <button
                      onClick={() => {
                        if (item.customizationGroups && item.customizationGroups.length > 0) {
                          onSelectItem(item);
                        } else {
                          onQuickAdd(item);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#121110] bg-[#C89B6D] hover:bg-[#DEBA93] rounded transition-colors whitespace-nowrap active:scale-[0.98]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Add' : 'जोड़ें'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
