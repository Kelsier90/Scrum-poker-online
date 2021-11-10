import OperationStatus from '@src/apiClient/types/OperationStatus'
import useApiClient from '@src/apiClient/core/useApiClient'
import useRequest from '@src/apiClient/core/useRequest'

interface SelectCardInput {
  roomId: string
  card: string
}

export default function useSelectCard(): OperationStatus<
  SelectCardInput,
  void
> {
  const apiClient = useApiClient()

  return useRequest(data => apiClient.put('select-card', data))
}
