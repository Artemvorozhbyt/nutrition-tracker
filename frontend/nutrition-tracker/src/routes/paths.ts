export const paths = {
  dashboard: '/dashboard',
  goals: '/goals',
  googleCallback: '/auth/google/callback',
  home: '/',
  login: '/login',
  meals: '/meals',
  products: '/products',
  register: '/register',
  weight: '/weight',
  completeProfile: '/complete-profile',
} as const

export const routeSegments = {
  dashboard: 'dashboard',
  goals: 'goals',
  googleCallback: 'auth/google/callback',
  login: 'login',
  meals: 'meals',
  products: 'products',
  register: 'register',
  weight: 'weight',
  completeProfile: 'complete-profile',
} as const