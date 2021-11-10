import Room from '../types/Room'
import OperationStatus from '@src/apiClient/types/OperationStatus'
import useRequest from '@src/apiClient/core/useRequest'
import useApiClient from '@src/apiClient/core/useApiClient'

interface CreateRoomInput {
  userName: string
}

export default function useCreateRoom(): OperationStatus<
  CreateRoomInput,
  Room
> {
  const apiClient = useApiClient()

  return useRequest(data => apiClient.post('create-room', data))
}
