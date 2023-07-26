/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-duplicates */
import React, { memo } from 'react'

import { Box, Drawer, Link, useMediaQuery, useTheme } from '@mui/material'
import { useDrawerContext } from '../../contexts/DrawerContext'
import ListagemDeChamados from '../ListagemDeChamados'
import { useAppThemeContext } from '../../contexts/ThemeContext'
import logoDarkMode from '../../../media/images/logo-full.png'
import logoLightMode from '../../../media/images/logo2-full.png'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const MenuLateral: React.FC = () => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext()
  const { themeName } = useAppThemeContext()

  const navigate = useNavigate()

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? 'temporary' : 'permanent'}
        onClose={toggleDrawerOpen}
        sx={{ overflow: 'hidden' }}
      >
        <Box
          width={theme.spacing(50)}
          height="94vh"
          display="flex"
          flexDirection="column"
        >
          <Box
            position={'relative'}
            top="40px"
            left="110px"
            width="max-content"
          >
            {themeName === 'light' ? (
              <Link
                component="button"
                onClick={() => navigate('/home/dashboard')}
              >
                <img
                  src={logoLightMode}
                  alt="Cinbal Help Desk Logo"
                  height={57}
                  width={130}
                />
              </Link>
            ) : (
              <Link
                component="button"
                onClick={() => navigate('/home/dashboard')}
              >
                <img src={logoDarkMode} height={57} width={130} />
              </Link>
            )}
          </Box>
          <ListagemDeChamados />
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(50)}>
        <Outlet />
      </Box>
    </>
  )
}

export default memo(MenuLateral)
