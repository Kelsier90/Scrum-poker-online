import React from 'react'
import { useRouter } from 'next/router'

export default function useRedirect(): (url: string) => void {
  const router = useRouter()

  return React.useCallback(url => router.push(url), [router])
}
