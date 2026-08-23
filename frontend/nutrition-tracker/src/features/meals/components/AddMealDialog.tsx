import { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material'
import { useProductsQuery } from '../../products/hooks/useProductsQuery'
import { getItems } from '../../../utils/getItems'
import {
  MealType,
  type MealType as MealTypeValue,
} from '../types'

type Props = {
  open: boolean
  onClose: () => void
  mealType: MealTypeValue | null
  onSave: (data: {
    productId: string
    grams: number
    mealType: MealTypeValue
  }) => void
}

export function AddMealDialog({
  open,
  onClose,
  mealType,
  onSave,
}: Props) {
  const [productId, setProductId] = useState('')
  const [grams, setGrams] = useState(100)

  const { data } = useProductsQuery()
  const products = getItems(data)

  useEffect(() => {
    if (open) {
      setProductId('')
      setGrams(100)
    }
  }, [open, mealType])

  const handleSave = () => {
    if (!mealType || !productId || grams <= 0) {
      return
    }

    onSave({
      productId,
      grams,
      mealType,
    })
  }

  const mealTypeLabel =
    mealType === MealType.Breakfast
      ? 'Breakfast'
      : mealType === MealType.Lunch
        ? 'Lunch'
        : mealType === MealType.Dinner
          ? 'Dinner'
          : 'Snack'

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Add food to {mealTypeLabel}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            select
            label="Product"
            value={productId}
            onChange={(event) => setProductId(event.target.value)}
            fullWidth
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Grams"
            type="number"
            value={grams}
            onChange={(event) =>
              setGrams(Number(event.target.value))
            }
            slotProps={{ htmlInput: { min: 1 } }}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          disabled={!mealType || !productId || grams <= 0}
          onClick={handleSave}
        >
          Add food
        </Button>
      </DialogActions>
    </Dialog>
  )
}