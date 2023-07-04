import {
  Card,
  Box,
  CardContent,
  Typography,
  Skeleton,
  Button,
  useTheme,
} from '@mui/material'
import React, { useState, useEffect } from 'react'

import api from '../../../../service/api/config/configApi'

interface FileProps {
  id: string
  url: string
  callId: string
}
interface HelpDeskDashboardProps {
  id: string
  author: string
  title: string
  category: string
  description: string
  files?: FileProps[]
  createdAt: Date
}

export const CardDashboard: React.FC = () => {
  const [isLoadingChamados, setIsLoadingChamados] = useState<boolean>(false)
  const [helpDeskData, setHelpDeskData] = useState<HelpDeskDashboardProps[]>([])
  const theme = useTheme()

  const token = localStorage.getItem('access_token')

  useEffect(() => {
    setIsLoadingChamados(true)

    api
      .get<HelpDeskDashboardProps[]>('/helpdesk', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        const { data } = response
        setIsLoadingChamados(false)
        if (response instanceof Error) {
          alert(response.message)
        } else {
          setHelpDeskData(data)
        }
      })
  }, [token])

  return (
    <Card
      elevation={0}
      padding={2}
      variant="outlined"
      component={Box}
      borderRadius={1}
      marginX={2}
      border="1px solid"
      borderColor={theme.palette.divider}
    >
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
            {isLoadingChamados ? (
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
                {helpDeskData.length}
              </Typography>
            )}
          </Box>

          <Button>Visualizar</Button>
        </Box>
      </CardContent>
    </Card>
  )
}
