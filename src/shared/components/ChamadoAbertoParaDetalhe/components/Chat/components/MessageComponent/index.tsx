import React, { memo } from 'react'
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useUserContext } from '../../../../../../contexts/userContext'
import { FileProps } from '../../../../../../types/helpdeskType'
import { AiFillFile } from 'react-icons/ai'
import { MdDownload, MdImage } from 'react-icons/md'
import api from '../../../../../../../service/api'
import fileDownload from 'js-file-download'
import {
  SiMicrosoftexcel,
  SiMicrosoftword,
  SiMicrosoftpowerpoint,
} from 'react-icons/si'
import { TiDocumentText } from 'react-icons/ti'

interface MessageProps {
  id: string
  author: string
  createdAt: Date
  message: string
  file: FileProps
}

const MessageComponent: React.FC<MessageProps> = ({
  author,
  message,
  createdAt,
  file,
}) => {
  const theme = useTheme()

  const { user } = useUserContext()
  const token = localStorage.getItem('access_token')
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
  }

  const publishedDateFormatted = () => {
    return format(new Date(createdAt), "HH:mm'h'", {
      locale: ptBR,
    })
  }

  const downloadFile = async (file: FileProps) => {
    await api
      .get(`/file/commentFile/${file.id}`, {
        ...headers,
        responseType: 'blob',
      })
      .then((response) => {
        const fileName = file.filename
        fileDownload(response.data, fileName)
        console.log('funcionou')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
      <Box
        bgcolor={
          user?.name !== author
            ? theme.palette.primary.dark
            : theme.palette.primary.light
        }
        sx={{
          maxWidth: '400px',
          minWidth: '250px',
          width: 'max',
          height: 'max',
          display: 'flex',
          marginX: '10px',
          marginY: '5px',
          borderRadius: '8px',
        }}
      >
        <CardContent sx={{ flex: 1 }}>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography
              variant="body2"
              color={theme.palette.primary.contrastText}
              width={'20ch'}
              noWrap
            >
              {author}
            </Typography>
            <Typography
              variant="body2"
              color={theme.palette.primary.contrastText}
            >
              <time title={createdAt ? publishedDateFormatted() : ''}>
                {publishedDateFormatted()}
              </time>
            </Typography>
          </Box>
          <Box maxWidth={'max'}>
            <Typography
              variant="body2"
              textAlign={'left'}
              color={theme.palette.primary.contrastText}
            >
              {message}
            </Typography>
            {file.map((file: FileProps) => (
              <Grid item xl={2} lg={6} md={6} sm={12} xs={12} key={file.id}>
                <Card
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '60px',
                    justifyContent: 'space-between',
                  }}
                  variant="outlined"
                  color={
                    user?.name !== author
                      ? theme.palette.primary.dark
                      : theme.palette.primary.light
                  }
                >
                  <Box display={'flex'} alignItems={'center'} gap={'2px'}>
                    <Box margin={2} alignItems={'center'}>
                      {file.mimetype === 'application/pdf' ? (
                        <AiFillFile size={25} />
                      ) : file.mimetype === 'image/png' ||
                        file.mimetype === 'image/jpeg' ||
                        file.mimetype === 'image/gif' ||
                        file.mimetype === 'image/bmp' ? (
                        <MdImage />
                      ) : file.mimetype ===
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? (
                        <SiMicrosoftexcel />
                      ) : file.mimetype ===
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? (
                        <SiMicrosoftword />
                      ) : file.mimetype === 'text/plain' ? (
                        <TiDocumentText size={20} />
                      ) : file.mimetype ===
                        'application/vnd.openxmlformats-officedocument.presentationml.presentation' ? (
                        <SiMicrosoftpowerpoint />
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
                      <Typography fontSize={'14px'} width={'20ch'} noWrap>
                        {file.filename}
                      </Typography>
                    </Box>
                  </Box>

                  <IconButton onClick={() => downloadFile(file)}>
                    <MdDownload />
                  </IconButton>
                </Card>
              </Grid>
            ))}
          </Box>
        </CardContent>
      </Box>
    </>
  )
}

export default memo(MessageComponent)
