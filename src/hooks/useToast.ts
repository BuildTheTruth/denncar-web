import { ToastContext } from '@/providers/ToastProvider'
import { useContext } from 'react'

export default function useToast() {
  const { success, error } = useContext(ToastContext)
  return { success, error }
}
