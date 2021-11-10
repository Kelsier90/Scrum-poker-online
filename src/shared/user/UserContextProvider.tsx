import React from 'react'
import { User } from './useUser'
import { useSocketContext } from '../socket/SocketContextProvider'

export const UserContext = React.createContext<User>(undefined)

const UserContextProvider = ({ children }: { children: unknown }) => {
  const socket = useSocketContext()
  const [name, setName] = React.useState<string | null>(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('user')
    }
    return null
  })

  const storeUser = (newUser: string) => {
    setName(newUser)

    localStorage.setItem('user', newUser)
  }

  return (
    <UserContext.Provider
      value={{ id: socket.getId(), name, setName: storeUser }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
