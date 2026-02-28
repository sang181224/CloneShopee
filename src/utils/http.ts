import axios, { AxiosError, type AxiosInstance } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { clearLS, getAccessTokenFromLS, saveAccessTokenToLS, setProfileToLS } from './auth'
import type { AuthResponse } from 'src/types/auth.type'
import path from 'src/constants/path'
class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 100000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        // console.log(config)
        if (this.accessToken) {
          config.headers.Authorization = this.accessToken
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        // console.log(response)
        if (response.config.url === path.login || response.config.url === path.register) {
          this.accessToken = (response.data as AuthResponse).data.access_token
          const profile = (response.data as AuthResponse).data.user
          saveAccessTokenToLS(this.accessToken)
          setProfileToLS(profile)
        } else if (response.config.url === path.logout) {
          // console.log(response.config.url)
          clearLS()
        }
        return response
      },
      function onRejected(error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          // console.log(message)
          toast.error(message)
        }
        if (error.request.status === HttpStatusCode.Unauthorized) {
          clearLS()
        }
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance

export default http
