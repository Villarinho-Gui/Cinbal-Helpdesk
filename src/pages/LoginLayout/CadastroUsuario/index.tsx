import React, { useState } from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import api from '../../../service/api/config/configApi'

import DefaultLayout from '../../../shared/layouts/DefaultLayout'
import {
  Box,
  useTheme,
  Grid,
  Button,
  Typography,
  TextField,
  CircularProgress,
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
    nome: yup
      .string()
      .required('Esse campo precisa ser preenchido!')
      .min(3, 'Deve ter no mínimo 3 caracteres')
      .max(50, 'Deve conter no máximo 50 caracteres'),
    email: yup
      .string()
      .email('Formato de e-mail incorreto')
      .required('Esse campo precisa ser preenchido!'),
    ramal: yup
      .string()
      .required('Esse campo precisa ser preenchido!')
      .min(2, 'Deve ter no mínimo 2 caracteres')
      .max(5, 'Deve conter no máximo 5 caracteres'),
    funcao: yup.string().required('Esse campo precisa ser preenchido!'),
    setor: yup.string().required('Esse campo precisa ser preenchido!'),
    filial: yup.string().required('Esse campo precisa ser preenchido!'),
    password: yup
      .string()
      .required('Esse campo precisa ser preenchido!')
      .min(6, 'Deve ter no mínimo 6 caracteres')
      .max(8, 'Deve ter no mínimo 8 caracteres'),
  })
  .required()

export const CadastroUsuario: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [nome, setNome] = useState('')

  const theme = useTheme()
  const navigate = useNavigate()

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
    <DefaultLayout tituloPagina={''}>
      <Box
        display="flex"
        width="70%"
        margin="auto"
        borderRadius={1}
        border="1px solid"
        borderColor={theme.palette.divider}
      >
        <form
          onSubmit={handleSubmit(createUser)}
          style={{ width: '100%' }}
          method="post"
        >
          <Grid container direction="column" padding={5} spacing={2}>
            <Grid container item lg={6} spacing={2}>
              <Grid item lg={12} sm={12} xs={12}>
                <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                  Cadastro de usuário
                </Typography>
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
                  fullWidth
                  onChange={(event) => setNome(event.target.value)}
                  value={nome}
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
                />
              </Grid>
              <Grid item lg={12} sm={12} xs={12}>
                <TextField
                  {...register('ramal')}
                  name="ramal"
                  error={!!errors.ramal}
                  helperText={
                    <Typography variant="body2" color="error">
                      {errors.ramal && <span>{errors.ramal?.message}</span>}
                    </Typography>
                  }
                  type="text"
                  placeholder="Ramal"
                  fullWidth
                />
              </Grid>
              <Grid item lg={12} sm={12} xs={12}>
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
                />
              </Grid>
              <Grid item lg={12} sm={12} xs={12}>
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
                />
              </Grid>
              <Grid container item lg={12} sm={12} xs={12}>
                <TextField
                  {...register('password')}
                  name="password"
                  error={!!errors.password}
                  helperText={
                    <Typography variant="body2" color="error">
                      {errors.password && (
                        <span>{errors.password?.message}</span>
                      )}
                    </Typography>
                  }
                  type="password"
                  placeholder="Senha"
                  fullWidth
                />
                <Button
                  type="submit"
                  variant="contained"
                  disableElevation
                  sx={{ width: '100%', marginTop: '20px' }}
                  endIcon={
                    isLoading && <CircularProgress variant="indeterminate" />
                  }
                >
                  cadastrar
                </Button>
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{ width: '100%', marginTop: '10px' }}
                  onClick={() => navigate('/login')}
                >
                  Voltar
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {}
        </form>
      </Box>
    </DefaultLayout>
  )
}
