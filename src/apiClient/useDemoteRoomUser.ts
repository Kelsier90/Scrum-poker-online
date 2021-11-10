import useApiClient from '@src/apiClient/core/useApiClient'
import useRequest from '@src/apiClient/core/useRequest'
import OperationStatus from '@src/apiClient/types/OperationStatus'

interface DemoteRoomUserInput {
  roomId: string
  userId: string
}

export default function useDemoteRoomUser(): OperationStatus<DemoteRoomUserInput> {
  const apiClient = useApiClient()

  return useRequest(data => apiClient.put('demote-room-user', data))
}
