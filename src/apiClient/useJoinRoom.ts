import Room from '../types/Room'
import OperationStatus from '@src/apiClient/types/OperationStatus'
import useApiClient from '@src/apiClient/core/useApiClient'
import useRequest from '@src/apiClient/core/useRequest'

interface JoinRoomInput {
  roomId: string
  userName: string
}

export default function useJoinRoom(): OperationStatus<JoinRoomInput, Room> {
  const apiClient = useApiClient()

  return useRequest(data => apiClient.post('join-room', data))
}
