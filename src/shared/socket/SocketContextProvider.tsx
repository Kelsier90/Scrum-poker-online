import React from 'react'
import useNewSocket, { SocketAbstraction } from './useNewSocket'

const SocketContext = React.createContext<SocketAbstraction>(undefined)

export const useSocketContext = (): SocketAbstraction => {
  const data = React.useContext(SocketContext)

  if (!data)
    throw new Error(
      'You only can use this hook in components within SocketContextProvider!'
    )

  return data
}

const SocketContextProvider = ({ children }: { children: unknown }) => {
  const socket = useNewSocket()

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

export default SocketContextProvider
