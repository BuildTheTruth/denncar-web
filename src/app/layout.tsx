import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import type { Metadata } from 'next'
import './globals.css'

import Gnb from '@/components/Gnb'
import CustomQueryClientProvider from '@/providers/QueryClientProvider'

export const metadata: Metadata = {
  title: '덴카'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <CustomQueryClientProvider>
          <Gnb />
          <main>{children}</main>
        </CustomQueryClientProvider>
      </body>
    </html>
  )
}
