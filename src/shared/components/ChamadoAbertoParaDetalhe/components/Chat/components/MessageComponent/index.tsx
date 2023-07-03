import React from 'react'
import { Box, CardContent, Typography, useTheme } from '@mui/material'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// import { Container } from './styles';

interface MessageProps {
  id: string
  author: string
  createdAt: Date
  message: string
}

export const MessageComponent: React.FC<MessageProps> = ({
  author,
  createdAt,
  message,
}) => {
  const theme = useTheme()

  const publishedDateFormatted = () => {
    return format(new Date(createdAt), "HH:mm'h'", {
      locale: ptBR,
    })
  }

  return (
    <>
      <Box
        bgcolor={theme.palette.primary.main}
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
              variant="h2"
              sx={{ fontSize: '14px', marginBottom: '10px' }}
              color={'#fff'}
            >
              {author}
            </Typography>
            <Typography
              variant="h2"
              sx={{ fontSize: '14px', marginBottom: '10px' }}
              color={'#fff'}
            >
              <time title={createdAt ? publishedDateFormatted() : ''}>
                {' '}
                {publishedDateFormatted()}
              </time>
            </Typography>
          </Box>
          <Box maxWidth={'max'}>
            <Typography variant="body2" textAlign={'left'} color={'#fff'}>
              {message}
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </>
  )
}
