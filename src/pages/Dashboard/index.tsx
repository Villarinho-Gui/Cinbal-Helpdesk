/* eslint-disable prettier/prettier */
import React from 'react'
import DefaultLayout from '../../shared/layouts/DefaultLayout'
import { Box, Grid, useTheme } from '@mui/material'
import { CardDashboard } from './components/CardDashboard'
import { CardExibicaoMeusChamados } from './components/CardExibicaoMeusChamados'


const Dashboard: React.FC = () => {
  const theme = useTheme()

  return (
    <DefaultLayout  
      tituloPagina="Dashboard" 
      mostrarBotaoTema       
      mostrarBotaoLogout
      mostrarBotaoPerfil 
      mostrarBotaoHome
      mostrarBotaoOpenHelpDesk
      barraDeFerramentas={''}
      showNotificationButton
    >
      <Box         
          padding={2}
          borderRadius={1}
          marginX={1}
          width="auto"
          border="1px solid"
          height="max-content"
          borderColor={theme.palette.divider}
        >
        <Grid container spacing={2}>
          <Grid item xl={3}>
            <CardDashboard />
          </Grid>
          <Grid item xl={3}>
            <CardExibicaoMeusChamados />
          </Grid>
        </Grid>
      </Box>
    </DefaultLayout>)
}

export default Dashboard
