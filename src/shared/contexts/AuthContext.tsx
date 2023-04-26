import React, { Children, createContext } from 'react'

interface IAuthContextData {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<string | void>
  logout: () => void
}

interface IChildrenConfig {
  children: React.ReactNode
}

const AuthContext = createContext({} as IAuthContextData)

const contexts: React.FC<IChildrenConfig> = ({ children }) => {
  const trigge

  return (
    <AuthContext.Provider value={(isAuthenticated, login, logout)}>
      {children}
    </AuthContext.Provider>
  )
}

export default contexts
