export type MealType = 1 | 2 | 3 | 4

export const MealType = {
  Breakfast: 1 as MealType,
  Lunch: 2 as MealType,
  Dinner: 3 as MealType,
  Snack: 4 as MealType,
} as const

export const MEAL_TYPES: MealType[] = [
  MealType.Breakfast,
  MealType.Lunch,
  MealType.Dinner,
  MealType.Snack,
]

export interface Meal {
  id: string
  productId: string
  productName: string

  grams: number

  calories: number
  protein: number
  fat: number
  carbs: number

  mealType: MealType

  date: string
}

export type CreateMealDto = {
  productId: string
  grams: number
  mealType: MealType
}