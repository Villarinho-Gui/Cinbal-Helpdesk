import React, { memo } from 'react'
import { Box, CardContent, Typography, useTheme } from '@mui/material'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useUserContext } from '../../../../../../contexts/userContext'
interface MessageProps {
  id: string
  author: string
  createdAt: Date
  message: string
}

const MessageComponent: React.FC<MessageProps> = ({
  author,
  message,
  createdAt,
}) => {
  const theme = useTheme()

  const { user } = useUserContext()

  const publishedDateFormatted = () => {
    return format(new Date(createdAt), "HH:mm'h'", {
      locale: ptBR,
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
          </Box>
        </CardContent>
      </Box>
    </>
  )
}

export default memo(MessageComponent)
