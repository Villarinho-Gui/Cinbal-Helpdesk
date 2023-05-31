import {
  Box,
  Icon,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
} from '@mui/material'
import React, { ReactNode } from 'react'

import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdPerson } from 'react-icons/io'
import { HiSun } from 'react-icons/hi'
import { CgLogOut } from 'react-icons/cg'

import { useDrawerContext } from '../../contexts/DrawerContext'

import { BsMoonFill } from 'react-icons/bs'
import { AiFillHome, AiOutlinePlus } from 'react-icons/ai'
import { useAppThemeContext } from '../../contexts/ThemeContext'

import { useNavigate } from 'react-router-dom'
interface IDefaultLayoutProps {
  children: React.ReactNode
  tituloPagina: string | undefined
  barraDeFerramentas?: ReactNode

  mostrarBotaoLogout?: boolean
  mostrarBotaoPerfil?: boolean
  mostrarBotaoTema?: boolean
  mostrarBotaoHome?: boolean
  mostrarBotaoOpenHelpDesk?: boolean
  mostrarTituloPagina?: boolean
}

const DefaultLayout: React.FC<IDefaultLayoutProps> = ({
  children,
  tituloPagina,
  barraDeFerramentas,
  mostrarBotaoLogout,
  mostrarBotaoPerfil,
  mostrarBotaoTema,
  mostrarBotaoHome,
  mostrarBotaoOpenHelpDesk,

  mostrarTituloPagina = true,
}) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const { toggleDrawerOpen } = useDrawerContext()
  const { toggleTheme, themeName } = useAppThemeContext()

  const navigate = useNavigate()

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
              sx={{ fontSize: '1.812rem' }}
            >
              {tituloPagina}
            </Typography>
          )}

          <Box display="flex" gap={1} alignItems="center">
            {mostrarBotaoLogout && (
              <Tooltip title="Sair" placement="bottom" arrow>
                <IconButton onClick={() => navigate('/login')}>
                  <CgLogOut size={20} />
                </IconButton>
              </Tooltip>
            )}

            {mostrarBotaoHome && (
              <Tooltip title="Página Inicial" placement="bottom" arrow>
                <IconButton onClick={() => navigate('/home/dashboard')}>
                  <Icon>
                    <AiFillHome size={20} />
                  </Icon>
                </IconButton>
              </Tooltip>
            )}

            {mostrarBotaoPerfil && (
              <Tooltip title="Perfil" placement="bottom" arrow>
                <IconButton>
                  <Icon>
                    <IoMdPerson size={20} />
                  </Icon>
                </IconButton>
              </Tooltip>
            )}

            {mostrarBotaoTema && (
              <Tooltip title="Alterar Tema" placement="bottom" arrow>
                <IconButton onClick={toggleTheme}>
                  {themeName === 'dark' ? (
                    <HiSun size={20} />
                  ) : (
                    <BsMoonFill size={20} />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      </Box>
      {barraDeFerramentas && <Box>{barraDeFerramentas}</Box>}
      <Box flex={1} overflow="auto">
        {children}{' '}
      </Box>
      {mostrarBotaoOpenHelpDesk && (
        <Box display={'flex'} justifyContent={'end'} padding={'20px'}>
          <Button
            variant="contained"
            color="info"
            sx={{ position: '-webkit-sticky', right: '0px' }}
            endIcon={<AiOutlinePlus />}
            onClick={() => navigate('/home/abrir-chamado')}
          >
            Abrir novo chamado
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default DefaultLayout
