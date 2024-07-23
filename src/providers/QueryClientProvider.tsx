'use client'

import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

interface Props {
  children: ReactNode
}

const CustomQueryClientProvider = ({ children }: Props) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default CustomQueryClientProvider
