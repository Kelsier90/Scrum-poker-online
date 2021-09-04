import React from 'react'
import { User } from './useUser'
import { useSocketContext } from '../socket/SocketContextProvider'

export const UserContext = React.createContext<User>(undefined)

const UserContextProvider = ({ children }: { children: unknown }) => {
  const socket = useSocketContext()
  const [id, setId] = React.useState<string | null>(null)
  const [name, setName] = React.useState<string | null>(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('user')
    }
    return null
  })

  React.useEffect(() => {
    socket.getId().then(socketId => setId(socketId))
  }, [socket])

  const storeUser = (newUser: string) => {
    setName(newUser)

    localStorage.setItem('user', newUser)
  }

  return (
    <UserContext.Provider value={{ id, name, setName: storeUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
