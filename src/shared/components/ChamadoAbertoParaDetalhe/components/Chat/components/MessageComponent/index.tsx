import { Box, CardContent, Typography, useTheme } from '@mui/material'
import React from 'react'

// import { Container } from './styles';

export const MessageComponent: React.FC = () => {
  const theme = useTheme()
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
          margin: '10px',
          alignSelf: 'end',
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
              Guilherme Villarinho
            </Typography>
            <Typography
              variant="h2"
              sx={{ fontSize: '14px', marginBottom: '10px' }}
              color={'#fff'}
            >
              10:52
            </Typography>
          </Box>
          <Box maxWidth={'max'}>
            <Typography variant="body2" textAlign={'left'} color={'#fff'}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </>
  )
}
