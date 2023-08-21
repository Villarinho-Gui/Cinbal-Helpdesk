import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
} from '@mui/material'
import React from 'react'
import { useFetch } from '../../../../shared/hooks/useFetch'
import { HiCollection } from 'react-icons/hi'
import { HelpDeskList } from './components/HelpDeskList'
import { useUserContext } from '../../../../shared/contexts/userContext'
import { HelpDeskListProp } from '../../../../shared/types/helpdeskType'

export const CardExibicaoMeusChamados: React.FC = () => {
  const { data } = useFetch('http://localhost:3535/helpdesk')
  const { user } = useUserContext()

  const currentUser = user

  const filteredHelpDeskListByUser = data?.filter(
    (helpDesk: HelpDeskListProp) => {
      return helpDesk.user.name === currentUser?.name
    },
  )

  return (
    <Card elevation={0} variant="outlined">
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Box display={'flex'} gap={'10px'} alignItems={'center'}>
          <HiCollection size={35} />
          <Box display={'flex'} flexDirection={'column'}>
            <Typography variant="h6">Meus Chamados</Typography>
            <Typography variant="body2">
              Chamados que você abriu estarão disponíveis aqui
            </Typography>
          </Box>
        </Box>
        <Box height={'200px'} overflow={'auto'}>
          <List>
            {currentUser?.role === 'admin'
              ? data?.map((helpdesk: HelpDeskListProp) => {
                  return (
                    <ListItem key={helpdesk.id} disablePadding>
                      <HelpDeskList
                        title={helpdesk.title}
                        description={helpdesk.description}
                        status={helpdesk.status}
                        to={`/home/chamado/detalhe/${helpdesk.id}`}
                      />
                    </ListItem>
                  )
                })
              : filteredHelpDeskListByUser.map((helpdesk: HelpDeskListProp) => {
                  return (
                    <ListItem key={helpdesk.id} disablePadding>
                      <HelpDeskList
                        title={helpdesk.title}
                        description={helpdesk.description}
                        status={helpdesk.status}
                        to={`/home/chamado/detalhe/${helpdesk.id}`}
                      />
                    </ListItem>
                  )
                })}
          </List>
        </Box>
      </CardContent>
    </Card>
  )
}
