/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Button,
  CircularProgress,
  Icon,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Tooltip,
  Typography,
  Zoom,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React, { useState } from 'react'
import { IoMdSend } from 'react-icons/io'
import { MdClose, MdMoreVert, MdOutlineEmojiPeople } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import api from '../../../../../service/api'
import * as yup from 'yup'
import { UserProps } from '../../../../hooks/useUser'
import { yupResolver } from '@hookform/resolvers/yup'
import { useUserContext } from '../../../../contexts/userContext'
import { FaUserClock, FaUsersCog } from 'react-icons/fa'
import { AiFillLike } from 'react-icons/ai'
import { useHelpDeskContext } from '../../../../contexts/HelpDeskContext'
import { RiTimer2Line } from 'react-icons/ri'
interface HelpDeskHeaderProps {
  title: string | undefined
  helpDeskAccountable: string | undefined
  token: string | null
  id: string | undefined
  adminUser: UserProps[] | undefined
  isLoading: boolean
  status: string
}

const changeAccountableSchema = yup
  .object()
  .shape({
    accountable: yup.string().required(),
  })
  .required()

export const HelpDeskHeader: React.FC<HelpDeskHeaderProps> = ({
  title,
  helpDeskAccountable,
  token,
  id,
  adminUser,
  isLoading,
  status,
}) => {
  const { user, isAdmin, accountable, setIsAssumed, setAccountable } =
    useUserContext()
  const { toggleHelpDeskStatus } = useHelpDeskContext()
  const [changingAccountable, setChangingAccountable] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const [sendAccountableToDb, setSendAccountableToDb] = useState(false)

  const currentUser = user

  const { handleSubmit, register } = useForm({
    resolver: yupResolver(changeAccountableSchema),
    defaultValues: {
      accountable: '',
    },
  })

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  async function takeOverHelpDesk() {
    const formData = new FormData()
    const updateToInProgress = 'Em Andamento'

    formData.append('accountable', accountable!)
    formData.append('status', updateToInProgress)

    setSendAccountableToDb(true)
    const headers = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }
    try {
      await api.patch(`/helpdesk/${id}`, formData, headers).then(() => {
        setSendAccountableToDb(false)
        setIsAssumed(true)
        setAccountable(user!.name)
        setChangingAccountable(false)
      })
    } catch (error) {
      console.error(error)
    }
  }

  async function closeSelectAdmin() {
    const formData = new FormData()
    const accountable = currentUser?.name

    formData.append('accountable', accountable!)
    const headers = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }
    try {
      await api.patch(`/helpdesk/${id}`, formData, headers).then(() => {
        setIsAssumed(true)
        setAccountable(user!.name)
        setChangingAccountable(false)
      })
    } catch (error) {
      console.error(error)
    }
  }

  const setToDone = async () => {
    const formData = new FormData()
    const updateToDone = 'Concluído'

    formData.append('status', updateToDone)
    formData.append('accountable', accountable!)
    const headers = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }

    try {
      await api.patch(`/helpdesk/${id}`, formData, headers).then(() => {
        toggleHelpDeskStatus()
      })
    } catch (error) {
      console.error(error)
    }
  }

  const waitingOutsourced = async () => {
    const formData = new FormData()
    const updateToWaitingOutsourced = 'Terceiro'

    formData.append('status', updateToWaitingOutsourced)
    formData.append('accountable', accountable!)
    const headers = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }

    try {
      await api.patch(`/helpdesk/${id}`, formData, headers).then(() => {
        toggleHelpDeskStatus()
      })
    } catch (error) {
      console.error(error)
    }
  }

  const removeAccountable = () => {
    setChangingAccountable(true)
    setAccountable('')
  }

  return (
    <Box
      component={Paper}
      height={45}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      marginBottom={5}
      elevation={0}
    >
      <Typography
        variant="h6"
        sx={{
          [theme.breakpoints.down('lg')]: {
            width: '20ch',
          },
        }}
        margin={2}
        noWrap
      >
        {title}
      </Typography>
      <Box
        display={'flex'}
        width={'50%'}
        justifyContent={'end'}
        alignItems={'center'}
      >
        {isAdmin === 'admin' ? (
          changingAccountable &&
          status !== 'Concluído' &&
          status !== 'Terceiro' ? (
            <form
              method="POST"
              onSubmit={handleSubmit(takeOverHelpDesk)}
              style={{ display: 'flex', width: '350px', gap: '2px' }}
            >
              <Select
                {...register('accountable')}
                name="accountable"
                type={'text'}
                size="small"
                value={accountable!}
                onChange={(e: SelectChangeEvent) =>
                  setAccountable(e.target.value)
                }
                fullWidth
              >
                {adminUser?.some(
                  (user) =>
                    user.role === 'admin' && currentUser?.id !== user.id,
                ) ? (
                  adminUser.map(
                    (user) =>
                      user.role === 'admin' &&
                      currentUser?.id !== user.id && (
                        <MenuItem key={user.id} value={user.name}>
                          {user.name}
                        </MenuItem>
                      ),
                  )
                ) : (
                  <MenuItem value="">
                    <Typography>Nenhum usuário encontrado</Typography>
                  </MenuItem>
                )}
              </Select>

              <IconButton
                type="submit"
                disabled={isLoading}
                onClick={() => {
                  closeSelectAdmin()
                }}
              >
                <Icon>
                  {isLoading ? (
                    <CircularProgress size={25} />
                  ) : (
                    <MdClose size={25} />
                  )}
                </Icon>
              </IconButton>
              <IconButton
                type="submit"
                disabled={isLoading}
                onClick={takeOverHelpDesk}
              >
                <Icon>
                  {isLoading ? (
                    <CircularProgress size={25} />
                  ) : (
                    <IoMdSend size={20} />
                  )}
                </Icon>
              </IconButton>
            </form>
          ) : (
            <Button
              variant={helpDeskAccountable ? 'text' : 'contained'}
              size="small"
              endIcon={
                status === 'Terceiro' ? (
                  <FaUserClock />
                ) : sendAccountableToDb ? (
                  <CircularProgress size={25} />
                ) : (
                  <MdOutlineEmojiPeople />
                )
              }
              color={helpDeskAccountable ? 'success' : 'info'}
              disableElevation
              disabled={
                !!helpDeskAccountable ||
                status === 'Concluído' ||
                status === 'Terceiro' ||
                sendAccountableToDb
              }
              sx={{
                marginRight: '15px',
              }}
              onClick={takeOverHelpDesk}
            >
              {smDown
                ? ''
                : helpDeskAccountable
                ? status === 'Concluído'
                  ? 'HelpDesk Concluído'
                  : helpDeskAccountable === user!.name
                  ? `Você assumiu este chamado`
                  : `${helpDeskAccountable} assumiu`
                : status === 'Terceiro'
                ? 'Aguardando terceiros'
                : 'Assumir Chamado'}
            </Button>
          )
        ) : (
          <Box display={'flex'} alignItems={'center'} gap={1} marginX={2}>
            <Typography variant={'body2'} color={'text.secondary'}>
              {helpDeskAccountable ? (
                `${helpDeskAccountable} assumiu`
              ) : (
                <Typography>Aguardando responsável</Typography>
              )}
            </Typography>
            {
              <Tooltip
                TransitionComponent={Zoom}
                arrow
                title={
                  status === 'Em Andamento'
                    ? 'Em andamento'
                    : status === 'Concluído'
                    ? 'Concluído'
                    : status === 'Aberto'
                    ? 'Aberto'
                    : 'Aguardando Terceiro'
                }
              >
                <Icon color="secondary">
                  {status === 'Concluído' ? (
                    <AiFillLike size={20} />
                  ) : status === 'Em Andamento' ? (
                    <MdOutlineEmojiPeople size={20} />
                  ) : status === 'Aberto' ? (
                    <RiTimer2Line size={20} />
                  ) : (
                    <FaUserClock size={20} />
                  )}
                </Icon>
              </Tooltip>
            }
          </Box>
        )}

        {isAdmin === 'admin' &&
        helpDeskAccountable === user!.name &&
        status !== 'Concluído' ? (
          <>
            <IconButton
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MdMoreVert />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  removeAccountable()
                }}
                sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}
              >
                <ListItemText>Passar HelpDesk</ListItemText>
                <ListItemIcon>
                  <FaUsersCog />
                </ListItemIcon>
              </MenuItem>
              {status !== 'Concluído' && (
                <MenuItem
                  onClick={setToDone}
                  sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}
                >
                  <ListItemText>Concluir HelpDesk</ListItemText>
                  <ListItemIcon>
                    <AiFillLike />
                  </ListItemIcon>
                </MenuItem>
              )}
              <MenuItem
                onClick={waitingOutsourced}
                sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}
              >
                <ListItemText>Aguardando Terceirizado</ListItemText>
                <ListItemIcon>
                  <FaUserClock />
                </ListItemIcon>
              </MenuItem>
              <MenuItem
                onClick={takeOverHelpDesk}
                sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}
              >
                <ListItemText>Reassumir HelpDesk</ListItemText>
                <ListItemIcon>
                  <MdOutlineEmojiPeople />
                </ListItemIcon>
              </MenuItem>
            </Menu>
          </>
        ) : (
          ''
        )}
      </Box>
    </Box>
  )
}
