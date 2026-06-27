export const safeLocalStorage = {
  getItem(key: string) {
    try {
      return window.localStorage.getItem(key)
    } catch {
      return null
    }
  },
  removeItem(key: string) {
    try {
      window.localStorage.removeItem(key)
    } catch {
      return
    }
  },
  setItem(key: string, value: string) {
    try {
      window.localStorage.setItem(key, value)
    } catch {
      return
    }
  },
}
