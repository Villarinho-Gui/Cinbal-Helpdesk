import {
  Box,
  Card,
  CardActionArea,
  Chip,
  Icon,
  ListItemButton,
  Typography,
} from '@mui/material'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import React from 'react'
import { AiFillLike } from 'react-icons/ai'
import { MdOutlineEmojiPeople } from 'react-icons/md'
import { RiTimer2Line } from 'react-icons/ri'
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom'

// Fazer com que seja exibida uma mensagem mostrando "Concluído em 'data de conclusão'"
interface HelpDeskDashboardList {
  title: string
  description: string
  status: string
  createdAt: string
  to: string
}

export const HelpDeskList: React.FC<HelpDeskDashboardList> = ({
  title,
  description,
  to,
  createdAt,
  status,
}) => {
  const navigate = useNavigate()

  const clickHelpDesk = () => {
    navigate(to)
  }

  const publishedDateRelativeToNow = () => {
    return formatDistanceToNow(new Date(createdAt), {
      locale: ptBR,
      addSuffix: true,
    })
  }

  const resolvedPath = useResolvedPath(to)
  const match = useMatch({ path: resolvedPath.pathname, end: false })

  const dateRelativeToNow = () => {
    const currentTime = new Date()
    const publishedDate = new Date(createdAt)

    const timeDifference = currentTime.getTime() - publishedDate.getTime()
    const calcDays = Math.floor(timeDifference / (1000 * 3600 * 24))

    return calcDays
  }

  return (
    <CardActionArea onClick={clickHelpDesk}>
      <Card
        elevation={0}
        variant="outlined"
        component={ListItemButton}
        selected={!!match}
      >
        <Icon color="secondary" sx={{ marginBottom: '4px' }}>
          {status === 'Concluído' ? (
            <AiFillLike size={17} />
          ) : status === 'Em Andamento' ? (
            <MdOutlineEmojiPeople size={17} />
          ) : (
            <RiTimer2Line size={17} />
          )}
        </Icon>
        <Box padding={1}>
          <Typography noWrap variant="h6" fontSize={16} width={'25ch'}>
            {title}
          </Typography>
          <Typography
            noWrap
            variant="body2"
            width={'25ch'}
            color="text.secondary"
          >
            {description}
          </Typography>
        </Box>

        <Box display={'flex'} justifyContent={'flex-end'} flex={1}>
          {status !== 'Concluído' && (
            <Chip
              label={publishedDateRelativeToNow()}
              size="small"
              variant="outlined"
              color={
                dateRelativeToNow() >= 5 && status === 'Em Andamento'
                  ? 'warning'
                  : 'info'
              }
            />
          )}
        </Box>
      </Card>
    </CardActionArea>
  )
}
