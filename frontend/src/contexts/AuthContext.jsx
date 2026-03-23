import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  clearAuthTokens,
  getStoredTokens,
  setAuthTokens,
} from '../api/client'
import { loginRequest, profileRequest, signupRequest } from '../api/auth.api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const isAuthenticated = Boolean(user)

  const fetchProfile = useCallback(async () => {
    const response = await profileRequest()
    setUser(response.data)
    return response.data
  }, [])

  const logout = useCallback(() => {
    clearAuthTokens()
    setUser(null)
  }, [])

  const login = useCallback(
    async (credentials) => {
      const response = await loginRequest(credentials)
      setAuthTokens(response.data)
      await fetchProfile()
    },
    [fetchProfile],
  )

  const signup = useCallback(async (payload) => {
    await signupRequest(payload)
  }, [])

  useEffect(() => {
    let isMounted = true

    const bootstrapAuth = async () => {
      const { access } = getStoredTokens()
      if (!access) {
        if (isMounted) {
          setLoading(false)
        }
        return
      }

      try {
        await fetchProfile()
      } catch {
        clearAuthTokens()
        if (isMounted) {
          setUser(null)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    bootstrapAuth()

    return () => {
      isMounted = false
    }
  }, [fetchProfile])

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated,
      login,
      signup,
      logout,
      fetchProfile,
    }),
    [fetchProfile, isAuthenticated, loading, login, logout, signup, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
