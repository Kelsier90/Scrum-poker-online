import { useRouter } from 'next/router'

export default function useURLParams(): Record<string, string | string[]> {
  const router = useRouter()

  return router.query
}
