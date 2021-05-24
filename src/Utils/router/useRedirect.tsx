import { useRouter } from 'next/router'

export default function useRedirect(): (url: string) => void {
  const router = useRouter()

  return url => router.push(url)
}
