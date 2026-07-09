import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ProductCategory } from '../types'
import type { Product } from '../types'
import { productSchema } from '../validation/productSchema'
import type { ProductFormValues } from '../validation/productSchema'

type ProductDialogProps = {
  onClose: () => void
  onSubmit: (values: ProductFormValues) => Promise<void>
  open: boolean
  product: Product | null
}

const DEFAULT_VALUES: ProductFormValues = {
  name: '',
  category: ProductCategory.Other,
  caloriesPer100g: 0,
  proteinPer100g: 0,
  fatPer100g: 0,
  carbsPer100g: 0,
}

export function ProductDialog({ onClose, onSubmit, open, product }: ProductDialogProps) {
  const isEdit = product !== null

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: DEFAULT_VALUES,
  })

  useEffect(() => {
    if (open) {
      reset(
        product
          ? {
              name: product.name,
              category: product.category,
              caloriesPer100g: product.caloriesPer100g,
              proteinPer100g: product.proteinPer100g,
              fatPer100g: product.fatPer100g,
              carbsPer100g: product.carbsPer100g,
            }
          : DEFAULT_VALUES,
      )
    }
  }, [open, product, reset])

  const handleClose = () => {
    if (!isSubmitting) onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(async (values) => {
          await onSubmit(values)
        })}
      >
        <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>
          {isEdit ? 'Edit product' : 'Add product'}
        </DialogTitle>

        <DialogContent sx={{ pt: '12px !important' }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                {...register('name')}
                label="Name"
                fullWidth
                required
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                disabled={isSubmitting}
                autoFocus
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register('caloriesPer100g', { valueAsNumber: true })}
                label="Calories (per 100g)"
                type="number"
                fullWidth
                required
                error={Boolean(errors.caloriesPer100g)}
                helperText={errors.caloriesPer100g?.message}
                disabled={isSubmitting}
                slotProps={{ htmlInput: { min: 0, step: 0.1 } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register('proteinPer100g', { valueAsNumber: true })}
                label="Protein (g per 100g)"
                type="number"
                fullWidth
                required
                error={Boolean(errors.proteinPer100g)}
                helperText={errors.proteinPer100g?.message}
                disabled={isSubmitting}
                slotProps={{ htmlInput: { min: 0, step: 0.1 } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register('fatPer100g', { valueAsNumber: true })}
                label="Fat (g per 100g)"
                type="number"
                fullWidth
                required
                error={Boolean(errors.fatPer100g)}
                helperText={errors.fatPer100g?.message}
                disabled={isSubmitting}
                slotProps={{ htmlInput: { min: 0, step: 0.1 } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register('carbsPer100g', { valueAsNumber: true })}
                label="Carbohydrates (g per 100g)"
                type="number"
                fullWidth
                required
                error={Boolean(errors.carbsPer100g)}
                helperText={errors.carbsPer100g?.message}
                disabled={isSubmitting}
                slotProps={{ htmlInput: { min: 0, step: 0.1 } }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : null}
            disableElevation
          >
            {isSubmitting ? 'Saving…' : isEdit ? 'Save changes' : 'Add product'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
