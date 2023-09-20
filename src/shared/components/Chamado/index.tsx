/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Icon,
  Chip,
  Tooltip,
  Badge,
  ListItemButton,
  Divider,
} from '@mui/material'
import Zoom from '@mui/material/Zoom'
import React, { memo } from 'react'

import { FiPaperclip } from 'react-icons/fi'
import { RiTimer2Line } from 'react-icons/ri'
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom'

import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { MdOutlineEmojiPeople } from 'react-icons/md'
import { AiFillLike } from 'react-icons/ai'
import { FaUserClock } from 'react-icons/fa'

export interface HelpDeskDataProps {
  id: string
  author: string
  status: string
  title: string
  category?: string
  description: string
  maxLines: number
  files?: File[]
  countFiles?: number
  createdAt: Date
  onClick?: () => void
  to: string
}
const Chamado: React.FC<HelpDeskDataProps> = ({
  id,
  author,
  category,
  description,
  createdAt,
  title,
  onClick,
  status,
  countFiles,
  to,
}) => {
  const navigate = useNavigate()

  const publishedDateFormatted = () => {
    return format(createdAt, "d 'de' LLLL 'às' HH:mm'h'", {
      locale: ptBR,
    })
  }

  const publishedDateRelativeToNow = () => {
    return formatDistanceToNow(createdAt, {
      locale: ptBR,
      addSuffix: true,
    })
  }

  const clickHelpDesk = () => {
    navigate(to)
    onClick?.()
  }

  const resolvedPath = useResolvedPath(to)
  const match = useMatch({ path: resolvedPath.pathname, end: false })

  return (
    <CardActionArea onClick={clickHelpDesk}>
      <Card
        variant="outlined"
        sx={{
          width: '99%',
          height: '155px',
          display: 'flex',
          flex: '1',
          marginX: 'auto',
        }}
        component={ListItemButton}
        selected={!!match}
      >
        <CardContent sx={{ flex: 1 }}>
          <Box
            bgcolor="Background.primary"
            display="flex"
            justifyContent="space-between"
          >
            <Typography
              variant="h5"
              sx={{ fontSize: '14px', marginBottom: '10px' }}
              color="text.secondary"
            >
              {author}
            </Typography>
            <time
              title={createdAt ? publishedDateFormatted() : ''}
              dateTime={createdAt ? createdAt.toISOString() : ''}
            >
              <Typography
                variant="body2"
                sx={{ fontSize: '0.8rem' }}
                color="text.secondary"
              >
                {publishedDateRelativeToNow()}
              </Typography>
            </time>
          </Box>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontSize: 14,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ height: '35px' }}
            width={'20ch'}
            noWrap
          >
            {description}
          </Typography>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Badge badgeContent={countFiles} color="primary" variant="dot">
              {countFiles! > 0 ? (
                <Icon>
                  <FiPaperclip size={15} />
                </Icon>
              ) : (
                ''
              )}
            </Badge>

            {countFiles! > 0 ? (
              <Divider
                orientation="vertical"
                flexItem
                sx={{ marginX: '15px' }}
              />
            ) : (
              ''
            )}

            <Box display={'flex'} flex={1} justifyContent={'space-between'}>
              <Chip label={category} size="small" color="primary" />

              <Box
                display={'flex'}
                alignItems={'center'}
                flex={1}
                justifyContent={'end'}
                gap={2}
                position={'relative'}
              >
                <Typography
                  variant="body2"
                  fontSize={'0.8rem'}
                  noWrap
                  width={'10ch'}
                >
                  ID:
                  {id}
                </Typography>
                <Tooltip
                  TransitionComponent={Zoom}
                  arrow
                  title={
                    status === 'Em Andamento'
                      ? 'Em andamento'
                      : status === 'Concluído'
                      ? 'Concluído'
                      : status === 'Aberto'
                      ? 'Aberto'
                      : 'Aguardando Terceiro'
                  }
                >
                  <Icon color="secondary" sx={{ marginBottom: '4px' }}>
                    {status === 'Concluído' ? (
                      <AiFillLike size={20} />
                    ) : status === 'Em Andamento' ? (
                      <MdOutlineEmojiPeople size={20} />
                    ) : status === 'Aberto' ? (
                      <RiTimer2Line size={20} />
                    ) : (
                      <FaUserClock size={20} />
                    )}
                  </Icon>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </CardActionArea>
  )
}

export default memo(Chamado)
