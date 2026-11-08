import axios from 'axios'
import { obterToken, sair } from './auth'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 8000,
})

api.interceptors.request.use((config) => {
  const token = obterToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url: string = error?.config?.url ?? ''
    if (error?.response?.status === 401 && !url.includes('/login')) {
      sair()
      if (window.location.pathname !== '/login') window.location.assign('/login')
    }
    return Promise.reject(error)
  },
)

export function getApiMessage(error: unknown, fallback = 'Não foi possível concluir a operação.') {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { detail?: string; message?: string; erro?: string } | undefined
    return data?.detail || data?.message || data?.erro || fallback
  }
  return fallback
}

export default api
