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
import React, { useState, useEffect } from 'react'

import { FiPaperclip } from 'react-icons/fi'
import { RiTimer2Line } from 'react-icons/ri'
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom'

import api from '../../../service/api/config/configApi'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export interface HelpDeskDataProps {
  id: string
  author: string
  title: string
  category?: string
  description: string
  maxLines: number
  files?: File[]
  count_files?: number
  createdAt: Date
  onClick?: () => void
  to: string
}
export const Chamado: React.FC<HelpDeskDataProps> = ({
  id,
  author,
  category,
  description,
  createdAt,
  title,
  onClick,
  to,
}) => {
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])

  const navigate = useNavigate()

  const descriptionStyle = {
    height: '35px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  }

  const token = localStorage.getItem('access_token')

  const fetchChamado = async () => {
    try {
      const response = await api.get<HelpDeskDataProps>(`/helpdesk/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      const { data } = response
      setAttachedFiles(data.files!)
    } catch (error) {
      console.error('Erro ao obter os dados do chamado', error)
    }
  }

  useEffect(() => {
    fetchChamado()
  }, [id])

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
            sx={descriptionStyle}
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
            <Badge badgeContent={attachedFiles.length} color="primary">
              {attachedFiles && attachedFiles.length > 0 ? (
                <Icon>
                  <FiPaperclip size={15} />
                </Icon>
              ) : (
                ''
              )}
            </Badge>

            {attachedFiles && attachedFiles.length > 0 ? (
              <Divider
                orientation="vertical"
                flexItem
                sx={{ marginX: '15px' }}
              />
            ) : (
              ''
            )}

            <Box display={'flex'} flex={1} justifyContent={'space-between'}>
              <Typography color={'#49B3E8'}>{category}</Typography>
              <Box
                display={'flex'}
                flex={1}
                justifyContent={'end'}
                gap={2}
                position={'relative'}
              >
                <Chip label={id} size="small" sx={{ width: '12ch' }} />
                <Tooltip title="Aberto" TransitionComponent={Zoom} arrow>
                  <Icon>
                    <RiTimer2Line color="#d3d3d3" />
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
