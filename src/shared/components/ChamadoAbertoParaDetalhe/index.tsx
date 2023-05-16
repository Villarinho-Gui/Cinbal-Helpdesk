/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DefaultLayout from '../../layouts/DefaultLayout'
import BarraFerramentasDetalhesChamado from '../../../shared/components/BarraFerramentasDetalhesChamado'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Skeleton,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import api from '../../../service/api/config/configApi'

interface IChamadoAbertoParaDetalheProps {
  author: string
  // setor: string
  titulo: string
  categoria: string
  descricao: string
  maxLines: number
  createdAt: Date
}

export const ChamadoAbertoParaDetalhe: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [chamadoData, setChamadoData] =
    useState<IChamadoAbertoParaDetalheProps | null>(null)

  const navigate = useNavigate()
  const theme = useTheme()
  const { id } = useParams()

  const fetchChamado = async () => {
    setIsLoading(true)
    try {
      const response = await api.get<IChamadoAbertoParaDetalheProps>(
        `/chamado/${id}`,
      )
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
    <>
      <DefaultLayout
        mostrarBotaoTema={true}
        mostrarBotaoLogout
        mostrarBotaoPerfil
        tituloPagina={id === 'novo' ? '' : chamadoData?.titulo}
        barraDeFerramentas={
          <BarraFerramentasDetalhesChamado
            aoClicarEmVoltar={() => navigate('/abrir-chamado')}
            mostrarBotaoAssumirChamado={true}
          />
        }
      >
        <Box
          padding={5}
          borderRadius={1}
          margin={1}
          width="auto"
          border="1px solid"
          height="57vh"
          borderColor={theme.palette.divider}
        >
          <Box display="flex" justifyContent="space-between" paddingBottom={2}>
            <Box>
              {isLoading ? (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1.5rem' }}
                  width="200px"
                />
              ) : (
                <Typography variant="h5" sx={{ fontSize: '1rem' }}>
                  {chamadoData?.author}
                </Typography>
              )}

              {isLoading ? (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1.5rem' }}
                  width="50px"
                />
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: '0.8rem' }}
                >
                  {/* {chamadoData?.setor} */}
                </Typography>
              )}
            </Box>
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
          <Divider />

          <Box paddingY={2} marginLeft={0}>
            {isLoading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: '1.5rem' }}
                width="90px"
              />
            ) : (
              <Chip
                label={chamadoData?.categoria}
                size="small"
                color="default"
              />
            )}
          </Box>

          <Box>
            {isLoading ? (
              <Skeleton
                variant="rounded"
                sx={{ fontSize: '1.5rem' }}
                width="100%"
                height="100px"
              />
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ paddingBottom: '40px' }}
              >
                {chamadoData?.descricao}
              </Typography>
            )}
            <Divider />
            <Box display="flex" gap="10px"></Box>
          </Box>
        </Box>
      </DefaultLayout>
    </>
  )
}
