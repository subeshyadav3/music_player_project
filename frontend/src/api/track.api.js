import { apiClient, normalizeListResponse } from './client'

const getTracks = async () => {
  const response = await apiClient.get('/tracks/')
  return normalizeListResponse(response.data)
}

const getTrendingTracks = async (period = 'week', limit = 8) => {
  const response = await apiClient.get(`/trending/?period=${period}&limit=${limit}`)
  return normalizeListResponse(response.data)
}

const playTrackRequest = (trackId) => apiClient.post(`/tracks/${trackId}/play/`)
const favoriteTrack = (trackId) => apiClient.post(`/tracks/${trackId}/favorite/`)
const unfavoriteTrack = (trackId) => apiClient.delete(`/tracks/${trackId}/unfavorite/`)
const getFavoriteTracks = async () => {
  const response = await apiClient.get('/tracks/favorites/')
  return normalizeListResponse(response.data)
}

const createTrack = (formData) =>
  apiClient.post('/tracks/', formData, { headers: { 'Content-Type': 'multipart/form-data' } })

export {
  getTracks,
  getTrendingTracks,
  playTrackRequest,
  favoriteTrack,
  unfavoriteTrack,
  getFavoriteTracks,
  createTrack,
}
