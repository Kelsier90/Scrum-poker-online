export default class ApiClient {
  private readonly auth?: string

  constructor(auth?: string) {
    this.auth = auth
  }

  public get<Input = unknown, Output = unknown>(
    endpoint: string
  ): Promise<Output> {
    return this.request<Input, Output>('GET', endpoint)
  }

  public post<Input = unknown, Output = unknown>(
    endpoint: string,
    params?: Input
  ): Promise<Output> {
    return this.request<Input, Output>('POST', endpoint, params)
  }

  public put<Input = unknown, Output = unknown>(
    endpoint: string,
    params?: Input
  ): Promise<Output> {
    return this.request<Input, Output>('PUT', endpoint, params)
  }

  public delete<Input = unknown, Output = unknown>(
    endpoint: string,
    params?: Input
  ): Promise<Output> {
    return this.request<Input, Output>('DELETE', endpoint, params)
  }

  private request<Input = unknown, Output = unknown>(
    method: string,
    endpoint: string,
    params?: Input
  ): Promise<Output> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }
    if (this.auth) headers.Authorization = this.auth

    const opts: RequestInit = {
      method,
      headers
    }
    if (method !== 'GET' && params) opts.body = JSON.stringify(params)

    let receivedResponse: Response

    return fetch(`/api/${endpoint}`, opts)
      .then(response => {
        receivedResponse = response
        if (response.status === 204) return null
        return response.json()
      })
      .then(data => {
        if (data?.status === 'error')
          return Promise.reject(
            new Error(data.message) || new Error('Unexpected error')
          )
        else if (!receivedResponse.ok)
          return Promise.reject(new Error('Unexpected error'))
        else return data
      })
  }
}
