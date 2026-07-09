import { z } from 'zod'
import { ProductCategory } from '../api/products'

const categoryValues = [
  ProductCategory.Meat,
  ProductCategory.Fish,
  ProductCategory.Seafood,
  ProductCategory.Eggs,
  ProductCategory.Dairy,
  ProductCategory.Vegetables,
  ProductCategory.Fruits,
  ProductCategory.Grains,
  ProductCategory.Legumes,
  ProductCategory.Nuts,
  ProductCategory.Seeds,
  ProductCategory.Oils,
  ProductCategory.Drinks,
  ProductCategory.Snacks,
  ProductCategory.Sweets,
  ProductCategory.Other,
] as const

const numericField = (max: number, label: string) =>
  z.number({ error: 'Enter a valid number' }).min(0, 'Cannot be negative').max(max, label)

export const productSchema = z.object({
  name: z.string().trim().min(1, 'Product name is required').max(200, 'Name is too long'),
  category: z.enum(categoryValues, { message: 'Please select a category' }),
  caloriesPer100g: numericField(9999, 'Value is too high'),
  proteinPer100g: numericField(100, 'Cannot exceed 100 g'),
  fatPer100g: numericField(100, 'Cannot exceed 100 g'),
  carbsPer100g: numericField(100, 'Cannot exceed 100 g'),
})

export type ProductFormValues = z.infer<typeof productSchema>
