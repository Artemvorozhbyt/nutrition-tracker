export type MealType =
  | 'Breakfast'
  | 'Lunch'
  | 'Dinner'
  | 'Snack'

export const MEAL_TYPES: MealType[] = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snack',
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