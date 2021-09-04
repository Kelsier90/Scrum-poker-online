export const responseOk = (data: any) => ({
  ok: true,
  data
})

export const responseKo = (error: Error) => ({
  ok: false,
  message: error.message
})
