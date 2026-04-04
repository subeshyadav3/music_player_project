import { apiClient, normalizeListResponse } from './client'

const getArtists = async () => {
  const response = await apiClient.get('/artists/')
  return normalizeListResponse(response.data)
}

const getArtist = async (id) => {
  const response = await apiClient.get(`/artists/${id}/`)
  return response.data
}

export { getArtists, getArtist }
