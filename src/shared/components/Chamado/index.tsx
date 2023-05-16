/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from '@mui/material'
import React, { useState, useEffect } from 'react'

import { MdImage } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import api from '../../../service/api/config/configApi'

interface IChamadoProps {
  id: number
  author: string
  titulo: string
  descricao: string
  publishedAt: Date
  maxLines: number
}

export const Chamado: React.FC<IChamadoProps> = ({
  id,
  author,
  titulo,
  descricao,
  publishedAt,
  maxLines = 2,
}) => {
  const navigate = useNavigate()
  const [chamadoData, setChamadoData] = useState<IChamadoProps | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const descriptionStyle = {
    height: '35px',
    display: '-webkit-box',
    WebkitLineClamp: maxLines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  }

  const fetchChamado = async () => {
    setIsLoading(true)
    try {
      const response = await api.get<IChamadoProps>(`/chamado/${id}`)
      const { data } = response

      setChamadoData(data)
      setIsLoading(false)
    } catch (error) {
      console.error('Erro ao obter os dados do chamado', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchChamado()
  }, [])

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
            <time dateTime={String(chamadoData?.publishedAt)}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '14px' }}
              >
                há 20 horas
              </Typography>
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
            <Chip
              size="small"
              variant="outlined"
              color="primary"
              avatar={
                <Avatar>
                  <MdImage />
                </Avatar>
              }
              label="Avatar"
              sx={{ marginY: 2 }}
            />
          </Box>
        </CardContent>
      </Card>
    </CardActionArea>
  )
}
