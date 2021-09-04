import React from 'react'
import { UserContext } from './UserContextProvider'

export interface User {
  id: string | null
  name: string
  setName: (name: string) => void
}

export default function useUser(): User {
  const data = React.useContext(UserContext)

  if (!data)
    throw new Error(
      'You only can use this hook in components within UserContextProvider!'
    )

  return data
}
