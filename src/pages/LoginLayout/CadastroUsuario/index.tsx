import React, { useState } from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import api from '../../../service/api/config/configApi'

import {
  Button,
  Typography,
  TextField,
  CircularProgress,
  Grid,
  Divider,
  useTheme,
} from '@mui/material'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

interface ICadastroUsuario {
  nome: string
  email: string
  ramal: string
  funcao: string
  setor: string
  filial: string
  password: string
}

const createUserFormSchema = yup
  .object()
  .shape({
    nome: yup.string().required().min(3).max(50),
    email: yup.string().email().required(),
    ramal: yup.string().required().min(2).max(5),
    funcao: yup.string().required(),
    setor: yup.string().required(),
    filial: yup.string().required(),
    password: yup
      .string()
      .required('Esse campo precisa ser preenchido!')
      .min(6, 'Deve ter no mínimo 6 caracteres')
      .max(8, 'Deve ter no mínimo 8 caracteres'),
  })
  .required()

export const CadastroUsuario: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const theme = useTheme()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICadastroUsuario>({
    resolver: yupResolver(createUserFormSchema),
    defaultValues: {
      nome: '',
      email: '',
      password: '',
      ramal: '',
      funcao: '',
      setor: '',
      filial: '',
    },
  })

  console.log(errors)

  const createUser: SubmitHandler<ICadastroUsuario> = async (data, event) => {
    event?.preventDefault()
    setIsLoading(false)
    const formData = new FormData()

    formData.append('nome', data.nome)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('ramal', data.ramal)
    formData.append('funcao', data.funcao)
    formData.append('setor', data.setor)
    formData.append('filial', data.filial)

    const headers = {
      headers: {
        'content-type': 'application/json',
      },
    }

    await api
      .post<ICadastroUsuario>('/login/cadastro', formData, headers)
      .then((response) => {
        console.log(response)
        setIsLoading(true)
        navigate('/login')
      })
  }

  return (
    <form id="form-cadastro" onSubmit={handleSubmit(createUser)} method="POST">
      <Grid
        container
        direction="column"
        padding={20}
        spacing={2}
        sx={{
          [theme.breakpoints.down('sm')]: {
            padding: '30px',
          },
        }}
      >
        <Grid container item lg={6} spacing={2}>
          <Grid item lg={12} sm={12} xs={12}>
            <Typography
              variant="h5"
              sx={{ marginBottom: '5px', fontWeight: '400', fontSize: '16px' }}
            >
              Dados do colaborador
            </Typography>
            <Divider sx={{ marginBottom: '10px' }} />
            <TextField
              {...register('nome')}
              name="nome"
              error={!!errors.nome}
              helperText={
                <Typography variant="body2" color="error">
                  {errors.nome && <span>{errors.nome?.message}</span>}
                </Typography>
              }
              type="text"
              placeholder="Nome completo"
              autoComplete="username"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item lg={12} sm={12} xs={12}>
            <TextField
              {...register('email')}
              name="email"
              error={!!errors.email}
              helperText={
                <Typography variant="body2" color="error">
                  {errors.email && <span>{errors.email?.message}</span>}
                </Typography>
              }
              type="email"
              placeholder="E-mail"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item lg={12} sm={12} xs={12}>
            <TextField
              {...register('password')}
              name="password"
              error={!!errors.password}
              helperText={
                <Typography variant="body2" color="error">
                  {errors.password && <span>{errors.password?.message}</span>}
                </Typography>
              }
              type="password"
              placeholder="Senha"
              autoComplete="current-password"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item lg={12} sm={12} xs={12}>
            <Typography
              variant="h5"
              sx={{ marginBottom: '5px', fontWeight: '400', fontSize: '16px' }}
            >
              Informações profissionais da Cinbal
            </Typography>
            <Divider sx={{ marginBottom: '10px' }} />
            <TextField
              {...register('funcao')}
              name="funcao"
              error={!!errors.funcao}
              helperText={
                <Typography variant="body2" color="error">
                  {errors.funcao && <span>{errors.funcao?.message}</span>}
                </Typography>
              }
              type="text"
              placeholder="Função"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item lg={12} sm={12} xs={12}>
            <TextField
              {...register('setor')}
              name="setor"
              error={!!errors.setor}
              helperText={
                <Typography variant="body2" color="error">
                  {errors.setor && <span>{errors.setor?.message}</span>}
                </Typography>
              }
              type="text"
              placeholder="Setor"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid
            item
            container
            direction={'row'}
            lg={12}
            sm={12}
            xs={12}
            spacing={2}
          >
            <Grid item lg={6} xs={12}>
              <TextField
                {...register('ramal')}
                name="ramal"
                error={!!errors.ramal}
                helperText={
                  <Typography variant="body2" color="error">
                    {errors.ramal && <span>{errors.ramal?.message}</span>}
                  </Typography>
                }
                type="tel"
                placeholder="Ramal"
                fullWidth
                inputMode="numeric"
                size="small"
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextField
                {...register('filial')}
                name="filial"
                error={!!errors.filial}
                helperText={
                  <Typography variant="body2" color="error">
                    {errors.filial && <span>{errors.filial?.message}</span>}
                  </Typography>
                }
                type="text"
                placeholder="Filial"
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
          <Grid container item lg={6} sm={12} xs={12} spacing={2}>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <Button
                type="submit"
                variant="contained"
                disableElevation
                sx={{
                  width: '100%',
                  marginBottom: '10px',
                  [theme.breakpoints.down('sm')]: { marginBottom: '0px' },
                }}
                endIcon={
                  isLoading && <CircularProgress variant="indeterminate" />
                }
              >
                cadastrar
              </Button>
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <Button
                type="submit"
                variant="outlined"
                sx={{ width: '100%' }}
                onClick={() => navigate('/login')}
              >
                Voltar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}
