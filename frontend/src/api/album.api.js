import { apiClient, normalizeListResponse } from './client'

const getAlbums = async () => {
  const response = await apiClient.get('/albums/')
  return normalizeListResponse(response.data)
}

const createAlbum = (formData) =>
  apiClient.post('/albums/', formData, { headers: { 'Content-Type': 'multipart/form-data' } })

export { getAlbums, createAlbum }
