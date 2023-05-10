/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import DefaultLayout from '../../shared/layouts/DefaultLayout'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'

import { useNavigate, useParams } from 'react-router-dom'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { BarraFerramentasAbrirNovoChamado } from '../../shared/components/BarraFerramentasAbrirNovoChamado'
import { useForm } from 'react-hook-form'
import api from '../../service/api/config/configApi'

interface IFormData {
  titulo: string
  categoria: string
  descricao: string
}

const formValidationSchema = yup
  .object({
    titulo: yup
      .string()
      .required('Esse campo precisa ser preenchido')
      .min(3, 'Deve ter no mínimo 3 caracteres')
      .max(50, 'Deve conter no máximo 50 caracteres'),
    categoria: yup.string().required('Esse campo precisa ser preenchido'),
    descricao: yup
      .string()
      .required('Esse campo precisa ser preenchido')
      .min(3, 'Deve ter no mínimo 3 caracteres')
      .max(300, 'Deve conter no máximo 300 caracteres'),
  })
  .required()

const AbrirChamado: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { id = 'novo' } = useParams<'id'>()

  const theme = useTheme()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(formValidationSchema),
    defaultValues: {
      titulo: '',
      categoria: '',
      descricao: '',
    },
  })

  const createUser = async (data: IFormData) => {
    setIsLoading(false)
    const formData = new FormData()

    formData.append('titulo', data.titulo)
    formData.append('categoria', data.categoria)
    formData.append('descricao', data.descricao)

    const headers = {
      headers: {
        'content-type': 'application/json',
      },
    }
    try {
      await api.post<IFormData>('/', formData, headers).then(() => {
        navigate('/login')
      })
    } catch (error) {
      console.log(error)
    }
    setIsLoading(true)
  }

  return (
    <DefaultLayout
      tituloPagina="Abrir Chamado"
      mostrarBotaoTema
      mostrarBotaoLogout
      mostrarBotaoPerfil
      barraDeFerramentas={
        <BarraFerramentasAbrirNovoChamado
          mostrarBotaoAnexarArquivo
          aoClicarEmAnexar={() => {}}
        />
      }
    >
      <Box
        borderRadius={1}
        margin={1}
        width="auto"
        border="1px solid"
        borderColor={theme.palette.divider}
      >
        <form
          id="form-cadastro"
          onSubmit={handleSubmit(createUser)}
          method="POST"
        >
          <Grid
            container
            direction="column"
            padding={10}
            spacing={2}
            sx={{
              [theme.breakpoints.down('sm')]: {
                padding: '30px',
              },
            }}
          >
            <Grid container item lg={6} spacing={2}>
              <Grid item lg={12} sm={12} xs={12} xl={6}>
                <TextField
                  {...register('titulo')}
                  name="titulo"
                  type="text"
                  placeholder="Título"
                  // value={titulo}
                  // onChange={(e) => setNomeCompleto(e.target.value)}
                  error={!!errors.titulo}
                  helperText={
                    <Typography variant="body2" color="error">
                      {errors.titulo && <span>{errors.titulo?.message}</span>}
                    </Typography>
                  }
                  autoComplete="off"
                  fullWidth
                  size="medium"
                />
              </Grid>
              <Grid item lg={12} sm={12} xs={12} xl={4}>
                <TextField
                  {...register('categoria')}
                  name="categoria"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.categoria}
                  helperText={
                    <Typography variant="body2" color="error">
                      {errors.categoria && (
                        <span>{errors.categoria?.message}</span>
                      )}
                    </Typography>
                  }
                  type="text"
                  placeholder="Categoria"
                  size="medium"
                  fullWidth
                />
              </Grid>
              <Grid item lg={12} sm={12} xs={12} xl={10}>
                <TextField
                  {...register('descricao')}
                  name="descricao"
                  error={!!errors.descricao}
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  helperText={
                    <Typography variant="body2" color="error">
                      {errors.descricao && (
                        <span>{errors.descricao?.message}</span>
                      )}
                    </Typography>
                  }
                  multiline
                  rows={5}
                  type="text"
                  placeholder="Senha"
                  autoComplete="off"
                  fullWidth
                  size="small"
                />
              </Grid>

              <Grid container item lg={6} sm={12} xs={12} spacing={2}>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    disableElevation
                    disabled={isLoading}
                    sx={{
                      width: '100%',
                      marginBottom: '10px',
                      [theme.breakpoints.down('lg')]: { marginBottom: '0px' },
                    }}
                    endIcon={
                      isLoading ? (
                        <CircularProgress
                          variant="indeterminate"
                          color="inherit"
                          size={20}
                          sx={{ alignSelf: 'end' }}
                        />
                      ) : undefined
                    }
                  >
                    {isLoading ? 'Enviando...' : 'Enviar Chamado'}
                  </Button>
                  {/* <Snackbar
                    open={openSuccessMessage}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <Alert severity="success" onClose={handleClose}>
                      Usuário ou senha incorretos
                    </Alert>
                  </Snackbar> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </DefaultLayout>
  )
}

export default AbrirChamado
