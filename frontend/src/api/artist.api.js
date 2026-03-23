import { apiClient, normalizeListResponse } from './client'

const getArtists = async () => {
  const response = await apiClient.get('/artists/')
  return normalizeListResponse(response.data)
}

export { getArtists }
