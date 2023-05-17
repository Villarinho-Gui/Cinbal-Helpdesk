import * as React from 'react'
import { AppContainer } from './styles'

import loginImage from '../../media/images/login.svg'
import ouvidoria from '../../media/images/flandericoouvidoria.png'
import { Box, Tooltip, Typography } from '@mui/material'

import { Outlet } from 'react-router-dom'

export const LoginLayout: React.FC = () => {
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
