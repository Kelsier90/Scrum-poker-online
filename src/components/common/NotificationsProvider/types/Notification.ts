export default interface Notification {
  id: number
  severity: 'info' | 'success' | 'error'
  text: string
}
