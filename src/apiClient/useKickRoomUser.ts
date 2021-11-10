import OperationStatus from '@src/apiClient/types/OperationStatus'
import useApiClient from '@src/apiClient/core/useApiClient'
import useRequest from '@src/apiClient/core/useRequest'

interface KickRoomUserInput {
  roomId: string
  userId: string
}

export default function useKickRoomUser(): OperationStatus<
  KickRoomUserInput,
  void
> {
  const apiClient = useApiClient()

  return useRequest(data => apiClient.delete('kick-room-user', data))
}
