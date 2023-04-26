import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from '@mui/material'
import React from 'react'
import { IListagemChamados } from '../../services/api/Chamados/ChamadosServices'

import { MdImage } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

export const Chamado: React.FC<IListagemChamados> = ({
  id,
  author,
  titulo,
  categoria,
  descricao,
  publishedAt,
  maxLines = 2,
}) => {
  const descriptionStyle = {
    height: '35px',
    display: '-webkit-box',
    WebkitLineClamp: maxLines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  }

  const navigate = useNavigate()

  return (
    <CardActionArea onClick={() => navigate(`/chamado/detalhe/${id}`)}>
      <Card
        variant="outlined"
        sx={{
          width: '99%',
          height: '150px',
          display: 'flex',
          marginX: 'auto',
        }}
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
            <time dateTime={String(publishedAt)}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '14px' }}
              >
                há 20 horas
              </Typography>
            </time>
          </Box>
          <Typography
            variant="h6"
            color="text.primary"
            sx={{
              fontSize: 14,
              // padding: '10px',
              // borderRadius: '8px',
              // width: 'max-content',
              // height: '10px',
              // display: 'flex',
              // alignItems: 'center',
            }}
          >
            {titulo}
          </Typography>
          {/* <Chip
          label={categoria}
          variant="filled"
          color="primary"
          size="small"
          sx={{ marginTop: '10px' }}
        /> */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={descriptionStyle}
          >
            {' '}
            {descricao}
          </Typography>
          <Box>
            <Chip
              size="small"
              variant="outlined"
              color="primary"
              avatar={
                <Avatar>
                  <MdImage />
                </Avatar>
              }
              label="Avatar"
              sx={{ marginY: 2 }}
            />
          </Box>
        </CardContent>
      </Card>
    </CardActionArea>
  )
}
