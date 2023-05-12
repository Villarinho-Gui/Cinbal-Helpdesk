import React, { useState } from 'react'

import { useForm } from 'react-hook-form'
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
  Snackbar,
  Alert,
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
    ramal: yup.string().min(2).max(5),
    funcao: yup.string().required(),
    setor: yup.string().required(),
    filial: yup.string().required(),
    password: yup.string().required().min(6).max(8),
  })
  .required()

export const CadastroUsuario: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [nomeCompleto, setNomeCompleto] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ramal, setRamal] = useState('')
  const [funcao, setFuncao] = useState('')
  const [setor, setSetor] = useState('')
  const [filial, setFilial] = useState('')

  const [openSuccessMessage, setOpenSuccessMessage] = useState(false)

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

  const createUser = async (data: ICadastroUsuario) => {
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
    try {
      await api
        .post<ICadastroUsuario>('/login/cadastro', formData, headers)
        .then(() => {
          setOpenSuccessMessage(true)
          navigate('/login')
        })
    } catch (error) {
      console.log(error)
    }
    setIsLoading(true)
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSuccessMessage(false)
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
              type="text"
              placeholder="Nome completo"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              error={!!errors.nome}
              helperText={
                <Typography variant="body2" color="error">
                  {errors.nome && <span>{errors.nome?.message}</span>}
                </Typography>
              }
              autoComplete="username"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item lg={12} sm={12} xs={12}>
            <TextField
              {...register('email')}
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              Informações profissionais do colaborador na Cinbal
            </Typography>
            <Divider sx={{ marginBottom: '10px' }} />
            <TextField
              {...register('funcao')}
              name="funcao"
              error={!!errors.funcao}
              value={funcao}
              onChange={(e) => setFuncao(e.target.value)}
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
              value={setor}
              onChange={(e) => setSetor(e.target.value)}
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
                value={ramal}
                onChange={(e) => setRamal(e.target.value)}
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
                type="text"
                placeholder="Filial"
                value={filial}
                onChange={(e) => setFilial(e.target.value)}
                error={!!errors.filial}
                helperText={
                  <Typography variant="body2" color="error">
                    {errors.filial && <span>{errors.filial?.message}</span>}
                  </Typography>
                }
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
                {isLoading ? 'Cadastrando...' : 'Cadastrar'}
              </Button>
              <Snackbar
                open={openSuccessMessage}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <Alert severity="success" onClose={handleClose}>
                  Usuário ou senha incorretos
                </Alert>
              </Snackbar>
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
