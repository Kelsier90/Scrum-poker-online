import React from 'react'
import useNewSocket, {
  SocketAbstraction,
  SocketAbstractionState
} from './useNewSocket'
import FullScreenLoader from '@src/components/common/FullScreenLoader'
import ErrorView from '@src/components/common/ErrorView'
import WarningMessage from '@src/components/common/WarningMessage'

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
  const [state, setState] = React.useState<SocketAbstractionState>('connecting')

  const socket = useNewSocket({
    onConnectionChange: newState => setState(newState)
  })

  return (
    <SocketContext.Provider value={socket}>
      {state === 'connected' || state === 'unavailable' ? children : null}

      <FullScreenLoader active={state === 'connecting'} />

      {state === 'not-supported' && (
        <ErrorView message="Your browser is not supported" />
      )}

      {state === 'unavailable' && (
        <WarningMessage>
          There is no connection. Please check your internet connection. Trying
          to reconnect...
        </WarningMessage>
      )}
    </SocketContext.Provider>
  )
}

export default SocketContextProvider
