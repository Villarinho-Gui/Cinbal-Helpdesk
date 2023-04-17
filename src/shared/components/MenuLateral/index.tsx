/* eslint-disable import/no-duplicates */
import React from 'react'

import { Box, Drawer, List, useMediaQuery, useTheme } from '@mui/material'

import Chamado from '../Chamado'
import { useDrawerContext } from '../../contexts/DrawerContext'
// import { useAppThemeContext } from "../../contexts/ThemeContext";

// import logo from "../../../media/images/logo.png";
// import logo2 from "../../../media/images/logo2.png";
interface IMenuLateralChildrenConfig {
  children: React.ReactNode
}

// const { themeName } = useAppThemeContext();

export const MenuLateral: React.FC<IMenuLateralChildrenConfig> = ({
  children,
}) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const { isDrawerOpen, toggleDrawerOpen, chamadoAberto } = useDrawerContext()

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? 'temporary' : 'permanent'}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(45)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            margin={3}
            padding={2}
            height={theme.spacing(20)}
            display={'flex'}
            alignItems={'start'}
            justifyContent={'top'}
          >
            <img
              src="https://cinbal-apps.vercel.app/assets/logo2-full-cbb1a1b4.png"
              alt="Cinbal Help Desk Logo"
              height={60}
              width={130}
            />
          </Box>
          <Box flex={1}>
            <List component="nav">
              {chamadoAberto.map((chamado) => {
                return (
                  <Chamado
                    key={chamado.description}
                    category={chamado.category}
                    title={chamado.title}
                    description={chamado.description}
                    onCLick={smDown ? toggleDrawerOpen : undefined}
                    to={'/chamado-aberto'}
                  />
                )
              })}
            </List>
          </Box>
          q
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(46)}>
        {children}
      </Box>
    </>
  )
}
