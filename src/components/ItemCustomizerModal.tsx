import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Clock, Flame } from 'lucide-react';
import { MenuItem, Language, CartCustomizationSelection } from '../types/cafe';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onAddToCart: (
    item: MenuItem,
    quantity: number,
    selectedCustomizations: CartCustomizationSelection,
    unitPrice: number,
    specialInstructions?: string
  ) => void;
}

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  item,
  isOpen,
  onClose,
  language,
  onAddToCart,
}) => {
  if (!isOpen || !item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<CartCustomizationSelection>({});
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Initialize defaults
  useEffect(() => {
    if (item.customizationGroups) {
      const defaults: CartCustomizationSelection = {};
      item.customizationGroups.forEach((group) => {
        if (group.defaultOption) {
          defaults[group.id] = group.defaultOption;
        } else if (group.options.length > 0) {
          defaults[group.id] = group.options[0].name;
        }
      });
      setSelectedCustomizations(defaults);
    } else {
      setSelectedCustomizations({});
    }
    setQuantity(1);
    setSpecialInstructions('');
  }, [item]);

  // Calculate unit price with customizations
  const calculateUnitPrice = (): number => {
    let price = item.price;
    if (item.customizationGroups) {
      item.customizationGroups.forEach((group) => {
        const selectedOptionName = selectedCustomizations[group.id];
        if (selectedOptionName) {
          const opt = group.options.find((o) => o.name === selectedOptionName);
          if (opt) {
            price += opt.priceModifier;
          }
        }
      });
    }
    return price;
  };

  const unitPrice = calculateUnitPrice();
  const totalPrice = unitPrice * quantity;

  const handleOptionSelect = (groupId: string, optionName: string) => {
    setSelectedCustomizations((prev) => ({
      ...prev,
      [groupId]: optionName,
    }));
  };

  const handleConfirm = () => {
    onAddToCart(item, quantity, selectedCustomizations, unitPrice, specialInstructions.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col bg-[#181614] border border-[#2A2724] rounded-xl text-[#FAF7F2] shadow-2xl overflow-hidden">
        {/* Header with image & title */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-[#1E1C1A] shrink-0">
          <img
            src={item.image}
            alt={item.name.en}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181614] via-transparent to-black/30" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable details */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-serif font-medium text-[#FAF7F2]">
                  {language === 'en' ? item.name.en : item.name.hi}
                </h3>
                <p className="text-xs text-[#9E978E] mt-1 leading-relaxed">
                  {language === 'en' ? item.description.en : item.description.hi}
                </p>
              </div>
              <div className="text-lg font-semibold text-[#FAF7F2] tabular-nums whitespace-nowrap">
                ₹{item.price}
              </div>
            </div>

            {/* Prep time & calorie notes (unboxed) */}
            <div className="flex items-center gap-3 text-xs text-[#9E978E] mt-3 pt-3 border-t border-[#2A2724]">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#C89B6D]" />
                <span>{item.prepTimeMinutes} mins prep</span>
              </span>
              {item.calories && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-[#C89B6D]" />
                    <span>{item.calories} kcal</span>
                  </span>
                </>
              )}
              {item.roastProfile && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#C89B6D]">{item.roastProfile}</span>
                </>
              )}
            </div>
          </div>

          {/* Customization Groups */}
          {item.customizationGroups && item.customizationGroups.length > 0 && (
            <div className="space-y-5 pt-2">
              {item.customizationGroups.map((group) => (
                <div key={group.id} className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#C2BCB3]">
                    {language === 'en' ? group.title.en : group.title.hi}
                  </div>
                  <div className="space-y-1.5">
                    {group.options.map((option) => {
                      const isSelected = selectedCustomizations[group.id] === option.name;
                      return (
                        <button
                          key={option.name}
                          type="button"
                          onClick={() => handleOptionSelect(group.id, option.name)}
                          className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-xs transition-colors text-left ${
                            isSelected
                              ? 'bg-[#23201D] border-[#C89B6D] text-[#FAF7F2]'
                              : 'bg-[#1C1A18] border-[#2E2A26] text-[#C2BCB3] hover:border-[#453F3A]'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                isSelected ? 'border-[#C89B6D] bg-[#C89B6D]' : 'border-[#453F3A]'
                              }`}
                            >
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#121110]" />}
                            </span>
                            <span>{option.name}</span>
                          </span>
                          {option.priceModifier > 0 && (
                            <span className="text-[#C89B6D] font-medium tabular-nums">
                              +₹{option.priceModifier}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Special Barista Instructions */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#C2BCB3]">
              {language === 'en' ? 'Barista Notes / Special Requests' : 'बरिस्ता के लिए विशेष निर्देश'}
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder={
                language === 'en'
                  ? 'e.g., Extra hot, cinnamon on side, etc.'
                  : 'उदा. अधिक गर्म, दालचीनी अलग से, आदि'
              }
              className="w-full bg-[#1C1A18] border border-[#2E2A26] rounded-lg px-3 py-2 text-xs text-[#FAF7F2] placeholder-[#6E675E] focus:outline-none focus:border-[#C89B6D]"
            />
          </div>
        </div>

        {/* Footer with quantity & add to cart */}
        <div className="p-4 sm:p-5 bg-[#141311] border-t border-[#2A2724] flex items-center justify-between gap-4 shrink-0">
          {/* Quantity stepper */}
          <div className="flex items-center gap-3 bg-[#1C1A18] border border-[#2E2A26] rounded-lg p-1">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="p-1.5 text-[#C2BCB3] hover:text-[#FAF7F2] disabled:opacity-30"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-semibold tabular-nums px-1 text-[#FAF7F2]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-1.5 text-[#C2BCB3] hover:text-[#FAF7F2]"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add button */}
          <button
            onClick={handleConfirm}
            className="flex-1 flex items-center justify-between py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#121110] bg-[#C89B6D] hover:bg-[#DEBA93] rounded transition-colors whitespace-nowrap active:scale-[0.99]"
          >
            <span>{language === 'en' ? 'Add to Order' : 'ऑर्डर में जोड़ें'}</span>
            <span className="tabular-nums">₹{totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
