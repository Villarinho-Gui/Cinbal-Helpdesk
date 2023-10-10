/* eslint-disable prettier/prettier */
import React from 'react'
import DefaultLayout from '../../shared/layouts/DefaultLayout'
import { Box, Grid, useTheme } from '@mui/material'
import { CardOpenedHelpDesks } from './components/CardHelpDesksExistentes'
import { CardHelpDesksAssumidos } from './components/CardHelpDesksAssumidos'
import { useUserContext } from '../../shared/contexts/userContext'
import { CardHelpDesksConcluidos } from './components/CardHelpdesksConcluidos'
import { CardCategoriaMaisRepetida } from './components/CardCategoriaMaisRepetida'
import { CardHelpDesksEmAndamento } from './components/CardHelpDesksEmAndamento'
import { useFetch } from '../../shared/hooks/useFetch'
import HelpDeskProps from '../../shared/types/helpdeskType'


const Dashboard: React.FC = () => {
  const theme = useTheme()

  const { user } = useUserContext()
  const currentUser = user

  const { data } = useFetch('http://localhost:3535/helpdesk/')


  const helpDesksInProgress = data?.filter((helpDesk: HelpDeskProps) => {
    return helpDesk.status === 'Em Andamento'
  })

  const completedHelpDesks = data?.filter((helpDesk: HelpDeskProps) => {
    return helpDesk.status === 'Concluído'
  })

  const categoryThatAppearsTheMost = data?.reduce(
    (quantity: any, helpdesk: any) => {
      const chave = helpdesk.category
      if (!quantity[chave]) {
        quantity[chave] = 0
      }
      quantity[chave]++
      return quantity
    },
    [],
  )

  const maxCategory = categoryThatAppearsTheMost
    ? Object.keys(categoryThatAppearsTheMost).reduce((a, b) =>
        categoryThatAppearsTheMost[a] > categoryThatAppearsTheMost[b] ? a : b,
      )
    : null

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
          <Grid item xl={3} md={4} xs={12}>
            {currentUser?.role === "admin" && <CardOpenedHelpDesks numberOfOpened={data?.length}/>}
          </Grid>
          <Grid item xl={3} md={4} xs={12}>
            {currentUser?.role === "admin" && <CardHelpDesksConcluidos numberOfCompleted={completedHelpDesks.length}/>}
          </Grid>
          <Grid item xl={3} md={4} xs={12}>
            {currentUser?.role === "admin" && <CardHelpDesksEmAndamento quantityInProgress={helpDesksInProgress.length}/>}
          </Grid>
          <Grid item xl={3} md={6} xs={12}>
            {currentUser?.role === "admin" && <CardCategoriaMaisRepetida maxCategory={maxCategory!}/>}
          </Grid>
          <Grid item xl={3} md={12} xs={12}>
            {currentUser?.role === "admin" && <CardHelpDesksAssumidos />}
          </Grid>
        </Grid>
      </Box>
    </DefaultLayout>)
}

export default Dashboard
