/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import api from '../../../service/api/config/configApi'
import { AxiosRequestConfig } from 'axios'
import { useHelpDeskContext } from '../../contexts/HelpDeskContext'
import { useParams } from 'react-router-dom'

interface CommentsProps {
  id: string
  message: string
  user: {
    name: string
  }
  helpdesk: {
    id: string
    status: string
  }
  createdAt: Date
}

export function useMessage(url: string, headers: AxiosRequestConfig) {
  const [comment, setComment] = useState<CommentsProps[]>([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { id } = useParams()

  const { isNewMessage } = useHelpDeskContext()

  const fetchHelpDeskMessage = async () => {
    setIsLoading(true)
    try {
      const apiResponse: any = await api.get<CommentsProps>(url, headers)

      const { data } = apiResponse

      setComment(data)
      setError(null)
    } catch (error: any) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchHelpDeskMessage()
  }, [isNewMessage, id])
  return { comment, error, isLoading }
}
