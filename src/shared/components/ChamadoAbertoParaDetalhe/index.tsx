/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChamadosService } from '../../services/api/Chamados/ChamadosServices'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Skeleton,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { BsFillImageFill } from 'react-icons/bs'

export const ChamadoAbertoParaDetalhe: React.FC = () => {
  const { id = 'novo' } = useParams<'id'>()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [categoria, setCategoria] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')
  const [autor, setAutor] = useState<string>('')
  const [setor, setSetor] = useState<string>('')

  const [publishedAt, setPublishedAt] = useState<number>(0)

  const navigate = useNavigate()

  const theme = useTheme()

  useEffect(() => {
    if (id !== 'novo') {
      setIsLoading(true)

      ChamadosService.getById(Number(id)).then((result) => {
        setIsLoading(false)
        if (result instanceof Error) {
          alert(result.message)
          navigate('/abrir-chamado')
        } else {
          setCategoria(result.categoria)
          setDescricao(result.descricao)
          setPublishedAt(Number(result.publishedAt))
          setAutor(result.author)
          setSetor(result.setor)
        }
      })
    }
  }, [id, navigate])

  return (
    <>
      <Box
        padding={5}
        borderRadius={1}
        margin={1}
        width="auto"
        border="1px solid"
        height="57vh"
        borderColor={theme.palette.divider}
      >
        <Box display="flex" justifyContent="space-between" paddingBottom={2}>
          <Box>
            {isLoading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: '1.5rem' }}
                width="200px"
              />
            ) : (
              <Typography variant="h5" sx={{ fontSize: '1rem' }}>
                {autor}
              </Typography>
            )}

            {isLoading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: '1.5rem' }}
                width="50px"
              />
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '0.8rem' }}
              >
                {setor}
              </Typography>
            )}
          </Box>
          <time>
            {isLoading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: '1.5rem' }}
                width="90px"
              />
            ) : (
              <Typography
                variant="body2"
                sx={{ fontSize: '0.8rem' }}
                color="text.secondary"
              >
                há 20 horas
              </Typography>
            )}
          </time>
        </Box>
        <Divider />

        <Box paddingY={2} marginLeft={0}>
          {isLoading ? (
            <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width="90px" />
          ) : (
            <Chip label={categoria} size="small" color="default" />
          )}
        </Box>

        <Box>
          {isLoading ? (
            <Skeleton
              variant="rounded"
              sx={{ fontSize: '1.5rem' }}
              width="100%"
              height="100px"
            />
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ paddingBottom: '40px' }}
            >
              {descricao}
            </Typography>
          )}
          <Divider />
          <Box display="flex" gap="10px">
            <Card
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '300px',
                marginY: '30px',
                height: '70px',
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flex: '1',
                  alignItems: 'center',
                  paddingBottom: '0px',
                  gap: '10px',
                  height: 'max-content',
                }}
              >
                <CardMedia>
                  <BsFillImageFill size={35} color="secondary" />
                </CardMedia>
                <Box display="flex" flexDirection="column">
                  <Typography>WhatsApp-0975939-img.JPG</Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: '0.8rem' }}
                    color="text.secondary"
                  >
                    64kb
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            <Card
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '300px',
                marginY: '30px',
                height: '70px',
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flex: '1',
                  alignItems: 'center',
                  paddingBottom: '0px',
                  gap: '10px',
                  height: 'max-content',
                }}
              >
                <CardMedia>
                  <BsFillImageFill size={35} color="secondary" />
                </CardMedia>
                <Box display="flex" flexDirection="column">
                  <Typography>WhatsApp-0975939-img.JPG</Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: '0.8rem' }}
                    color="text.secondary"
                  >
                    64kb
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  )
}
