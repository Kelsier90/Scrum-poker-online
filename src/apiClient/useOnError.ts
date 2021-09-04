import useSocketListener from './core/useSocketListener'
import ClientEvent from '../shared/types/ClientEvent'

export default function useOnError(callback: (message: string) => void): void {
  useSocketListener(ClientEvent.ERROR, callback, true)
}
