/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DefaultLayout from '../../layouts/DefaultLayout'
import BarraFerramentasDetalhesChamado from '../../../shared/components/BarraFerramentasDetalhesChamado'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Box, Button, Chip, Divider, Skeleton, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import api from '../../../service/api/config/configApi'
import { BsFillImageFill } from 'react-icons/bs'

interface HelpDeskDetailsProps {
  author: string
  title: string
  category: string
  description: string
  maxLines: number
  createdAt: Date
  files: string
}

export const ChamadoAbertoParaDetalhe: React.FC<HelpDeskDetailsProps> = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [helpDeskData, setHelpDeskData] = useState<HelpDeskDetailsProps | null>(
    null,
  )

  const [createdAtFormatted, setCreatedAtFormatted] = useState<Date>()
  // const [arquivosAnexados, setArquivosAnexados] = useState<string[]>([])

  const navigate = useNavigate()
  const theme = useTheme()
  const { id } = useParams()

  const fetchChamado = async () => {
    setIsLoading(true)
    try {
      const response = await api.get<HelpDeskDetailsProps>(`/chamado/${id}`)
      const { data } = response
      /**
       * Extrai os nomes dos arquivos anexados
       */
      // const nomesArquivos = data.files ? [data.files] : []

      const formattedCreatedAt = new Date(Object.values(data)[0].createdAt)

      setHelpDeskData(Object.values(data)[0])
      setCreatedAtFormatted(formattedCreatedAt)
      // setArquivosAnexados(nomesArquivos)
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
        tituloPagina={id === 'novo' ? '' : helpDeskData?.title}
        barraDeFerramentas={
          <BarraFerramentasDetalhesChamado
            aoClicarEmVoltar={() => navigate('/home/dashboard')}
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
                  {helpDeskData?.author}
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
                createdAtFormatted
                  ? publishedDateFormatted(createdAtFormatted)
                  : ''
              }
              dateTime={
                createdAtFormatted ? createdAtFormatted.toISOString() : ''
              }
            >
              {isLoading ? (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1.5rem' }}
                  width="90px"
                />
              ) : createdAtFormatted ? (
                <Typography
                  variant="body2"
                  sx={{ fontSize: '0.8rem' }}
                  color="text.secondary"
                >
                  {publishedDateRelativeToNow(createdAtFormatted)}
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
                label={helpDeskData?.category}
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
                {helpDeskData?.description}
              </Typography>
            )}
            <Divider />
            <Box display="flex" gap="10px"></Box>
          </Box>

          {/* {chamadoData?.image && chamadoData?.image.length > 0 && (
            <Box display="flex" width="100%" gap={2}>
              {chamadoData?.image?.map((imagem: string, index: number) => (
                <Button
                  key={index}
                  variant="outlined"
                  endIcon={<BsFillImageFill />}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginY: '20px',
                  }}
                  onClick={() => navigate(`/download/${imagem}`)}
                  disableElevation
                >
                  Imagem anexada
                </Button>
              ))}
            </Box>
          )} */}
        </Box>
      </DefaultLayout>
    </>
  )
}
