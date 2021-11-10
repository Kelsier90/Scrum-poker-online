import OperationStatus from '@src/apiClient/types/OperationStatus'
import useApiClient from '@src/apiClient/core/useApiClient'
import useRequest from '@src/apiClient/core/useRequest'

interface ResetRoomInput {
  roomId: string
}

export default function useResetRoom(): OperationStatus<ResetRoomInput, void> {
  const apiClient = useApiClient()

  return useRequest(data => apiClient.put('reset-room', data))
}
