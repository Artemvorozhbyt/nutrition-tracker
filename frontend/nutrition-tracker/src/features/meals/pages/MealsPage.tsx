import { Stack, Typography } from '@mui/material'
import { MealTypeSection } from '../components/MealTypeSection'
import { EmptyMealsState } from '../components/EmptyMealsState'
import { DailyTotalsSummary } from '../components/DailyTotalsSummary'
import { useMealsQuery } from '../hooks/useMealsQuery'
import { useDailyTotals } from '../hooks/useDailyTotals'
import { MEAL_TYPES } from '../types'
import { Button } from '@mui/material'
import { useState } from 'react'
import { AddMealDialog } from '../components/AddMealDialog'
import { useCreateMealMutation } from '../hooks/useCreateMealMutation'
import type { MealType } from '../types'
import { useDeleteMealMutation } from '../hooks/useDeleteMealMutation'

export function MealsPage() {
  const { data: meals = [] } = useMealsQuery()
  
  const [isDialogOpen, setIsDialogOpen] = useState(false)
    
  const { data: totals } = useDailyTotals()

  const createMealMutation = useCreateMealMutation()

  const deleteMealMutation = useDeleteMealMutation()

  const [deletingMealId, setDeletingMealId] = useState<string | null>(null)
  

  
  const handleSaveMeal = async (meal: {
    productId: string
    grams: number
    mealType: MealType
  }) => {
    try {
      await createMealMutation.mutateAsync(meal)

      setIsDialogOpen(false)
    } catch (error) {
      console.error(error)
    }
  }
  const handleDeleteMeal = async (id: string) => {
    try {
      setDeletingMealId(id)

      await deleteMealMutation.mutateAsync(id)
    } catch (error) {
      console.error(error)
    } finally {
      setDeletingMealId(null)
    }
  }

  return (
    <Stack spacing={4}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700 }}
      >
        Meals
      </Typography> 
      <Button
        variant="contained"
        onClick={() => setIsDialogOpen(true)}
        >
        Add meal
        </Button>

      <DailyTotalsSummary
        calories={totals?.calories ?? 0}
        protein={totals?.protein ?? 0}
        fat={totals?.fat ?? 0}
        carbs={totals?.carbs ?? 0}
      />

      {meals.length === 0 ? (
        <EmptyMealsState />
      ) : (
        <Stack spacing={4}>
          {MEAL_TYPES.map((mealType) => (
            <MealTypeSection
              key={mealType}
              mealType={mealType}
              meals={meals.filter((meal) => meal.mealType === mealType)}
              onDelete={handleDeleteMeal}
              deletingMealId={deletingMealId}
           />
          ))}
        </Stack>
          )}
          <AddMealDialog
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onSave={handleSaveMeal}
          />
    </Stack>
  )
}