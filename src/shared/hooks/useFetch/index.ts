import { useParams } from 'react-router-dom'
import api from '../../../service/api/config/configApi'
import { useQuery } from 'react-query'
import { HelpDeskProps } from '../../types/helpdeskType'
import { useEffect } from 'react'
import { useUserContext } from '../../contexts/userContext'

export function useFetch(url: string) {
  const { isAssumed } = useUserContext()
  const { id } = useParams()
  const token = localStorage.getItem('access_token')
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
  }
  const { data, isLoading, refetch } = useQuery(
    ['id', id],
    async () => {
      const responseApi = await api.get<HelpDeskProps>(url, headers)
      return responseApi.data
    },
    {
      refetchOnWindowFocus: false,
    },
  )

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAssumed])

  return { data, isLoading }
}
