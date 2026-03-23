import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1'

const STORAGE_KEYS = {
  access: 'music_access_token',
  refresh: 'music_refresh_token',
}

const getStoredTokens = () => ({
  access: localStorage.getItem(STORAGE_KEYS.access),
  refresh: localStorage.getItem(STORAGE_KEYS.refresh),
})

const setAuthTokens = ({ access, refresh }) => {
  if (access) {
    localStorage.setItem(STORAGE_KEYS.access, access)
  }

  if (refresh) {
    localStorage.setItem(STORAGE_KEYS.refresh, refresh)
  }
}

const clearAuthTokens = () => {
  localStorage.removeItem(STORAGE_KEYS.access)
  localStorage.removeItem(STORAGE_KEYS.refresh)
}

const requestTokenRefresh = async () => {
  const { refresh } = getStoredTokens()
  if (!refresh) {
    throw new Error('Missing refresh token')
  }

  const { data } = await axios.post(`${API_BASE_URL}/auth/refresh/`, { refresh })
  setAuthTokens({ access: data.access })
  return data.access
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

apiClient.interceptors.request.use((config) => {
  const { access } = getStoredTokens()
  if (access) {
    config.headers.Authorization = `Bearer ${access}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const statusCode = error.response?.status

    if (!originalRequest || originalRequest._retry || statusCode !== 401) {
      return Promise.reject(error)
    }

    const authExemptPaths = ['/auth/login/', '/auth/register/', '/auth/refresh/']
    const isAuthRequest = authExemptPaths.some((path) =>
      originalRequest.url?.includes(path),
    )

    if (isAuthRequest) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      const newAccessToken = await requestTokenRefresh()
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      return apiClient(originalRequest)
    } catch (refreshError) {
      clearAuthTokens()
      return Promise.reject(refreshError)
    }
  },
)

const normalizeListResponse = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  return []
}

export {
  apiClient,
  normalizeListResponse,
  getStoredTokens,
  setAuthTokens,
  clearAuthTokens,
  API_BASE_URL,
}
