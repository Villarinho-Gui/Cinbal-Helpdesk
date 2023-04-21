import {
  Box,
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React, { ReactNode } from 'react'

import { GiHamburgerMenu } from 'react-icons/gi'
import { useDrawerContext } from '../../contexts/DrawerContext'

import { BsMoonFill } from 'react-icons/bs'
import { useAppThemeContext } from '../../contexts/ThemeContext'
interface IDefaultLayoutProps {
  children: React.ReactNode
  tituloPagina: string
  barraDeFerramentas?: ReactNode

  mostrarBotaoTema?: boolean
  mostrarTituloPagina?: boolean
}

const DefaultLayout: React.FC<IDefaultLayoutProps> = ({
  children,
  tituloPagina,
  barraDeFerramentas,
  mostrarBotaoTema,

  mostrarTituloPagina = true,
}) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const { toggleDrawerOpen } = useDrawerContext()
  const { toggleTheme } = useAppThemeContext()

  return (
    <Box height="98%" display="flex" flexDirection="column" gap={1}>
      <Box
        padding={1}
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
        display="flex"
        alignItems="center"
        gap={2}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>
              <GiHamburgerMenu />
            </Icon>
          </IconButton>
        )}

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          {mostrarTituloPagina && (
            <Typography
              variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
              component="h4"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="elipses"
            >
              {tituloPagina}
            </Typography>
          )}

          {mostrarBotaoTema && (
            <IconButton
              size="small"
              sx={{ height: '35px', position: 'relative', right: '20px' }}
              onClick={toggleTheme}
            >
              <Icon>
                <BsMoonFill />
              </Icon>
            </IconButton>
          )}
        </Box>
      </Box>
      {barraDeFerramentas && <Box>{barraDeFerramentas}</Box>}
      <Box flex={1} overflow="auto">
        {children}{' '}
      </Box>
    </Box>
  )
}

export default DefaultLayout
