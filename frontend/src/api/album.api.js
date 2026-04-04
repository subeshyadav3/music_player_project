import { apiClient, normalizeListResponse } from './client'

const getAlbums = async () => {
  const response = await apiClient.get('/albums/')
  return normalizeListResponse(response.data)
}

const createAlbum = (formData) =>
  apiClient.post('/albums/', formData, { headers: { 'Content-Type': 'multipart/form-data' } })

const getAlbum = async (id) => {
  const response = await apiClient.get(`/albums/${id}/`)
  return response.data
}

export { getAlbums, getAlbum, createAlbum }
