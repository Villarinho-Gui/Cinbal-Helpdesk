/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from 'react-query'
import api from '../../../service/api/config/configApi'
import { useParams } from 'react-router-dom'
import { CommentsProps } from '../../types/helpdeskType'

export function useMessage() {
  const { id } = useParams()
  const token = localStorage.getItem('access_token')
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
  }
  const { data } = useQuery(['comments', id], async () => {
    const responseApi = await api.get<CommentsProps[]>(
      `http://localhost:3535/comment/${id}`,
      headers,
    )

    return responseApi
  })

  return { data }
}
