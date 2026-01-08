import { MealChoiceStatus, WEEKDAYS } from '@/types/canteen';

// Mock data for dashboard - simulating aggregated meal choices from all students
export const mockMealCounts: Record<number, { eating: number; notEating: number; pending: number; vegetarian: number; main: number }> = {
  1: { eating: 142, notEating: 23, pending: 15, vegetarian: 38, main: 104 },
  2: { eating: 156, notEating: 18, pending: 6, vegetarian: 45, main: 111 },
  3: { eating: 134, notEating: 31, pending: 15, vegetarian: 52, main: 82 },
  4: { eating: 148, notEating: 22, pending: 10, vegetarian: 41, main: 107 },
  5: { eating: 165, notEating: 8, pending: 7, vegetarian: 55, main: 110 },
};

export const mockAllergenCounts: Record<string, { total: number; affected: number }> = {
  GLUTEN: { total: 180, affected: 12 },
  DAIRY: { total: 180, affected: 18 },
  EGGS: { total: 180, affected: 5 },
  NUTS: { total: 180, affected: 8 },
  FISH: { total: 180, affected: 3 },
};

export const mockClassBreakdown: { classGroup: string; eating: number; vegetarian: number }[] = [
  { classGroup: '3A', eating: 22, vegetarian: 5 },
  { classGroup: '3B', eating: 24, vegetarian: 8 },
  { classGroup: '4A', eating: 26, vegetarian: 6 },
  { classGroup: '4B', eating: 21, vegetarian: 4 },
  { classGroup: '5A', eating: 25, vegetarian: 9 },
  { classGroup: '5B', eating: 24, vegetarian: 7 },
  { classGroup: '6A', eating: 20, vegetarian: 6 },
];

export const totalStudents = 180;
