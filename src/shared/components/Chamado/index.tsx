/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Skeleton,
  Typography,
} from '@mui/material'
import React, { useState, useEffect } from 'react'

import { MdImage } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import api from '../../../service/api/config/configApi'
import { format, formatDistanceToNow, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export interface HelpDeskDataProps {
  id: string
  author?: string
  title: string
  category?: string
  description: string
  maxLines: number
  files?: string[]
  createdAt: Date
}
export const Chamado: React.FC<HelpDeskDataProps> = ({
  id,
  author,
  description,
  createdAt,
  title,
}) => {
  const [_, setHelpDeskData] = useState<HelpDeskDataProps | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const descriptionStyle = {
    height: '35px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  }

  const fetchChamado = async () => {
    setIsLoading(true)
    try {
      const response = await api.get<HelpDeskDataProps>(`/chamado/${id}`)
      const { data } = response
      setHelpDeskData(data)
      setIsLoading(false)
    } catch (error) {
      console.error('Erro ao obter os dados do chamado', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchChamado()
  }, [id])

  const publishedDateFormatted = () => {
    return format(createdAt, "d 'de' LLLL 'às' HH:mm'h'", {
      locale: ptBR,
    })
  }

  const publishedDateRelativeToNow = () => {
    return formatDistanceToNow(createdAt, {
      locale: ptBR,
      addSuffix: true,
    })
  }

  return (
    <CardActionArea onClick={() => navigate(`chamado/detalhe/${id}`)}>
      <Card
        variant="outlined"
        sx={{
          width: '99%',
          height: '150px',
          display: 'flex',
          flex: '1',
          marginX: 'auto',
        }}
      >
        <CardContent sx={{ flex: 1 }}>
          <Box
            bgcolor="Background.primary"
            display="flex"
            justifyContent="space-between"
          >
            <Typography
              variant="h5"
              sx={{ fontSize: '14px' }}
              color="text.secondary"
            >
              {author}
            </Typography>
            <time
              title={createdAt ? publishedDateFormatted() : ''}
              dateTime={createdAt ? createdAt.toISOString() : ''}
            >
              {isLoading ? (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1.5rem' }}
                  width="90px"
                />
              ) : createdAt ? (
                <Typography
                  variant="body2"
                  sx={{ fontSize: '0.8rem' }}
                  color="text.secondary"
                >
                  {publishedDateRelativeToNow()}
                </Typography>
              ) : null}
            </time>
          </Box>
          <Typography
            variant="h6"
            color="text.primary"
            sx={{
              fontSize: 14,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={descriptionStyle}
          >
            {description}
          </Typography>
          {/* <Box>
            {Array.isArray(chamadoData?.files) &&
              chamadoData?.files?.length > 0 && (
                <Avatar sx={{ width: '25px', height: '25px', marginY: '10px' }}>
                  <MdImage size={15} color="info" />
                </Avatar>
              )}
          </Box> */}
        </CardContent>
      </Card>
    </CardActionArea>
  )
}
