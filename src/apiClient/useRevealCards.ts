import OperationStatus from '@src/apiClient/types/OperationStatus'
import useApiClient from '@src/apiClient/core/useApiClient'
import useRequest from '@src/apiClient/core/useRequest'

interface RevealCardsInput {
  roomId: string
}

export default function useRevelCards(): OperationStatus<
  RevealCardsInput,
  void
> {
  const apiClient = useApiClient()

  return useRequest(data => apiClient.put('reveal-cards', data))
}
