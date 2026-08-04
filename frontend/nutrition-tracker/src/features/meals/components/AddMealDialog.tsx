import { useProductsQuery } from '../../products/hooks/useProductsQuery'
import { getItems } from '../../../utils/getItems'


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
import { useState } from 'react'

import { MEAL_TYPES, type MealType } from '../types'

type Props = {
  open: boolean
  onClose: () => void
  onSave: (data: {
    productId: string
    grams: number
    mealType: MealType
  }) => void
}

export function AddMealDialog({
  open,
  onClose,
  onSave,
}: Props) {
  const [productId, setProductId] = useState('')
  const [grams, setGrams] = useState(100)
  const [mealType, setMealType] = useState<MealType>('Breakfast')

  const { data } = useProductsQuery()

  const products = getItems(data)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add meal</DialogTitle>

      <DialogContent>
        <Stack
          spacing={2}
          sx={{ mt: 1 }}
        >
          <TextField
              select
              label="Product"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              fullWidth
          >
              {products.map((product) => (
                  <MenuItem
                      key={product.id}
                      value={product.id}
                  >
                      {product.name}
                  </MenuItem>
              ))}
          </TextField>

          <TextField
            label="Grams"
            type="number"
            value={grams}
            onChange={(e) => setGrams(Number(e.target.value))}
            fullWidth
          />

          <TextField
            select
            label="Meal type"
            value={mealType}
            onChange={(e) =>
              setMealType(e.target.value as MealType)
            }
            fullWidth
          >
            {MEAL_TYPES.map((type) => (
              <MenuItem
                key={type}
                value={type}
              >
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            onSave({
              productId,
              grams,
              mealType,
            })

            onClose()
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}