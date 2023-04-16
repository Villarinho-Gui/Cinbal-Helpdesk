/* eslint-disable import/no-duplicates */
import React from 'react'

import { Box, Drawer, List, ListItemButton, useTheme } from '@mui/material'
import Chamado from '../Chamado'

interface IMenuLateralChildrenConfig {
  children: React.ReactNode
}

export const MenuLateral: React.FC<IMenuLateralChildrenConfig> = ({
  children,
}) => {
  const theme = useTheme()

  return (
    <>
      <Drawer variant="permanent">
        <Box
          width={theme.spacing(28)}
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
              <ListItemButton>
                <Chamado />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={theme.spacing(28)}>
        {children}
      </Box>
    </>
  )
}
