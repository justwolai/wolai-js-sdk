import * as qs from 'qs'
import * as url from 'url'
import axios, { AxiosResponse, Method } from 'axios'

export interface IHttpClient {
  get(path: string, query?: object): Promise<any>
  del(path: string, query?: object): Promise<any>
  put(path: string, body?: object, query?: object): Promise<any>
  post(path: string, body?: object, query?: object): Promise<any>
}

export interface IHttpClientParam {
  hostname: string
  protocol: string
  timeout: number
}

export class HttpClient implements IHttpClient {
  public readonly hostname: string
  public readonly protocol: string
  public readonly timeout: number

  constructor(param: IHttpClientParam) {
    this.hostname = param.hostname
    this.protocol = param.protocol
    this.timeout = param.timeout ? param.timeout : 20000
  }

  public async get<T>(path: string, query?: object, header?: object): Promise<T> {
    return this.send<T>('get', path, query)
  }

  public async del<T>(path: string, query?: object, header?: object): Promise<T> {
    return this.send<T>('delete', path, query)
  }

  public async put<T>(path: string, body?: object, query?: object, header?: object): Promise<T> {
    return this.send<T>('put', path, query, body)
  }

  public async post<T>(path: string, body?: object, query?: object, header?: object): Promise<T> {
    return this.send<T>('post', path, query, body)
  }

  private async send<T>(method: Method, path: string = '/', query?: object, body?: object, header?: object): Promise<T> {
    const uri = url.format({
      hostname: this.hostname,
      protocol: this.protocol,
      pathname: path,
    })

    // 设置请求头
    const requestHeaders = Object.assign({}, header)

    // 构建请求
    const req = axios({
      headers: requestHeaders,
      url: uri,
      method: method,
      params: query,
      timeout: this.timeout,
      withCredentials: true,
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      },
      data: body,
    })

    let response: any

    try {
      response = await req
    } catch (e) {
      throw e
    }

    if (!response.data) {
      throw new Error('response.data is null')
    }

    return response.data as T
  }
}

export {
  AxiosResponse,
}
