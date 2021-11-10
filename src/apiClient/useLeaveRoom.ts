import OperationStatus from '@src/apiClient/types/OperationStatus'
import useApiClient from '@src/apiClient/core/useApiClient'
import useRequest from '@src/apiClient/core/useRequest'

interface LeaveRoomInput {
  roomId: string
}

export default function useLeaveRoom(): OperationStatus<LeaveRoomInput, void> {
  const apiClient = useApiClient()

  return useRequest(data => apiClient.delete('leave-room', data))
}
