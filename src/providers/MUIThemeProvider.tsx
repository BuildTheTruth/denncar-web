'use client'

import { createTheme, ThemeProvider } from '@mui/material'
import { ReactNode } from 'react'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1920
    }
  }
})

interface Props {
  children: ReactNode
}

export default function MUIThemeProvider({ children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
