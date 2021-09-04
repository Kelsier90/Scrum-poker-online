export default interface ApiResponse<T> {
  ok: boolean
  data?: T
  message?: string
}
