export const responseOk = (data: unknown) => ({
  ok: true,
  data
})

export const responseKo = (error: Error) => ({
  ok: false,
  message: error.message
})
