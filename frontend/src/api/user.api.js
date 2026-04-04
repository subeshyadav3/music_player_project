import { apiClient, normalizeListResponse } from './client'

const getUsers = async () => {
  const response = await apiClient.get('/users/')
  return normalizeListResponse(response.data)
}

const getUser = async (id) => {
  const response = await apiClient.get(`/users/${id}/`)
  return response.data
}

const followUser = (id) => apiClient.post(`/users/${id}/follow/`)
const unfollowUser = (id) => apiClient.delete(`/users/${id}/unfollow/`)
const isFollowingUser = async (id) => {
  const response = await apiClient.get(`/users/${id}/is_following/`)
  return Boolean(response.data?.is_following)
}

export { getUsers, getUser, followUser, unfollowUser, isFollowingUser }
