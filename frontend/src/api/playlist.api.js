import { apiClient, normalizeListResponse } from './client'

const getPlaylists = async () => {
  const response = await apiClient.get('/playlists/')
  return normalizeListResponse(response.data)
}

const createPlaylist = (payload) => apiClient.post('/playlists/', payload)

export { getPlaylists, createPlaylist }
