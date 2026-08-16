export enum MealType {
  Breakfast = 1,
  Lunch = 2,
  Dinner = 3,
  Snack = 4,
}

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