import { MenuItem } from '../types/cafe';

import heroAmbienceImg from '../assets/images/cafe_hero_ambience_1790851405946.jpg';
import espressoArtImg from '../assets/images/cafe_espresso_art_1790851420734.jpg';
import artisanalPastriesImg from '../assets/images/cafe_artisanal_pastries_1790851434568.jpg';
import coldBrewSignatureImg from '../assets/images/cafe_cold_brew_signature_1790851452302.jpg';

export const CAFE_IMAGES = {
  heroAmbience: heroAmbienceImg,
  espressoArt: espressoArtImg,
  artisanalPastries: artisanalPastriesImg,
  coldBrewSignature: coldBrewSignatureImg,
};

export const CAFE_INFO = {
  name: 'Café Terroir',
  nameHi: 'कैफ़े तेरुआ',
  tagline: 'Artisanal Roastery & Slow Bakehouse',
  taglineHi: 'हस्तनिर्मित रोस्टरी और बेकहाउस',
  address: 'Heritage Quadrangle, Sector 29, Golf Course Road / Connaught Enclave',
  addressHi: 'हेरिटेज चौक, गोल्फ कोर्स रोड / कनॉट्स एन्क्लेव',
  phone: '+91 98110 44290',
  whatsapp: '+919811044290',
  email: 'bonjour@cafeterroir.in',
  hours: {
    weekdays: '7:30 AM – 11:00 PM',
    weekends: '7:30 AM – 11:30 PM',
  },
  amenities: [
    { en: 'High-Speed Optical Wi-Fi (350 Mbps)', hi: 'सुपरफास्ट वाई-फाई (350 Mbps)' },
    { en: 'Dedicated Work Lounges with Power Outlets', hi: 'वर्क लाउंज और चार्जिंग पॉइंट्स' },
    { en: 'Pet-Friendly Sunlit Garden Patio', hi: 'पालतू अनुकूल गार्डन आँगन' },
    { en: 'Valet & Underground Parking Available', hi: 'वैले और सुरक्षित पार्किंग सुविधा' },
    { en: 'Fresh In-House Micro-Batch Roasting', hi: 'दैनिक ताज़ा रोस्टेड अरेबिका बीन्स' },
  ],
  stats: [
    { value: '100%', labelEn: 'Estate Arabica', labelHi: 'सिंगल-ओरिजिन अरेबिका' },
    { value: '48h', labelEn: 'Cold Extraction', labelHi: 'धीमी कोल्ड ब्रू प्रक्रिया' },
    { value: '6:00 AM', labelEn: 'Fresh Daily Bakes', labelHi: 'ताज़ी बेकरी हर सुबह' },
    { value: '4.9★', labelEn: '2,800+ Guest Reviews', labelHi: '2,800+ खुश ग्राहक' },
  ],
};

const COFFEE_CUSTOMIZATIONS = [
  {
    id: 'milk',
    title: { en: 'Choice of Milk', hi: 'दूध का विकल्प' },
    options: [
      { name: 'Full Cream Whole Milk', priceModifier: 0 },
      { name: 'Barista Oat Milk', priceModifier: 40 },
      { name: 'Organic Almond Milk', priceModifier: 45 },
      { name: 'Soy Milk', priceModifier: 30 },
      { name: 'Skimmed Milk', priceModifier: 0 },
    ],
    defaultOption: 'Full Cream Whole Milk',
  },
  {
    id: 'sweetness',
    title: { en: 'Sweetness Level', hi: 'मिठास का स्तर' },
    options: [
      { name: 'No Added Sugar', priceModifier: 0 },
      { name: 'Half Sweet (Raw Demerara)', priceModifier: 0 },
      { name: 'Regular Sweet', priceModifier: 0 },
      { name: 'House Madagascar Vanilla Syrup', priceModifier: 35 },
      { name: 'Handcrafted Salted Caramel Syrup', priceModifier: 40 },
    ],
    defaultOption: 'No Added Sugar',
  },
  {
    id: 'espresso_shot',
    title: { en: 'Espresso Strength', hi: 'एस्प्रेसो की तीव्रता' },
    options: [
      { name: 'Standard Double Shot', priceModifier: 0 },
      { name: 'Single Shot (Milder)', priceModifier: 0 },
      { name: 'Triple Shot (+Extra Energy)', priceModifier: 45 },
      { name: 'Swiss Water Decaf', priceModifier: 30 },
    ],
    defaultOption: 'Standard Double Shot',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // Signature Brews
  {
    id: 'sig-terroir-cortado',
    name: { en: 'Signature Terroir Cortado', hi: 'सिग्नेचर तेरुआ कोरतादो' },
    description: {
      en: 'Equal parts velvety micro-foamed milk and our signature Chikmagalur medium-roast double shot.',
      hi: 'चिकमगलूर मीडियम-रोस्ट डबल शॉट और मखमली माइक्रो-फोम दूध का संतुलित मिश्रण।',
    },
    price: 240,
    category: 'signature',
    tags: ['bestseller', 'veg'],
    image: espressoArtImg,
    roastProfile: 'Medium Dark · Cocoa & Toasted Hazelnut',
    prepTimeMinutes: 4,
    calories: 90,
    customizationGroups: COFFEE_CUSTOMIZATIONS,
  },
  {
    id: 'sig-cascara-tonic',
    name: { en: 'Nitro Cascara Cold Brew Tonic', hi: 'नाइट्रो कास्करा कोल्ड ब्रू टॉनिक' },
    description: {
      en: '48-hour slow-steeped coffee infused with botanical tonic water, dehydrated blood orange, and rosemary mist.',
      hi: '48 घंटे कोल्ड-एक्सट्रैक्टेड कॉफ़ी, बोटेनिकल टॉनिक, लाल संतरा और रोज़मेरी के साथ।',
    },
    price: 290,
    category: 'cold-crafts',
    tags: ['bestseller', 'vegan'],
    image: coldBrewSignatureImg,
    roastProfile: 'Light Roast · Jasmine, Berries & Citrus',
    prepTimeMinutes: 3,
    calories: 45,
    customizationGroups: [
      {
        id: 'ice',
        title: { en: 'Ice Preference', hi: 'बर्फ का चयन' },
        options: [
          { name: 'Hand-carved Clear Ice Sphere', priceModifier: 0 },
          { name: 'Light Ice', priceModifier: 0 },
          { name: 'No Ice', priceModifier: 0 },
        ],
        defaultOption: 'Hand-carved Clear Ice Sphere',
      },
      {
        id: 'sweetness',
        title: { en: 'Sweetness', hi: 'मिठास' },
        options: [
          { name: 'Botanical Crisp (No Sugar)', priceModifier: 0 },
          { name: 'Organic Agave Hint', priceModifier: 20 },
        ],
        defaultOption: 'Botanical Crisp (No Sugar)',
      },
    ],
  },
  {
    id: 'sig-pistachio-latte',
    name: { en: 'Roasted Pistachio & Cardamom Latte', hi: 'पिस्ता और इलायची लाते' },
    description: {
      en: 'Stone-ground Sicilian pistachio cream, cracked green cardamom, double espresso, and steamed whole milk.',
      hi: 'पिसे हुए सिसिली पिस्ता का पेस्ट, हरी इलायची और ताज़ा एस्प्रेसो का समृद्ध संगम।',
    },
    price: 310,
    category: 'signature',
    tags: ['bestseller', 'veg'],
    image: espressoArtImg,
    roastProfile: 'Medium Roast · Nutty & Cardamom Spice',
    prepTimeMinutes: 5,
    calories: 220,
    customizationGroups: COFFEE_CUSTOMIZATIONS,
  },
  {
    id: 'sig-flat-white',
    name: { en: 'Artisanal Silk Flat White', hi: 'आर्टिसनल सिल्क फ़्लैट व्हाइट' },
    description: {
      en: 'Ristretto pull of our award-winning Attikan Estate bean, enveloped in ultra-fine microfoam.',
      hi: 'अट्टिकन एस्टेट अरेबिका बीन्स का रिस्ट्रेटो शॉट, क्रीमी माइक्रोफोम के साथ।',
    },
    price: 230,
    category: 'espresso',
    tags: ['veg'],
    image: espressoArtImg,
    roastProfile: 'Medium Roast · Toffee & Milk Chocolate',
    prepTimeMinutes: 4,
    calories: 120,
    customizationGroups: COFFEE_CUSTOMIZATIONS,
  },
  {
    id: 'sig-spanish-latte',
    name: { en: 'Dulce Spanish Iced Latte', hi: 'डुलसे स्पैनिश आइस्ड लाते' },
    description: {
      en: 'Chilled espresso poured over sweetened condensed milk, cinnamon bark infusion, and chilled dairy.',
      hi: 'मीठे गाढ़े दूध, दालचीनी और चिल्ड एस्प्रेसो का स्वादिष्ट स्पैनिश आइस्ड ब्लेंड।',
    },
    price: 270,
    category: 'cold-crafts',
    tags: ['veg'],
    image: coldBrewSignatureImg,
    roastProfile: 'Dark Roast · Caramel & Cinnamon',
    prepTimeMinutes: 4,
    calories: 240,
    customizationGroups: COFFEE_CUSTOMIZATIONS,
  },
  {
    id: 'sig-v60-pourover',
    name: { en: 'Single-Origin Ethiopian V60 Pour-Over', hi: 'इथियोपियन V60 पोर-ओवर कॉफ़ी' },
    description: {
      en: 'Manual hand-poured brew highlighting delicate jasmine floral aromas, peach sweetness, and tea-like elegance.',
      hi: 'हाथ से धीरे-धीरे ब्रू की गई सिंगल-ओरिजिन कॉफ़ी, जिसमें आड़ू और चमेली की खुशबू है।',
    },
    price: 260,
    category: 'espresso',
    tags: ['vegan'],
    image: coldBrewSignatureImg,
    roastProfile: 'Light Roast · Yirgacheffe Highlands',
    prepTimeMinutes: 6,
    calories: 5,
  },

  // Bakery & Viennoiserie
  {
    id: 'bake-croissant',
    name: { en: 'Laminated French Butter Croissant', hi: 'शुद्ध बटर फ्रेंच क्रोइसैंट' },
    description: {
      en: 'Made with 84% Normandy cultured butter, folded into 27 crisp, paper-thin golden layers.',
      hi: 'नॉर्मंडी बटर से बना 27 परतों वाला क्रिस्पी, खस्ता और महकदार क्लासिक क्रोइसैंट।',
    },
    price: 180,
    category: 'bakery',
    tags: ['bestseller', 'veg'],
    image: artisanalPastriesImg,
    prepTimeMinutes: 2,
    calories: 260,
    customizationGroups: [
      {
        id: 'serving',
        title: { en: 'Warmth', hi: 'परोसने का तरीका' },
        options: [
          { name: 'Warm & Flaky from the Oven', priceModifier: 0 },
          { name: 'Room Temperature', priceModifier: 0 },
        ],
        defaultOption: 'Warm & Flaky from the Oven',
      },
      {
        id: 'spread',
        title: { en: 'House Preserves', hi: 'होममेड जैम/स्प्रेड' },
        options: [
          { name: 'No Spread', priceModifier: 0 },
          { name: 'Wild Raspberry Rosemary Jam', priceModifier: 40 },
          { name: 'Dark Chocolate Hazelnut Gianduja', priceModifier: 50 },
        ],
        defaultOption: 'No Spread',
      },
    ],
  },
  {
    id: 'bake-pain-chocolat',
    name: { en: 'Valrhona Pain au Chocolat', hi: 'वाल्ह्रोना पेन औ शोकोला' },
    description: {
      en: 'Two bars of 70% Valrhona dark chocolate enveloped in buttery, flaky puff pastry.',
      hi: '70% शुद्ध डार्क चॉकलेट और खस्ता बटर पफ पेस्ट्री का क्लासिक पेरिसियन डिश।',
    },
    price: 220,
    category: 'bakery',
    tags: ['veg'],
    image: artisanalPastriesImg,
    prepTimeMinutes: 2,
    calories: 310,
  },
  {
    id: 'bake-pistachio-cruffin',
    name: { en: 'Salted Caramel Cruffin', hi: 'सॉल्टेड कारमेल क्रफ़िन' },
    description: {
      en: 'Croissant dough baked in a muffin mould, filled with rich fleur de sel caramel and rolled in raw cane sugar.',
      hi: 'मफ़िन आकार का क्रोइसैंट, जिसमें भरा है नमकीन कारमेल और ऊपर भूरी शक्कर।',
    },
    price: 240,
    category: 'bakery',
    tags: ['veg'],
    image: artisanalPastriesImg,
    prepTimeMinutes: 2,
    calories: 340,
  },
  {
    id: 'bake-sourdough-loaf',
    name: { en: 'Slow-Fermented Country Sourdough (Half Loaf)', hi: 'कंट्री सोरडो ब्रेड (आधा लोफ)' },
    description: {
      en: '36-hour cold fermented with our 6-year-old sourdough mother. Crusty exterior with an airy, tangy crumb.',
      hi: '36 घंटे धीमी किण्वन से बनी क्रस्टी और स्पंजी प्राकृतिक खट्टी ब्रेड।',
    },
    price: 220,
    category: 'bakery',
    tags: ['vegan'],
    image: artisanalPastriesImg,
    prepTimeMinutes: 2,
    calories: 180,
  },

  // Savory Brunch & Gourmet Toasts
  {
    id: 'brunch-avocado-tartine',
    name: { en: 'Hass Avocado & Truffle Tartine', hi: 'ट्रफ़ल हास एवोकाडो टार्टिन' },
    description: {
      en: 'Toasted seeded sourdough, smashed Hass avocado, Persian feta, toasted pepitas, and white truffle emulsion.',
      hi: 'सीडेड सोरडो टोस्ट, मैश्ड एवोकाडो, फ़ेटा चीज़, कद्दू के बीज और वाइट ट्रफ़ल ऑयल।',
    },
    price: 380,
    category: 'brunch',
    tags: ['bestseller', 'veg'],
    image: heroAmbienceImg,
    prepTimeMinutes: 8,
    calories: 340,
    customizationGroups: [
      {
        id: 'egg_addon',
        title: { en: 'Egg Add-On', hi: 'अंडा जोड़ें' },
        options: [
          { name: 'Without Eggs (Pure Veg)', priceModifier: 0 },
          { name: 'Add Organic Poached Egg', priceModifier: 50 },
          { name: 'Add Sunny Side Up Egg', priceModifier: 50 },
        ],
        defaultOption: 'Without Eggs (Pure Veg)',
      },
    ],
  },
  {
    id: 'brunch-wild-mushroom-toast',
    name: { en: 'Garlic Wild Mushroom Brioche Toast', hi: 'गार्लिक वाइल्ड मशरूम ब्रियोश टोस्ट' },
    description: {
      en: 'Pan-seared cremini & oyster mushrooms in thyme garlic butter, whipped ricotta, and microgreens on toasted brioche.',
      hi: 'थाइम बटर में भुने हुए मशरूम, व्हिप्ड रिकोटा चीज़ और ताज़ी बटर ब्रियोश।',
    },
    price: 360,
    category: 'brunch',
    tags: ['veg'],
    image: heroAmbienceImg,
    prepTimeMinutes: 8,
    calories: 320,
  },
  {
    id: 'brunch-burrata-salad',
    name: { en: 'Heirloom Tomato & Buffalo Burrata', hi: 'एयरलूम टमाटर और बफ़ेलो बुराटा सलाद' },
    description: {
      en: 'Whole artisanal burrata cheese, confit cherry tomatoes, basil pesto drizzle, aged balsamic glaze, and toasted focaccia.',
      hi: 'ताज़ी बुराटा चीज़, कॉन्फ़िट टमाटर, बेसिल पेस्टो और 12-वर्षीय बालसैमिक सिरका।',
    },
    price: 440,
    category: 'brunch',
    tags: ['veg', 'gluten-free'],
    image: heroAmbienceImg,
    prepTimeMinutes: 6,
    calories: 390,
  },

  // Botanical & Rare Teas
  {
    id: 'tea-kashmiri-kahwa',
    name: { en: 'Artisanal Royal Kashmiri Kahwa', hi: 'रॉयल कश्मीरी कहवा' },
    description: {
      en: 'Green tea slow-simmered with saffron strands, crushed almonds, cinnamon bark, and green cardamom pods.',
      hi: 'कश्मीरी केसर, बादाम की कतरन, दालचीनी और इलायची से तैयार पारंपरिक ग्रीन टी कहवा।',
    },
    price: 210,
    category: 'botanical-tea',
    tags: ['vegan', 'bestseller'],
    image: coldBrewSignatureImg,
    prepTimeMinutes: 4,
    calories: 35,
  },
  {
    id: 'tea-hibiscus-mint',
    name: { en: 'Wild Hibiscus & Cranberry Iced Tea', hi: 'वाइल्ड हिबिस्कस और क्रैनबेरी आइस्ड टी' },
    description: {
      en: 'Sun-dried Egyptian hibiscus flowers infused with tart cranberries, fresh garden mint, and organic honey.',
      hi: 'गुड़हल के फूल, खट्टी क्रैनबेरी, ताज़ा पुदीना और प्राकृतिक शहद की रिफ्रेशिंग आइस्ड टी।',
    },
    price: 220,
    category: 'botanical-tea',
    tags: ['vegan', 'gluten-free'],
    image: coldBrewSignatureImg,
    prepTimeMinutes: 3,
    calories: 40,
  },
];

export const REVIEWS = [
  {
    author: 'Chef Ananya Verma',
    role: 'Culinary Editor, Food & Wine India',
    text: 'Café Terroir has single-handedly elevated the cafe culture. Their Chikmagalur single-origin roast is unmatched, and the 27-layer butter croissant transports you straight to Paris.',
    textHi: 'कैफ़े तेरुआ ने शहर में कॉफ़ी कल्चर को एक नए मुकाम पर पहुँचा दिया है। इनका सिंगल-ओरिजिन रोस्ट और 27 परतों वाला क्रोइसैंट लाजवाब है।',
    rating: 5,
    date: 'Verified Patron',
  },
  {
    author: 'Vikramaditya Roy',
    role: 'Architect & Regular Guest',
    text: 'The acoustic design, natural walnut tones, and exceptional Wi-Fi make it my second studio. The Avocado Tartine and Flat White are daily essentials.',
    textHi: 'खूबसूरत इंटीरियर, शांतिपूर्ण माहौल और 350 Mbps वाई-फाई इसे काम करने और मिलने की सबसे बेहतरीन जगह बनाते हैं।',
    rating: 5,
    date: '3-Year Club Member',
  },
  {
    author: 'Devika Sharma',
    role: 'Coffee Sommelier',
    text: 'The Nitro Cascara Tonic is an absolute revelation — bright, complex, and refreshing. The hospitality of the barista team is pure warmth.',
    textHi: 'नाइट्रो कास्करा टॉनिक कॉफ़ी की दुनिया का नया अजूबा है। बरिस्ता टीम का व्यवहार और कॉफ़ी की शुद्धता दिल जीत लेती है।',
    rating: 5,
    date: 'Weekly Regular',
  },
];
