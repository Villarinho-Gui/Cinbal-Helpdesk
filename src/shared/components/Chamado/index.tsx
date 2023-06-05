/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Skeleton,
  Typography,
  Icon,
  Chip,
  Tooltip,
  Badge,
  ListItemButton,
} from '@mui/material'
import Zoom from '@mui/material/Zoom'
import React, { useState, useEffect } from 'react'

import { FiPaperclip } from 'react-icons/fi'
import { RiTimer2Line } from 'react-icons/ri'
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom'

import api from '../../../service/api/config/configApi'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

interface FileProps {
  id: string
  url: string
  callId: string
}
export interface HelpDeskDataProps {
  id: string
  author?: string
  title: string
  category?: string
  description: string
  maxLines: number
  files?: FileProps[]
  createdAt: Date
  onClick?: () => void
  to: string
}
export const Chamado: React.FC<HelpDeskDataProps> = ({
  id,
  author,
  description,
  createdAt,
  title,
  onClick,
  to,
}) => {
  const [, setHelpDeskData] = useState<HelpDeskDataProps | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState<string[]>([])

  const navigate = useNavigate()

  const descriptionStyle = {
    height: '35px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  }

  const fetchChamado = async () => {
    setIsLoading(true)
    try {
      const response = await api.get<HelpDeskDataProps>(`/chamado/${id}`)
      const { data } = response
      setHelpDeskData(data)
      setAttachedFiles(Object.values(data)[0].files)
      setIsLoading(false)
    } catch (error) {
      console.error('Erro ao obter os dados do chamado', error)
      setIsLoading(false)
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
          height: '150px',
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
              sx={{ fontSize: '14px' }}
              color="text.secondary"
            >
              {author}
            </Typography>
            <time
              title={createdAt ? publishedDateFormatted() : ''}
              dateTime={createdAt ? createdAt.toISOString() : ''}
            >
              {isLoading ? (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1.5rem' }}
                  width="90px"
                />
              ) : createdAt ? (
                <Typography
                  variant="body2"
                  sx={{ fontSize: '0.8rem' }}
                  color="text.secondary"
                >
                  {publishedDateRelativeToNow()}
                </Typography>
              ) : null}
            </time>
          </Box>
          <Typography
            variant="h6"
            color="text.primary"
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
                  <FiPaperclip size={15} color="#49B3E8" />
                </Icon>
              ) : (
                ''
              )}
            </Badge>

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
        </CardContent>
      </Card>
    </CardActionArea>
  )
}
