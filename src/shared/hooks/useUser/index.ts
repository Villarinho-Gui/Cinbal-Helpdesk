/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { AxiosRequestConfig } from 'axios'
import api from '../../../service/api/config/configApi'
import { useUserContext } from '../../contexts/userContext'

export interface UserProps {
  id: string | undefined
  name: string | undefined
  sector: string | undefined
  email: string | undefined
  extension: string | undefined
  position: string | undefined
  role: string | undefined
}

export function useUser(url: string, headers: AxiosRequestConfig) {
  const [users, setUsers] = useState<UserProps[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState(null)

  const { isLogged } = useUserContext()

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const apiResponse: any = await api.get<UserProps[]>(url, headers)

      const { data } = apiResponse

      setUsers(data)
      setError(null)
    } catch (error: any) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [isLogged])

  return { users, isLoading, error }
}
