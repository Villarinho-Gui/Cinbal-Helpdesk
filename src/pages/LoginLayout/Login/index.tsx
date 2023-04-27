import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  TextField,
  Paper,
  Button,
  useTheme,
} from '@mui/material'

export const Login: React.FC = () => {
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const theme = useTheme()

  const navigate = useNavigate()
  return (
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
              onClick={() => navigate('/login/cadastro')}
            >
              Cadastrar
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  )
}
