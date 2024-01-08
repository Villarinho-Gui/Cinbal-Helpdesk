import api from '../../../service/api'
import { useQuery } from 'react-query'
import { HelpDeskProps } from '../../types/helpdeskType'
import { useParams } from 'react-router-dom'

export function useFetch(url: string) {
  const { id } = useParams()

  const token = localStorage.getItem('access_token')
  const headers = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  }

  const fetchData = async () => {
    const { data } = await api.get<HelpDeskProps>(
      `http://apihd.cinbal.com.br/${url}`,
      headers,
    )

    return data
  }

  const query = useQuery({
    queryKey: ['helpDesk-data', id],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  })

  return query
}
