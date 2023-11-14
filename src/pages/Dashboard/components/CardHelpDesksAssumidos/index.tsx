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
import HelpDeskProps from '../../../../shared/types/helpdeskType'

interface HelpDeskDashboardList {
  id: string
  title: string
  description: string
  status: string
  createdAt: string
  to: string
}

export const CardHelpDesksAssumidos: React.FC = () => {
  const { data } = useFetch('http://10.152.7.151:3545/helpdesk')
  const { user } = useUserContext()

  const currentUser = user

  const accountable = data?.filter((helpdesk: HelpDeskProps) => {
    return helpdesk.accountable === currentUser?.name
  })

  return (
    <Card elevation={0} variant="outlined">
      <CardContent>
        <Box display={'flex'} gap={'10px'} alignItems={'center'}>
          <HiCollection size={35} />
          <Box display={'flex'} flexDirection={'column'}>
            <Typography variant="h6">HelpDesks assumidos</Typography>
            <Typography variant="body2">
              Todos os chamados assumidos por você irão aparecer aqui.
            </Typography>
          </Box>
        </Box>
        <Box
          height={'200px'}
          overflow={'auto'}
          display={'flex'}
          flexDirection={'column'}
        >
          <List>
            {accountable?.map((helpdesk: HelpDeskDashboardList) => {
              return (
                <ListItem key={helpdesk.id} disablePadding>
                  <HelpDeskList
                    title={helpdesk.title}
                    description={helpdesk.description}
                    status={helpdesk.status}
                    createdAt={helpdesk.createdAt}
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
