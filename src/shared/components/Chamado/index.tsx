/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Icon,
  Skeleton,
  Typography,
} from '@mui/material'
import React, { useState, useEffect } from 'react'

import { MdImage } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import api from '../../../service/api/config/configApi'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

interface IChamadoProps {
  id: number
  author: string
  titulo: string
  categoria: string
  descricao: string
  maxLines: number
  image: string
  createdAt: Date
}
export const Chamado: React.FC<IChamadoProps> = ({
  id,
  author,
  titulo,
  categoria,
  descricao,
  maxLines,
  image,
  createdAt,
}) => {
  const [chamadoData, setChamadoData] = useState<IChamadoProps | null>(null)
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
      const response = await api.get<IChamadoProps>(`/chamado/${id}`)
      const { data } = response
      console.log(data)

      data.createdAt = new Date(data.createdAt)

      setChamadoData(data)
      setIsLoading(false)
    } catch (error) {
      console.error('Erro ao obter os dados do chamado', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchChamado()
  }, [id])

  const publishedDateFormatted = (data: Date) => {
    return format(data, "d 'de' LLLL 'às' HH:mm'h'", {
      locale: ptBR,
    })
  }

  const publishedDateRelativeToNow = (data: Date) => {
    return formatDistanceToNow(data, {
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
              {chamadoData?.author}
            </Typography>
            <time
              title={
                chamadoData?.createdAt
                  ? publishedDateFormatted(chamadoData.createdAt)
                  : ''
              }
              dateTime={
                chamadoData?.createdAt
                  ? chamadoData.createdAt.toISOString()
                  : ''
              }
            >
              {isLoading ? (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1.5rem' }}
                  width="90px"
                />
              ) : chamadoData?.createdAt ? (
                <Typography
                  variant="body2"
                  sx={{ fontSize: '0.8rem' }}
                  color="text.secondary"
                >
                  {publishedDateRelativeToNow(chamadoData.createdAt)}
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
            {chamadoData?.titulo}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={descriptionStyle}
          >
            {' '}
            {chamadoData?.descricao}
          </Typography>
          <Box>
            {chamadoData?.image && (
              <Avatar sx={{ width: '25px', height: '25px', marginY: '10px' }}>
                <MdImage size={15} color="info" />
              </Avatar>
            )}
          </Box>
        </CardContent>
      </Card>
    </CardActionArea>
  )
}
