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
  Paper,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import api from '../../../service/api/config/configApi'
import {
  MdImage,
  MdDownload,
  MdOutlineEmojiPeople,
  MdExpandMore,
  MdPictureAsPdf,
} from 'react-icons/md'

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

interface HelpDeskDetailsProps {
  id: string
  user: {
    name: string
    sector: string
  }
  title: string
  category: string
  description: string
  maxLines: number
  createdAt: Date
  files?: FileProps[]
}

export const ChamadoAbertoParaDetalhe: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [helpDeskData, setHelpDeskData] = useState<HelpDeskDetailsProps | null>(
    null,
  )

  const [attachedFiles, setAttachedFiles] = useState<FileProps[]>([])

  const theme = useTheme()
  const { id } = useParams()
  const token = localStorage.getItem('access_token')

  const fetchChamado = async () => {
    setIsLoading(true)
    try {
      const response = await api.get<HelpDeskDetailsProps>(`/helpdesk/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      const { data } = response

      setHelpDeskData(data)
      console.log(data)
      setAttachedFiles(data.files!)
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
    return format(
      new Date(helpDeskData!.createdAt),
      "d 'de' LLLL 'às' HH:mm'h'",
      {
        locale: ptBR,
      },
    )
  }

  const publishedDateRelativeToNow = () => {
    return formatDistanceToNow(new Date(helpDeskData!.createdAt), {
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
      tituloPagina={''}
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
        <Box
          component={Paper}
          height={45}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          marginBottom={5}
          elevation={0}
        >
          <Typography variant="h6" margin={2}>
            {helpDeskData?.title}
          </Typography>
          <Button
            variant="contained"
            size="small"
            endIcon={<MdOutlineEmojiPeople />}
            disableElevation
            sx={{
              marginRight: '15px',
            }}
          >
            Assumir Chamado
          </Button>
        </Box>
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
                {helpDeskData?.user.name}
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
                {helpDeskData?.user.sector}
              </Typography>
            )}
          </Box>
          <time
            title={helpDeskData?.createdAt ? publishedDateFormatted() : ''}
            dateTime={String(helpDeskData?.createdAt) ?? ''}
          >
            {isLoading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: '1.5rem' }}
                width="90px"
              />
            ) : helpDeskData?.createdAt ? (
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
                    <Box margin={2}>
                      {file.mimetype === 'application/pdf' ? (
                        <Icon>
                          <MdPictureAsPdf />
                        </Icon>
                      ) : file.mimetype === 'image/png' ||
                        file.mimetype === 'image/jpeg' ||
                        file.mimetype === 'image/gif' ||
                        file.mimetype === 'image/bmp' ? (
                        <Icon>
                          <MdImage />
                        </Icon>
                      ) : (
                        ''
                      )}
                    </Box>
                    <Box
                      display={'flex'}
                      width={'200px'}
                      justifyContent={'center'}
                      flexDirection={'column'}
                    >
                      <Typography fontSize={'14px'} width={'30ch'} noWrap>
                        {file.filename}
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

        <Accordion variant="outlined" elevation={0} sx={{ maxWidth: '1000px' }}>
          <AccordionSummary
            expandIcon={<MdExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Iniciar interação com o(a) solicitante</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Componente de interação aqui</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </DefaultLayout>
  )
}
