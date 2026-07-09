export const ProductCategory = {
  Meat: 'Meat',
  Fish: 'Fish',
  Seafood: 'Seafood',
  Eggs: 'Eggs',
  Dairy: 'Dairy',
  Vegetables: 'Vegetables',
  Fruits: 'Fruits',
  Grains: 'Grains',
  Legumes: 'Legumes',
  Nuts: 'Nuts',
  Seeds: 'Seeds',
  Oils: 'Oils',
  Drinks: 'Drinks',
  Snacks: 'Snacks',
  Sweets: 'Sweets',
  Other: 'Other',
} as const

export type ProductCategory = (typeof ProductCategory)[keyof typeof ProductCategory]

export const PRODUCT_CATEGORIES = Object.values(ProductCategory)

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  [ProductCategory.Meat]: 'Meat',
  [ProductCategory.Fish]: 'Fish',
  [ProductCategory.Seafood]: 'Seafood',
  [ProductCategory.Eggs]: 'Eggs',
  [ProductCategory.Dairy]: 'Dairy',
  [ProductCategory.Vegetables]: 'Vegetables',
  [ProductCategory.Fruits]: 'Fruits',
  [ProductCategory.Grains]: 'Grains',
  [ProductCategory.Legumes]: 'Legumes',
  [ProductCategory.Nuts]: 'Nuts',
  [ProductCategory.Seeds]: 'Seeds',
  [ProductCategory.Oils]: 'Oils',
  [ProductCategory.Drinks]: 'Drinks',
  [ProductCategory.Snacks]: 'Snacks',
  [ProductCategory.Sweets]: 'Sweets',
  [ProductCategory.Other]: 'Other',
}

export type Product = {
  id: string
  name: string
  category: ProductCategory
  caloriesPer100g: number
  proteinPer100g: number
  fatPer100g: number
  carbsPer100g: number
}

export type CreateProductDto = Omit<Product, 'id'>

export type UpdateProductDto = Omit<Product, 'id'>