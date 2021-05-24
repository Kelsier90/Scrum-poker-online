export const copyTextToClipBoard = (text: string): Promise<void> => {
  if (navigator.clipboard) return navigator.clipboard.writeText(text)

  return Promise.reject(
    new Error('Your browser does not support the clipboard')
  )
}
