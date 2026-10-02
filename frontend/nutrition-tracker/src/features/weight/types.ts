export type WeightEntry = {
  id: string
  weight: number
  date: string
}

export type WeightHistory = {
  currentWeight: number
  startWeight: number | null
  difference: number | null
  entries: WeightEntry[]
}

export type CreateWeightRequest = {
  weight: number
}

export type UpdateWeightRequest = {
  weight: number
}