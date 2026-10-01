export type Language = 'en' | 'hi';

export type DietaryTag = 'veg' | 'vegan' | 'gluten-free' | 'bestseller';

export type MenuCategory = 
  | 'signature'
  | 'espresso'
  | 'cold-crafts'
  | 'bakery'
  | 'brunch'
  | 'botanical-tea';

export interface CustomizationOption {
  name: string;
  priceModifier: number;
}

export interface CustomizationGroup {
  id: string;
  title: { en: string; hi: string };
  required?: boolean;
  options: CustomizationOption[];
  defaultOption?: string;
}

export interface MenuItem {
  id: string;
  name: { en: string; hi: string };
  description: { en: string; hi: string };
  price: number;
  category: MenuCategory;
  tags: DietaryTag[];
  image: string;
  roastProfile?: string;
  prepTimeMinutes: number;
  calories?: number;
  customizationGroups?: CustomizationGroup[];
}

export interface CartCustomizationSelection {
  [groupId: string]: string;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  selectedCustomizations: CartCustomizationSelection;
  unitPrice: number;
  specialInstructions?: string;
}

export interface ReservationData {
  id: string;
  guestName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  seatingZone: 'indoor' | 'glasshouse' | 'garden' | 'barista-counter';
  occasion?: string;
  specialNotes?: string;
  createdAt: string;
}
