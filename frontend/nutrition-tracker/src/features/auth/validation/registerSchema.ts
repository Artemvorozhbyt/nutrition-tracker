import { z } from 'zod'
import { Gender, GoalType } from '../types'

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, 'First name must contain at least 2 characters'),

    email: z
      .string()
      .trim()
      .email('Enter a valid email address'),

    password: z
      .string()
      .min(6, 'Password must contain at least 6 characters'),

    confirmPassword: z.string(),

    gender: z.union([
      z.literal(Gender.Male),
      z.literal(Gender.Female),
    ]),

    age: z
      .number()
      .min(1, 'Age must be greater than 0')
      .max(120),

    height: z
      .number()
      .min(50)
      .max(300),

    weight: z
      .number()
      .min(20)
      .max(500),

    goal: z.union([
      z.literal(GoalType.LoseWeight),
      z.literal(GoalType.MaintainWeight),
      z.literal(GoalType.GainWeight),
    ]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type RegisterFormValues = z.infer<typeof registerSchema>