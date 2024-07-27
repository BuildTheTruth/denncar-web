'use client'

import { Alert, AlertColor, Snackbar } from '@mui/material'
import { createContext, ReactNode, useState } from 'react'

interface ToastState {
  isOpen: boolean
  message?: string
  status?: AlertColor
}

export const ToastContext = createContext({
  success: (msg: string) => {},
  error: (msg: string) => {}
})

interface Props {
  children: ReactNode
}

export default function ToastProvider({ children }: Props) {
  const [state, setState] = useState<ToastState>({ isOpen: false })

  const success = (message: string) => {
    setState({ message, isOpen: true, status: 'success' })
  }

  const error = (message: string) => {
    setState({ message, isOpen: true, status: 'error' })
  }

  const handleClose = () => {
    setState({ ...state, isOpen: false })
  }

  return (
    <ToastContext.Provider value={{ success, error }}>
      {children}
      <Snackbar
        open={state.isOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
        autoHideDuration={5000}
      >
        <Alert severity={state.status} sx={{ width: '100%' }}>
          {state.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  )
}
