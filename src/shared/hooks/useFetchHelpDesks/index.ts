import api from '../../../service/api'
import { useQuery } from 'react-query'
import { HelpDeskListProp } from '../../types/helpdeskType'

export function useFetchHelpDesks(url: string) {
  const token = localStorage.getItem('access_token')
  const headers = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  }

  const fetchData = async () => {
    const { data } = await api.get<HelpDeskListProp[]>(
      `http://apihd.cinbal.com.br/${url}`,
      headers,
    )
    return data
  }

  const query = useQuery({
    queryKey: ['helpDesk'],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  })

  return query
}
