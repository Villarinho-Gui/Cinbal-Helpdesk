/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DefaultLayout from '../../layouts/DefaultLayout'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import {
  Box,
  Chip,
  Divider,
  Skeleton,
  Typography,
  Card,
  Icon,
  IconButton,
  Grid,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import api from '../../../service/api/config/configApi'
import { MdImage, MdDownload } from 'react-icons/md'
import { HelpDeskDataProps } from '../Chamado'

interface FileProps {
  id: string
  filename: string
  type: string
  size: number
  url: string
  callId: string
}
interface HelpDeskDetailsProps extends HelpDeskDataProps {
  id: string
  author: string
  title: string
  category: string
  description: string
  maxLines: number
  createdAt: Date
  files?: FileProps[]
}

export const ChamadoAbertoParaDetalhe: React.FC<HelpDeskDetailsProps> = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [helpDeskData, setHelpDeskData] = useState<HelpDeskDetailsProps | null>(
    null,
  )

  const [createdAtFormatted, setCreatedAtFormatted] = useState<Date>()
  const [attachedFiles, setAttachedFiles] = useState<FileProps[]>([])

  const theme = useTheme()
  const { id } = useParams()

  const fetchChamado = async () => {
    setIsLoading(true)
    try {
      const response = await api.get<HelpDeskDetailsProps>(`/chamado/${id}`)
      const { data } = response

      const formattedCreatedAt = new Date(Object.values(data)[0].createdAt)

      setHelpDeskData(Object.values(data)[0])
      setCreatedAtFormatted(formattedCreatedAt)
      setAttachedFiles(Object.values(data)[0].files)
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
    <DefaultLayout
      mostrarBotaoTema={true}
      mostrarBotaoLogout
      mostrarBotaoPerfil
      mostrarBotaoHome
      tituloPagina={id === 'novo' ? '' : helpDeskData?.title}
      barraDeFerramentas={''}
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

        <Grid
          container
          spacing={2}
          display={'flex'}
          flex={1}
          justifyContent={'space-between'}
          paddingY={'20px'}
        >
          <Grid item xs={12} lg={2}>
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
          </Grid>

          <Grid
            item
            xl={4}
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              justifyContent: 'end',
            }}
          >
            <Typography variant="body2">Id:</Typography>
            {isLoading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: '1.5rem' }}
                width="90px"
              />
            ) : (
              <Chip label={helpDeskData?.id} size="small" color="default" />
            )}
          </Grid>
        </Grid>

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

        {helpDeskData?.files && helpDeskData?.files.length > 0 && (
          <Grid container spacing={2} maxWidth={'100%'} paddingY={'20px'}>
            {attachedFiles.map((file: FileProps) => (
              <Grid item xl={2} lg={6} md={6} sm={12} xs={12} key={file.id}>
                <Card
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '60px',
                    justifyContent: 'space-between',
                  }}
                  variant="outlined"
                >
                  <Box display={'flex'} alignItems={'center'} gap={'2px'}>
                    {file.url.includes('.png') ? (
                      <Icon sx={{ margin: '5px' }}>
                        <MdImage size={25} color="#49b3e8" />
                      </Icon>
                    ) : (
                      ''
                    )}
                    <Box
                      display={'flex'}
                      width={'200px'}
                      justifyContent={'center'}
                      flexDirection={'column'}
                    >
                      <Typography fontSize={'14px'} width={'30ch'} noWrap>
                        {file.url}
                      </Typography>
                    </Box>
                  </Box>

                  <IconButton>
                    <MdDownload />
                  </IconButton>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </DefaultLayout>
  )
}
