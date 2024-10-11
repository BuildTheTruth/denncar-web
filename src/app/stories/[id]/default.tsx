'use client'

import { useRouter } from 'next/navigation'
import { useLayoutEffect } from 'react'

export default function Default() {
  const router = useRouter()

  useLayoutEffect(() => {
    router.back()
  }, [])

  return null
}
