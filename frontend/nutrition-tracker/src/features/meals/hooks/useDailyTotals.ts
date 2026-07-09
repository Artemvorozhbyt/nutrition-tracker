import { useMemo } from 'react'
import { useMealsQuery } from './useMealsQuery'

export function useDailyTotals() {
  const { data: meals = [], ...query } = useMealsQuery()

  const totals = useMemo(() => {
    return meals.reduce(
      (acc, meal) => {
        acc.calories += meal.calories
        acc.protein += meal.protein
        acc.fat += meal.fat
        acc.carbs += meal.carbs

        return acc
      },
      {
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
      },
    )
  }, [meals])

  return {
    ...query,
    data: totals,
  }
}