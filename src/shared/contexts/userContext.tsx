/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react'

import api from '../../service/api/config/configApi'

export interface UserProps {
  name: string
  sector: string
  email: string
  extension: string
  position: string
  role: string
}

interface UserContextProps {
  isAdmin: string | null
  accountable: string | null
  user: UserProps | null
  isLogged: boolean
  isAssumed: boolean
  setIsAdmin: React.Dispatch<React.SetStateAction<string | null>>
  setAccountable: React.Dispatch<React.SetStateAction<string | null>>
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
  setIsAssumed: React.Dispatch<React.SetStateAction<boolean>>
}

interface UserContextChildren {
  children: React.ReactNode
}
const UserContext = createContext({} as UserContextProps)

export const useUserHelpDeskContext = () => {
  return useContext(UserContext)
}

export const UserProvider: React.FC<UserContextChildren> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<string | null>(null)
  const [accountable, setAccountable] = useState<string | null>(null)
  const [user, setUser] = useState<UserProps | null>(null)
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [isAssumed, setIsAssumed] = useState<boolean>(false)

  const token = localStorage.getItem('access_token')

  useEffect(() => {
    api
      .get<UserProps>('/auth/me', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        const { data } = response
        setAccountable(data.name)
        setIsAdmin(data.role)
        setUser(data)
      })
  }, [isLogged])

  return (
    <UserContext.Provider
      value={{
        isAdmin,
        isAssumed,
        setIsAssumed,
        setIsAdmin,
        accountable,
        setAccountable,
        user,
        setUser,
        isLogged,
        setIsLogged,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
