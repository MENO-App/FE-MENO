export type Role = 'STUDENT' | 'STAFF' | 'KITCHEN' | 'ADMIN';
export type MealChoiceStatus = 'EATING' | 'NOT_EATING';
export type MealType = 'MAIN' | 'VEG';

export interface School {
  schoolId: string;
  name: string;
  timezone: string;
}

export interface User {
  userId: string;
  schoolId: string;
  role: Role;
  displayName: string;
  classGroup: string;
  defaultVegetarian: boolean;
  createdAt: Date;
}

export interface Allergy {
  allergyId: string;
  name: string;
}

export interface UserAllergy {
  userId: string;
  allergyId: string;
  notes: string;
}

export interface MenuWeek {
  menuWeekId: string;
  schoolId: string;
  year: number;
  weekNumber: number;
  publishedAt: Date | null;
}

export interface MenuItem {
  menuItemId: string;
  menuWeekId: string;
  dayOfWeek: number; // 1-5 for Mon-Fri
  type: MealType;
  title: string;
  description: string;
}

export interface MenuItemAllergen {
  menuItemId: string;
  allergenCode: string;
}

export interface MealPlan {
  userId: string;
  date: Date;
  status: MealChoiceStatus;
  wantsVegetarian: boolean;
}

// Common allergen codes
export const ALLERGEN_CODES: Record<string, { name: string; emoji: string }> = {
  GLUTEN: { name: 'Gluten', emoji: '🌾' },
  DAIRY: { name: 'Dairy', emoji: '🥛' },
  EGGS: { name: 'Eggs', emoji: '🥚' },
  NUTS: { name: 'Nuts', emoji: '🥜' },
  SOY: { name: 'Soy', emoji: '🫘' },
  FISH: { name: 'Fish', emoji: '🐟' },
  SHELLFISH: { name: 'Shellfish', emoji: '🦐' },
  SESAME: { name: 'Sesame', emoji: '🌱' },
};

export const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
