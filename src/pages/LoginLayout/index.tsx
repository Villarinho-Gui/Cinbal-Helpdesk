import * as React from 'react'
import { AppContainer } from './styles'

import loginImage from '../../media/images/login.svg'
import ouvidoria from '../../media/images/flandericoouvidoria.png'
import {
  Box,

  // CircularProgress,
  Tooltip,
  Typography,
} from '@mui/material'
// import { useAuthContext } from '../../contexts/AuthContext'
import { Outlet } from 'react-router-dom'
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

export const LoginLayout: React.FC = () => {
  // const { isAuthenticated, login } = useAuthContext()

  // const [isLoading, setIsLoading] = useState(false)

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

        <Outlet />

        <Tooltip title="Ouvidoria" placement="top" arrow>
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
