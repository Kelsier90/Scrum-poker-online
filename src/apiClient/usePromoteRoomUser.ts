import OperationStatus from '@src/apiClient/types/OperationStatus'
import useApiClient from '@src/apiClient/core/useApiClient'
import useRequest from '@src/apiClient/core/useRequest'

interface PromoteRoomUserInput {
  roomId: string
  userId: string
}

export default function usePromoteRoomUser(): OperationStatus<
  PromoteRoomUserInput,
  void
> {
  const apiClient = useApiClient()

  return useRequest(data => apiClient.put('promote-room-user', data))
}
