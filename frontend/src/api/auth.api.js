import { apiClient } from './client'

const loginRequest = (payload) => apiClient.post('/auth/login/', payload)
const signupRequest = (payload) => apiClient.post('/auth/register/', payload)
const profileRequest = () => apiClient.get('/auth/profile/')

export { loginRequest, signupRequest, profileRequest }
