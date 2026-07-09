import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { RhfTextField } from '../../../components/forms/RhfTextField'
import { PRODUCT_CATEGORIES, PRODUCT_CATEGORY_LABELS } from '../api/products'
import type { Product } from '../api/products'
import { productSchema } from '../validation/productSchema'
import type { ProductFormValues } from '../validation/productSchema'

const SectionLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
}))

const NutritionGrid = styled(Grid)({
  marginTop: 0,
})

type ProductFormDialogProps = {
  open: boolean
  onClose: () => void
  onSubmit: (values: ProductFormValues) => Promise<void>
  initialValues?: Partial<Product>
  title: string
  submitLabel?: string
  isSubmitting?: boolean
}

export function ProductFormDialog({
  open,
  onClose,
  onSubmit,
  initialValues,
  title,
  submitLabel = 'Save product',
  isSubmitting = false,
}: ProductFormDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      category: undefined,
      caloriesPer100g: undefined,
      proteinPer100g: undefined,
      fatPer100g: undefined,
      carbsPer100g: undefined,
    },
  })

  useEffect(() => {
    if (open) {
      reset({
        name: initialValues?.name ?? '',
        category: initialValues?.category ?? undefined,
        caloriesPer100g: initialValues?.caloriesPer100g ?? (undefined as unknown as number),
        proteinPer100g: initialValues?.proteinPer100g ?? (undefined as unknown as number),
        fatPer100g: initialValues?.fatPer100g ?? (undefined as unknown as number),
        carbsPer100g: initialValues?.carbsPer100g ?? (undefined as unknown as number),
      })
    }
  }, [open, initialValues, reset])

  const handleClose = () => {
    if (!isSubmitting) onClose()
  }

  const handleFormSubmit = handleSubmit(async (values) => {
    await onSubmit(values)
  })

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={handleClose}
      open={open}
      slotProps={{ paper: { sx: { borderRadius: 3 } } }}
    >
      <DialogTitle
        sx={{
          pb: 1,
          pt: 3,
          px: 3,
          fontWeight: 800,
          fontSize: '1.125rem',
        }}
      >
        {title}
      </DialogTitle>

      <DialogContent sx={{ px: 3, pb: 1 }}>
        <Stack
          component="form"
          id="product-form"
          noValidate
          onSubmit={handleFormSubmit}
          spacing={3}
          sx={{ pt: 1 }}
        >
          <Stack spacing={2}>
            <SectionLabel>Basic information</SectionLabel>
            <RhfTextField
              autoFocus
              control={control}
              disabled={isSubmitting}
              fullWidth
              label="Product name"
              name="name"
              placeholder="e.g. Chicken breast"
              required
            />

            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <FormControl error={Boolean(errors.category)} fullWidth required>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    {...field}
                    disabled={isSubmitting}
                    label="Category"
                    labelId="category-label"
                    value={field.value ?? ''}
                    MenuProps={{
                      slotProps: {
                        paper: {
                          sx: { borderRadius: 2, mt: 0.5 },
                        },
                      },
                    }}
                  >
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {PRODUCT_CATEGORY_LABELS[cat]}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.category && <FormHelperText>{errors.category.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Stack>

          <Stack spacing={2}>
            <SectionLabel>Nutrition per 100 g</SectionLabel>
            <NutritionGrid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Controller
                  control={control}
                  name="caloriesPer100g"
                  render={({ field, fieldState }) => (
                    <RhfTextField
                      control={control}
                      disabled={isSubmitting}
                      error={Boolean(fieldState.error)}
                      fullWidth
                      helperText={fieldState.error?.message}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <Typography color="text.secondary" variant="caption">
                                kcal
                              </Typography>
                            </InputAdornment>
                          ),
                        },
                        htmlInput: { inputMode: 'decimal' },
                      }}
                      label="Calories"
                      name="caloriesPer100g"
                      onChange={(e) => {
                        const val = e.target.value
                        field.onChange(val === '' ? undefined : parseFloat(val))
                      }}
                      type="number"
                      value={field.value ?? ''}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Controller
                  control={control}
                  name="proteinPer100g"
                  render={({ field, fieldState }) => (
                    <RhfTextField
                      control={control}
                      disabled={isSubmitting}
                      error={Boolean(fieldState.error)}
                      fullWidth
                      helperText={fieldState.error?.message}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <Typography color="text.secondary" variant="caption">
                                g
                              </Typography>
                            </InputAdornment>
                          ),
                        },
                        htmlInput: { inputMode: 'decimal' },
                      }}
                      label="Protein"
                      name="proteinPer100g"
                      onChange={(e) => {
                        const val = e.target.value
                        field.onChange(val === '' ? undefined : parseFloat(val))
                      }}
                      type="number"
                      value={field.value ?? ''}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Controller
                  control={control}
                  name="fatPer100g"
                  render={({ field, fieldState }) => (
                    <RhfTextField
                      control={control}
                      disabled={isSubmitting}
                      error={Boolean(fieldState.error)}
                      fullWidth
                      helperText={fieldState.error?.message}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <Typography color="text.secondary" variant="caption">
                                g
                              </Typography>
                            </InputAdornment>
                          ),
                        },
                        htmlInput: { inputMode: 'decimal' },
                      }}
                      label="Fat"
                      name="fatPer100g"
                      onChange={(e) => {
                        const val = e.target.value
                        field.onChange(val === '' ? undefined : parseFloat(val))
                      }}
                      type="number"
                      value={field.value ?? ''}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Controller
                  control={control}
                  name="carbsPer100g"
                  render={({ field, fieldState }) => (
                    <RhfTextField
                      control={control}
                      disabled={isSubmitting}
                      error={Boolean(fieldState.error)}
                      fullWidth
                      helperText={fieldState.error?.message}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <Typography color="text.secondary" variant="caption">
                                g
                              </Typography>
                            </InputAdornment>
                          ),
                        },
                        htmlInput: { inputMode: 'decimal' },
                      }}
                      label="Carbohydrates"
                      name="carbsPer100g"
                      onChange={(e) => {
                        const val = e.target.value
                        field.onChange(val === '' ? undefined : parseFloat(val))
                      }}
                      type="number"
                      value={field.value ?? ''}
                    />
                  )}
                />
              </Grid>
            </NutritionGrid>
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 2, gap: 1 }}>
        <Button disabled={isSubmitting} onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          disabled={isSubmitting}
          form="product-form"
          startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : null}
          type="submit"
          variant="contained"
        >
          {isSubmitting ? 'Saving…' : submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
