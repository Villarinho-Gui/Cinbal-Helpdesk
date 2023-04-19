import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
} from '@mui/material'
import React from 'react'
import { IListagemChamados } from '../../services/api/Chamados/ChamadosServices'

import { MdImage } from 'react-icons/md'

export const Chamado: React.FC<IListagemChamados> = ({
  titulo,
  categoria,
  descricao,
  maxLines = 2,
}) => {
  const descriptionStyle = {
    height: '30px',
    display: '-webkit-box',
    WebkitLineClamp: maxLines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  }

  return (
    <Card
      variant="outlined"
      sx={{
        width: '100%',
        height: 'max-content',
        display: 'flex',
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h5" sx={{ fontSize: 14, padding: '10px' }}>
          {titulo}
        </Typography>
        <Chip
          label={categoria}
          variant="filled"
          color="primary"
          size="small"
          sx={{ marginLeft: 1 }}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          padding={1}
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
            sx={{ marginLeft: 1, marginY: 1 }}
          />
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
            sx={{ marginLeft: 1, marginY: 1 }}
          />
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
            sx={{ marginLeft: 1, marginY: 1 }}
          />
        </Box>
        <Divider />

        <Button variant="outlined" sx={{ position: 'relative', top: '10px' }}>
          Visualizar
        </Button>
      </CardContent>
    </Card>
  )
}
