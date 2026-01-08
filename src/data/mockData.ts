import { MenuItem, MenuWeek, User, WEEKDAYS } from '@/types/canteen';

export const mockUser: User = {
  userId: '1',
  schoolId: 'school-1',
  role: 'STUDENT',
  displayName: 'Emma Johnson',
  classGroup: '5B',
  defaultVegetarian: false,
  createdAt: new Date('2024-09-01'),
};

export const currentMenuWeek: MenuWeek = {
  menuWeekId: 'week-2',
  schoolId: 'school-1',
  year: 2026,
  weekNumber: 2,
  publishedAt: new Date('2026-01-05'),
};

export const menuItems: MenuItem[] = [
  // Monday
  {
    menuItemId: 'm1-main',
    menuWeekId: 'week-2',
    dayOfWeek: 1,
    type: 'MAIN',
    title: 'Spaghetti Bolognese',
    description: 'Classic Italian pasta with rich beef sauce, served with parmesan',
  },
  {
    menuItemId: 'm1-veg',
    menuWeekId: 'week-2',
    dayOfWeek: 1,
    type: 'VEG',
    title: 'Vegetable Lasagna',
    description: 'Layers of pasta with roasted vegetables and béchamel sauce',
  },
  // Tuesday
  {
    menuItemId: 'm2-main',
    menuWeekId: 'week-2',
    dayOfWeek: 2,
    type: 'MAIN',
    title: 'Grilled Chicken',
    description: 'Herb-marinated chicken breast with mashed potatoes and gravy',
  },
  {
    menuItemId: 'm2-veg',
    menuWeekId: 'week-2',
    dayOfWeek: 2,
    type: 'VEG',
    title: 'Stuffed Bell Peppers',
    description: 'Colorful peppers filled with quinoa, beans, and cheese',
  },
  // Wednesday
  {
    menuItemId: 'm3-main',
    menuWeekId: 'week-2',
    dayOfWeek: 3,
    type: 'MAIN',
    title: 'Fish & Chips',
    description: 'Crispy battered cod with golden fries and tartar sauce',
  },
  {
    menuItemId: 'm3-veg',
    menuWeekId: 'week-2',
    dayOfWeek: 3,
    type: 'VEG',
    title: 'Mac & Cheese',
    description: 'Creamy three-cheese macaroni baked until golden',
  },
  // Thursday
  {
    menuItemId: 'm4-main',
    menuWeekId: 'week-2',
    dayOfWeek: 4,
    type: 'MAIN',
    title: 'Beef Tacos',
    description: 'Seasoned ground beef in corn shells with fresh toppings',
  },
  {
    menuItemId: 'm4-veg',
    menuWeekId: 'week-2',
    dayOfWeek: 4,
    type: 'VEG',
    title: 'Bean Burritos',
    description: 'Black bean and rice burritos with guacamole',
  },
  // Friday
  {
    menuItemId: 'm5-main',
    menuWeekId: 'week-2',
    dayOfWeek: 5,
    type: 'MAIN',
    title: 'Pizza Day',
    description: 'Fresh-baked pepperoni pizza with a side salad',
  },
  {
    menuItemId: 'm5-veg',
    menuWeekId: 'week-2',
    dayOfWeek: 5,
    type: 'VEG',
    title: 'Margherita Pizza',
    description: 'Classic tomato, mozzarella, and basil pizza',
  },
];

export const menuAllergens: Record<string, string[]> = {
  'm1-main': ['GLUTEN', 'DAIRY'],
  'm1-veg': ['GLUTEN', 'DAIRY', 'EGGS'],
  'm2-main': ['DAIRY'],
  'm2-veg': ['DAIRY'],
  'm3-main': ['GLUTEN', 'FISH'],
  'm3-veg': ['GLUTEN', 'DAIRY'],
  'm4-main': ['GLUTEN'],
  'm4-veg': ['GLUTEN'],
  'm5-main': ['GLUTEN', 'DAIRY'],
  'm5-veg': ['GLUTEN', 'DAIRY'],
};

export const initialMealChoices: Record<string, { status: 'EATING' | 'NOT_EATING' | null; vegetarian: boolean }> = {
  '1': { status: 'EATING', vegetarian: false },
  '2': { status: 'EATING', vegetarian: true },
  '3': { status: null, vegetarian: false },
  '4': { status: null, vegetarian: false },
  '5': { status: null, vegetarian: false },
};
