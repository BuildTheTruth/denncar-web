import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import 'tui-color-picker/dist/tui-color-picker.css'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './globals.css'

import Gnb from '@/components/Gnb'
import MUIThemeProvider from '@/providers/MUIThemeProvider'
import ReactQueryClientProvider from '@/providers/ReactQueryClientProvider'
import ToastProvider from '@/providers/ToastProvider'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '덴카'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <ReactQueryClientProvider>
          <MUIThemeProvider>
            <ToastProvider>
              <Gnb>{children}</Gnb>
            </ToastProvider>
          </MUIThemeProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  )
}
