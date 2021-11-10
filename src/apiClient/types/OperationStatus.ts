export default interface OperationStatus<Input = unknown, Output = unknown> {
  status: 'success' | 'error' | 'loading' | 'idle'
  data?: Output
  error?: string
  execute(
    input: Input,
    opts?: {
      onError?: (error: string) => void
      onSuccess?: (data: Output) => void
    }
  ): void
}
