'use client'

import Empty from '@/components/Empty'
import { Viewer, ViewerProps } from '@toast-ui/react-editor'
import dynamic from 'next/dynamic'
import { forwardRef, useEffect, useState } from 'react'

const DynamicViewer = dynamic(() => import('@toast-ui/react-editor').then((m) => m.Viewer), {
  ssr: false,
  loading: Empty
})

const ToastUIViewer = forwardRef<Viewer, ViewerProps>((props, ref) => {
  const [isMounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return isMounted ? <DynamicViewer {...props} ref={ref} /> : null
})

export default ToastUIViewer
