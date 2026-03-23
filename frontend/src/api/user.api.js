import { apiClient, normalizeListResponse } from './client'

const getUsers = async () => {
  const response = await apiClient.get('/users/')
  return normalizeListResponse(response.data)
}

export { getUsers }
