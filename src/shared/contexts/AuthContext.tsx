/* eslint-disable react-hooks/rules-of-hooks */
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { AuthService } from '../services/api/auth/AuthService'

interface IAuthContextData {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<string | void>
  logout: () => void
}

interface IChildrenConfig {
  children: React.ReactNode
}

const AuthContext = createContext({} as IAuthContextData)

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN'

const contexts: React.FC<IChildrenConfig> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>()

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN)

    if (accessToken) {
      setAccessToken(JSON.parse(accessToken))
    } else {
      setAccessToken(undefined)
    }
  }, [])

  const triggerLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password)

    if (result instanceof Error) {
      return result.message
    } else {
      localStorage.setItem(
        LOCAL_STORAGE_KEY__ACCESS_TOKEN,
        JSON.stringify(result.accessToken),
      )
      setAccessToken(result.accessToken)
    }
  }, [])
  const triggerLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN)

    setAccessToken(undefined)
  }, [])

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken])

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login: triggerLogin, logout: triggerLogout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default contexts
