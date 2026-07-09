import { Chip } from '@mui/material'
import { PRODUCT_CATEGORY_LABELS } from '../api/products'
import type { ProductCategory } from '../types'

const categoryColorMap: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  Meat: 'error',
  Fish: 'info',
  Seafood: 'info',
  Eggs: 'warning',
  Dairy: 'default',
  Vegetables: 'success',
  Fruits: 'success',
  Grains: 'warning',
  Legumes: 'warning',
  Nuts: 'warning',
  Seeds: 'warning',
  Oils: 'default',
  Drinks: 'info',
  Snacks: 'secondary',
  Sweets: 'secondary',
  Other: 'default',
}

type ProductCategoryChipProps = {
  category: ProductCategory
}

export function ProductCategoryChip({ category }: ProductCategoryChipProps) {
  const label = PRODUCT_CATEGORY_LABELS[category] ?? category
  const color = categoryColorMap[category] ?? 'default'

  return (
    <Chip
      color={color}
      label={label}
      size="small"
      sx={{ fontWeight: 600, fontSize: '0.7rem', letterSpacing: 0 }}
      variant="outlined"
    />
  )
}
