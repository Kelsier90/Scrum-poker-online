import React from 'react'
import OperationStatus from '@src/apiClient/types/OperationStatus'

type Req<Input = unknown, Output = unknown> = (input: Input) => Promise<Output>

export default function useRequest<Input = unknown, Output = unknown>(
  req: Req
): OperationStatus<Input, Output> {
  const reqRef = React.useRef<Req>(req)

  const [status, setStatus] =
    React.useState<'success' | 'error' | 'loading' | 'idle'>('idle')

  const [error, setError] = React.useState<string>(undefined)

  const [data, setData] = React.useState(undefined)

  const execute = React.useCallback((input: Input, opts) => {
    setStatus('loading')

    reqRef
      .current(input)
      .then((result: Output) => {
        setStatus('success')
        setError(undefined)
        setData(result)

        if (opts?.onSuccess) opts.onSuccess(result)
      })
      .catch(e => {
        const err = typeof e === 'string' ? e : e?.message

        setStatus('error')
        setError(err)
        setData(undefined)

        if (opts?.onError) opts.onError(err)
      })
  }, [])

  return {
    status,
    error,
    data,
    execute
  }
}
