import {
  Card,
  Box,
  CardContent,
  Typography,
  Skeleton,
  Button,
  useTheme,
} from '@mui/material'
import React from 'react'
import { useFetch } from '../../../../shared/hooks/useFetch'

export const CardDashboard: React.FC = () => {
  const { data, isLoading } = useFetch('http://localhost:3535/helpdesk/')

  const theme = useTheme()

  return (
    <Card elevation={0} variant="outlined">
      <CardContent>
        <Box>
          <Typography
            variant="h5"
            sx={{ fontSize: '1rem' }}
            color="text.secondary"
          >
            Chamados Abertos
          </Typography>
          <Box display="flex" gap={2} width="100%" alignItems="center">
            {isLoading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: '4rem' }}
                width="100px"
              />
            ) : (
              <Typography
                variant="body2"
                color={theme.palette.text.primary}
                sx={{ fontSize: '3rem' }}
              >
                {data!.length}
              </Typography>
            )}
          </Box>

          <Button variant="outlined">Visualizar</Button>
        </Box>
      </CardContent>
    </Card>
  )
}
