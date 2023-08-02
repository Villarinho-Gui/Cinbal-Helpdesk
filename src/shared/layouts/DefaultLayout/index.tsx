import {
  Box,
  Icon,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  Card,
  CardContent,
  Menu,
} from '@mui/material'
import React, { ReactNode, memo, useCallback, useEffect, useRef } from 'react'

import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdPerson } from 'react-icons/io'
import { HiSun } from 'react-icons/hi'
import { CgLogOut } from 'react-icons/cg'

import { useDrawerContext } from '../../contexts/DrawerContext'

import { BsFillBellFill, BsMoonFill } from 'react-icons/bs'
import { AiFillHome, AiOutlinePlus } from 'react-icons/ai'
import { MdClose } from 'react-icons/md'

import { useAppThemeContext } from '../../contexts/ThemeContext'

import { useNavigate } from 'react-router-dom'
import { useUserHelpDeskContext } from '../../contexts/userContext'
import { useHelpDeskContext } from '../../contexts/HelpDeskContext'

import { RiFeedbackFill, RiMessageFill } from 'react-icons/ri'
import { MessageListProps } from '../../components/ChamadoAbertoParaDetalhe/components/Chat'
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

  showNotificationButton?: boolean
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
  showNotificationButton,

  mostrarTituloPagina = true,
}) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const { toggleDrawerOpen, isDrawerOpen } = useDrawerContext()
  const { toggleTheme, themeName } = useAppThemeContext()
  const { isNewMessage, messageNotification } = useHelpDeskContext()
  const { user, setIsLogged } = useUserHelpDeskContext()

  const navigate = useNavigate()

  const [openInformation, setOpenInformation] =
    React.useState<null | HTMLElement>(null)
  const openCardInformation = Boolean(openInformation)

  const [openNotification, setOpenNotification] =
    React.useState<null | HTMLElement>(null)
  const openCardNotification = Boolean(openNotification)

  const logoutUser = () => {
    setIsLogged(false)
    localStorage.removeItem('access_token')
    navigate('/login')
  }

  const openUserInformation = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpenInformation(event.currentTarget)
    },
    [],
  )

  const openNotifications = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpenNotification(event.currentTarget)
    },
    [],
  )

  const handleCloseUserInformation = () => {
    setOpenInformation(null)
  }

  const handleCloseNotification = () => {
    setOpenNotification(null)
  }

  const messageRef = useRef(messageNotification)

  useEffect(() => {
    messageRef.current = messageNotification
  }, [messageNotification])

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
            {isDrawerOpen ? (
              <Icon>
                <MdClose />
              </Icon>
            ) : (
              <Icon>
                <GiHamburgerMenu />
              </Icon>
            )}
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
                <IconButton onClick={logoutUser}>
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
              <>
                <Tooltip title="Perfil" placement="bottom" arrow>
                  <IconButton onClick={openUserInformation}>
                    <Icon>
                      <IoMdPerson size={20} />
                    </Icon>
                  </IconButton>
                </Tooltip>
                <Menu
                  id="basic-menu"
                  anchorEl={openInformation}
                  open={openCardInformation}
                  onClose={handleCloseUserInformation}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <Card
                    component={Box}
                    elevation={0}
                    border={'none'}
                    color="#6F6F6F"
                    sx={{
                      width: '99%',
                      height: 'max',
                      display: 'flex',
                      flex: '1',
                      marginX: 'auto',
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" fontSize={15}>
                        Usuário:
                      </Typography>
                      <Typography
                        sx={{ fontSize: '0.8rem' }}
                        color="text.secondary"
                      >
                        {user?.name}
                      </Typography>
                      <Typography variant="h6" fontSize={15}>
                        Email:
                      </Typography>
                      <Typography
                        sx={{ fontSize: '0.8rem' }}
                        color="text.secondary"
                      >
                        {user?.email}
                      </Typography>
                      <Typography variant="h6" fontSize={15}>
                        Setor:
                      </Typography>
                      <Typography
                        sx={{ fontSize: '0.8rem' }}
                        color="text.secondary"
                      >
                        {user?.sector}
                      </Typography>
                      <Typography variant="h6" fontSize={15}>
                        Função:
                      </Typography>
                      <Typography
                        sx={{ fontSize: '0.8rem' }}
                        color="text.secondary"
                      >
                        {user?.position}
                      </Typography>
                      <Typography variant="h6" fontSize={15}>
                        Ramal:
                      </Typography>
                      <Typography
                        sx={{ fontSize: '0.8rem' }}
                        color="text.secondary"
                      >
                        {user?.extension}
                      </Typography>
                    </CardContent>
                  </Card>
                </Menu>
              </>
            )}

            {showNotificationButton && (
              <>
                <Tooltip title="Notificações" arrow>
                  <IconButton onClick={openNotifications}>
                    <Icon>
                      <BsFillBellFill size={20} />
                    </Icon>
                  </IconButton>
                </Tooltip>
                <Menu
                  id="basic-menu"
                  anchorEl={openNotification}
                  open={openCardNotification}
                  onClose={handleCloseNotification}
                  sx={{ maxHeight: '700px' }}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  {isNewMessage ? (
                    messageNotification.map((message: MessageListProps) => {
                      return (
                        <Card
                          key={message.id}
                          component={Box}
                          padding={1}
                          elevation={0}
                          variant="outlined"
                          marginTop={0.5}
                          marginX={0.4}
                          width={'450px'}
                        >
                          <CardContent sx={{ display: 'flex', gap: '10px' }}>
                            <Box>
                              <RiFeedbackFill
                                size={25}
                                color={theme.palette.primary.main}
                              />
                            </Box>
                            <Box
                              display={'flex'}
                              gap={1}
                              alignItems={'flex-start'}
                              flexDirection={'column'}
                            >
                              <Typography variant="h4" fontSize={'1rem'}>
                                <strong>{message.user.name}</strong> interagiu
                                no chamado de título:{' '}
                                <strong>{message.helpdesk.title}</strong>
                              </Typography>
                              <Typography
                                variant="body2"
                                color={'text.secondary'}
                                noWrap
                              >
                                {message.message}
                              </Typography>
                              <Box
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'space-between'}
                                flex={1}
                                width={'100%'}
                                marginTop={2}
                              >
                                <Box
                                  display={'flex'}
                                  gap={1}
                                  alignItems={'center'}
                                >
                                  <Typography>
                                    <strong>Id:</strong>{' '}
                                  </Typography>

                                  <Typography
                                    noWrap
                                    width={'10ch'}
                                    variant="body2"
                                    fontSize={'0.85rem'}
                                  >
                                    {message.helpdesk.id}
                                  </Typography>
                                </Box>
                                <Button
                                  variant="outlined"
                                  onClick={() => {
                                    navigate(
                                      `/home/chamado/detalhe/${message.helpdesk.id}`,
                                    )
                                  }}
                                >
                                  Ir para o chamado
                                </Button>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      )
                    })
                  ) : (
                    <Box
                      display={'flex'}
                      gap={5}
                      alignItems={'center'}
                      margin={2}
                    >
                      <Typography>Nenhuma Notificação </Typography>
                      <Icon>
                        <RiMessageFill />
                      </Icon>
                    </Box>
                  )}
                </Menu>
              </>
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
            color="primary"
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

export default memo(DefaultLayout)
