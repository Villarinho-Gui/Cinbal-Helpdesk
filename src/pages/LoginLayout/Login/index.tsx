import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Typography, TextField, Button, useTheme } from '@mui/material'

import logo from '../../../media/images/logo2-full.png'

export const Login: React.FC = () => {
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const theme = useTheme()

  const navigate = useNavigate()
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      margin={'auto'}
      width={'70%'}
      maxWidth={'600px'}
      padding={'20px'}
      gap={'20px'}
      boxSizing={'border-box'}
      sx={{
        [theme.breakpoints.down('sm')]: {
          width: '100%',
        },
      }}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        width={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={2}
      >
        <img src={logo} height={60} alt="Cinbal App" />
        <Typography>Bem vindo(a) ao seu HelpDesk!</Typography>
      </Box>

      <form
        // bgcolor={theme.palette.background.default}
        // display={'flex'}
        // flex={'1'}
        // flexDirection={'column'}
        // width={'70%'}
        // gap={2}
        style={{
          display: 'flex',
          flex: '1',
          flexDirection: 'column',
          width: '70%',
          gap: '8px',
        }}
        id="form-login"
      >
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
      </form>

      <Box
        width="70%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
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
    </Box>
  )
}
