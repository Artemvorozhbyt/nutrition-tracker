import { useCallback, useState } from 'react'

export function useDisclosure(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen)

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const toggle = useCallback(() => {
    setIsOpen((currentValue) => !currentValue)
  }, [])

  return {
    close,
    isOpen,
    open,
    setIsOpen,
    toggle,
  }
}
