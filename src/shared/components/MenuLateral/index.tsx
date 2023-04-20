/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-duplicates */
import React from 'react'

import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material'
import { useDrawerContext } from '../../contexts/DrawerContext'
import { ListagemDeChamados } from '../ListagemDeChamados'
import { useAppThemeContext } from '../../contexts/ThemeContext'
import logoDarkMode from '../../../media/images/logo-full.png'
import logoLightMode from '../../../media/images/logo2-full.png'
interface IMenuLateralChildrenConfig {
  children: React.ReactNode
}

export const MenuLateral: React.FC<IMenuLateralChildrenConfig> = ({
  children,
}) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext()
  const { themeName } = useAppThemeContext()

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? 'temporary' : 'permanent'}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(52)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          {themeName === 'light' ? (
            <img
              src={logoLightMode}
              alt="Cinbal Help Desk Logo"
              height={57}
              width={130}
            />
          ) : (
            <img src={logoDarkMode} height={57} width={130} />
          )}
          <ListagemDeChamados />
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(53)}>
        {children}
      </Box>
    </>
  )
}
