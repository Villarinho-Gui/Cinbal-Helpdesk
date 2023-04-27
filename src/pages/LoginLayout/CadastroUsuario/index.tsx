import React, { useState } from 'react'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import DefaultLayout from '../../../shared/layouts/DefaultLayout'
import { Box, useTheme, Grid, Button, Typography } from '@mui/material'
import { VForm } from '../../../shared/Form/Vform'
import { VTextField } from '../../../shared/Form/VTextField'

const createUserFormSchema = z.object({
  name: z
    .string()
    .nonempty('Esse campo é obrigatório')
    .transform((name) => {
      return name
        .trim()
        .split(' ')
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1))
        })
        .join(' ')
    }),
  email: z
    .string()
    .email('Formato de e-mail inválido')
    .nonempty('Esse campo é obrigatório')
    .endsWith('@cinbal.com.br', 'O e-mail precisa ser da Cinbal'),
  password: z
    .string()
    .nonempty('Esse campo é obrigatório')
    .min(6, 'A senha precisar ter pelo menos 6 caracteres.'),
  ramal: z.string().nonempty('Esse campo é obrigatório'),
  role: z.string().nonempty('Esse campo é obrigatório'),
  sector: z.string().nonempty('Esse campo é obrigatório'),
  branch: z.string().nonempty('Esse campo é obrigatório'),
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

export const CadastroUsuario: React.FC = () => {
  const [output, setOutput] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })

  const theme = useTheme()
  const navigate = useNavigate()

  console.log(errors)

  function createUser(data: any) {
    setOutput(JSON.stringify(data, null, 2))
    console.log(data)
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
        <VForm onSubmit={handleSubmit(createUser)} style={{ width: '100%' }}>
          <Grid container direction="column" padding={5} spacing={2}>
            <Grid container item lg={6} spacing={2}>
              <Grid item lg={12} sm={12} xs={12}>
                <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                  Cadastro de usuário
                </Typography>
                <VTextField
                  {...register('name')}
                  name="name"
                  type="text"
                  placeholder="Nome completo"
                  fullWidth
                />
              </Grid>
              <Grid item lg={12} sm={12} xs={12}>
                <VTextField
                  {...register('email')}
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  fullWidth
                />
              </Grid>
              {errors.email && <span>{errors.email.message}</span>}
              {errors.password && <span>{errors.password.message}</span>}
              <Grid item lg={12} sm={12} xs={12}>
                <VTextField
                  {...register('ramal')}
                  name="ramal"
                  type="text"
                  placeholder="Ramal"
                  fullWidth
                />
              </Grid>
              <Grid item lg={12} sm={12} xs={12}>
                <VTextField
                  {...register('role')}
                  name="role"
                  type="text"
                  placeholder="Função"
                  fullWidth
                />
              </Grid>
              <Grid item lg={12} sm={12} xs={12}>
                <VTextField
                  {...register('sector')}
                  name="sector"
                  type="text"
                  placeholder="Setor"
                  fullWidth
                />
              </Grid>
              <Grid item lg={12} sm={12} xs={12}>
                <VTextField
                  {...register('branch')}
                  name="branch"
                  type="text"
                  placeholder="Filial"
                  fullWidth
                />
              </Grid>
              <Grid container item lg={12} sm={12} xs={12}>
                <VTextField
                  {...register('password')}
                  name="password"
                  type="password"
                  placeholder="Senha"
                  fullWidth
                />
                <Button
                  type="submit"
                  variant="contained"
                  disableElevation
                  sx={{ width: '100%', marginTop: '20px' }}
                >
                  cadastrar
                </Button>
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{ width: '100%', marginTop: '20px' }}
                  onClick={() => navigate('/login')}
                >
                  Voltar
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {}
        </VForm>

        <pre>{output}</pre>
      </Box>
    </DefaultLayout>
  )
}
