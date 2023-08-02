/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import api from '../../../service/api/config/configApi'
import { AxiosRequestConfig } from 'axios'
import { useHelpDeskContext } from '../../contexts/HelpDeskContext'
import { useParams } from 'react-router-dom'

interface FileProps {
  id: string
  filename: string
  mimetype:
    | 'image/jpeg'
    | 'image/gif'
    | 'image/png'
    | 'image/bmp'
    | 'application/pdf'
}

interface HelpDeskProps {
  id: string
  user: {
    name: string
    sector: string
    role: string
  }
  title: string
  category: string
  description: string
  maxLines: number
  createdAt: Date
  files?: FileProps[]
  accountable?: string
}

export function useFetch(url: string, headers: AxiosRequestConfig) {
  const [helpDeskData, setHelpDeskData] = useState<HelpDeskProps | null>(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { isNewHelpDesk } = useHelpDeskContext()
  const { id } = useParams()

  const fetchHelpDesk = async () => {
    setIsLoading(true)
    try {
      const apiResponse: any = await api.get<HelpDeskProps>(url, headers)

      const { data } = apiResponse

      setHelpDeskData(data)
      setError(null)
    } catch (error: any) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchHelpDesk()
  }, [isNewHelpDesk, id])
  return { helpDeskData, error, isLoading }
}
