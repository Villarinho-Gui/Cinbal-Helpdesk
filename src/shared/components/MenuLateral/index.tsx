/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-duplicates */
import React, { memo } from 'react'

import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material'
import { useDrawerContext } from '../../contexts/DrawerContext'
import { ListagemDeChamados } from '../ListagemDeChamados'
import { Outlet } from 'react-router-dom'

const MenuLateral: React.FC = () => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext()

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
          height="100vh"
          display="flex"
          flexDirection="column"
        >
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
