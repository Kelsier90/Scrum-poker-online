import OperationStatus from '@src/apiClient/types/OperationStatus'
import useApiClient from '@src/apiClient/core/useApiClient'
import useRequest from '@src/apiClient/core/useRequest'

interface SetRoomIssueInput {
  roomId: string
  issue: string
}

export default function useSetRoomIssue(): OperationStatus<SetRoomIssueInput> {
  const apiClient = useApiClient()

  return useRequest(data => apiClient.put('set-room-issue', data))
}
