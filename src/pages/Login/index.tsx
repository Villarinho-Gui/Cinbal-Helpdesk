import * as React from 'react'
import { AppContainer } from './styles'

import loginImage from '../../media/images/login.svg'
import ouvidoria from '../../media/images/ouvidoria.png'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  // CircularProgress,
  Paper,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
// import { useAuthContext } from '../../contexts/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import * as yup from 'yup'
// interface ILoginProps {
//   children: React.ReactNode
// }

// const loginSchema = yup
//   .object({
//     email: yup.string().required('Esse campo precisa ser preenchido').email(),
//     password: yup
//       .string()
//       .required('Esse campo precisa ser preenchido')
//       .min(5, 'Esse campo precisa de pelo menos 5 caracteres'),
//   })
//   .required()

export const Login: React.FC = () => {
  // const { isAuthenticated, login } = useAuthContext()

  // const [isLoading, setIsLoading] = useState(false)

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const theme = useTheme()

  const navigate = useNavigate()

  // if (isAuthenticated) return <>{children}</>

  // const triggerSubmit = () => {
  //   setIsLoading(true)
  //   loginSchema
  //     .validate({ email, password }, { abortEarly: false })
  //     .then((dadosValidados) => {
  //       setIsLoading(true)

  //       login(dadosValidados.email, dadosValidados.password).then(() => {
  //         setIsLoading(false)
  //       })
  //     })
  //     .catch((errors: yup.ValidationError) => {
  //       setIsLoading(false)

  //       errors.inner.forEach((error) => {
  //         if (error.path === 'email') {
  //           setEmailError(error.message)
  //         } else if (error.path === 'password') {
  //           setPasswordError(error.message)
  //         }
  //       })
  //     })
  // }

  return (
    <AppContainer>
      <Box className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <Typography variant="h5" color="#fff">
              Bem-vindo à sua Incoflandres!
            </Typography>
            <Typography variant="body2" color="#fff">
              “A única maneira de alcançar o <br />
              impossível é acreditar que é possível.”
              <br />– Charles Kingsleigh
            </Typography>
          </div>
          <img
            src={loginImage}
            className="image"
            height={388}
            width={562}
            alt=""
          />
        </div>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          margin="auto"
          width="100%"
          height="100%"
        >
          <Typography variant="h6" align="center" sx={{ marginBottom: '10px' }}>
            Bem vindo(a) ao seu HelpDesk!
          </Typography>
          <Card
            elevation={0}
            component={Paper}
            background-color={theme.palette.background.default}
          >
            <CardContent>
              <Box display="flex" flexDirection="column" gap={2} width="300px">
                <TextField
                  fullWidth
                  label="Usuário"
                  type="email "
                  value={email}
                  // disabled={isLoading}
                  error={!!emailError}
                  helperText={emailError}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={() => setEmailError('')}
                />
                <TextField
                  fullWidth
                  label="Senha"
                  type="password"
                  value={password}
                  // disabled={isLoading}
                  error={!!passwordError}
                  helperText={passwordError}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={() => setPasswordError('')}
                />
              </Box>
            </CardContent>
            <CardActions>
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                flexDirection="column"
                margin={1}
                gap={1}
              >
                <Button
                  variant="contained"
                  type="submit"
                  disableElevation
                  onClick={() => navigate('/home')}
                  // onClick={triggerSubmit}
                  // disabled={isLoading}
                  // endIcon={
                  //   isLoading ? (
                  //     <CircularProgress
                  //       variant="indeterminate"
                  //       color="inherit"
                  //       size={20}
                  //       sx={{ alignSelf: 'end' }}
                  //     />
                  //   ) : undefined
                  // }
                >
                  Entrar
                </Button>

                <Button
                  variant="outlined"
                  type="submit"
                  disableElevation
                  onClick={() => navigate('/cadastro')}
                >
                  Cadastrar
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Box>

        <Tooltip title="Ouvidoria">
          <button
            className="ouvidoria"
            onClick={() =>
              window.open('https://relatoconfidencial.com.br/cinbal/', '_blank')
            }
          >
            <img src={ouvidoria} alt="Ouvidoria" />
          </button>
        </Tooltip>
      </Box>
    </AppContainer>
  )
}
