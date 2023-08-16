/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom'
import api from '../../../service/api/config/configApi'
import { useQuery } from 'react-query'
import { HelpDeskProps } from '../../types/helpdeskType'

export function useFetch() {
  const { id } = useParams()
  const token = localStorage.getItem('access_token')
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
  }
  const { data, isLoading } = useQuery(['id', id], async () => {
    const responseApi = await api.get<HelpDeskProps>(
      `http://localhost:3535/helpdesk/${id}`,
      headers,
    )
    return responseApi.data
  })

  return { data, isLoading }
}
