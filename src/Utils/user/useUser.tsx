import React from 'react'

export default function useUser(): [string | null, (name: string) => void] {
  const [user, setUser] = React.useState<string | null>(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('user')
    }
    return null
  })

  const storeUser = (newUser: string) => {
    setUser(newUser)

    localStorage.setItem('user', newUser)
  }

  return [user, storeUser]
}
