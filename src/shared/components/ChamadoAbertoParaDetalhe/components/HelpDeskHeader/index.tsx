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
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React, { useState } from 'react'
import { IoMdSend } from 'react-icons/io'
import { MdMoreVert, MdOutlineEmojiPeople } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import api from '../../../../../service/api/config/configApi'
import * as yup from 'yup'
import { UserProps } from '../../../../hooks/useUser'
import { yupResolver } from '@hookform/resolvers/yup'
import { useUserHelpDeskContext } from '../../../../contexts/userContext'
import { FaExchangeAlt } from 'react-icons/fa'
import { AiFillLike } from 'react-icons/ai'
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
    useUserHelpDeskContext()
  const [changingAccountable, setChangingAccountable] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

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
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const takeOverHelpDesk = async () => {
    const formData = new FormData()
    const updateToInProgress = 'Em Andamento'

    formData.append('accountable', accountable!)
    formData.append('status', updateToInProgress)
    const headers = {
      headers: {
        'Content-Type': 'application/json',
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
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    }

    try {
      await api.patch(`/helpdesk/${id}`, formData, headers)
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
      <Typography variant="h6" margin={2} noWrap={mdDown}>
        {title}
      </Typography>
      <Box
        display={'flex'}
        width={'50%'}
        justifyContent={'end'}
        alignItems={'center'}
      >
        {isAdmin === 'admin' ? (
          changingAccountable ? (
            <form
              method="POST"
              onSubmit={handleSubmit(takeOverHelpDesk)}
              style={{ display: 'flex', width: '350px' }}
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
                sx={{ marginRight: '20px' }}
              >
                {adminUser?.map((user) => {
                  return (
                    user.role === 'admin' &&
                    currentUser?.id !== user.id && (
                      <MenuItem key={user.id} value={user.name}>
                        {user.name}
                      </MenuItem>
                    )
                  )
                })}
              </Select>
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
              endIcon={<MdOutlineEmojiPeople />}
              color={helpDeskAccountable ? 'success' : 'info'}
              disableElevation
              disabled={!!helpDeskAccountable || status === 'Concluído'}
              sx={{
                marginRight: '15px',
              }}
              onClick={takeOverHelpDesk}
            >
              {smDown
                ? ''
                : helpDeskAccountable
                ? helpDeskAccountable === user!.name &&
                  accountable === user!.name
                  ? `Você assumiu este chamado`
                  : `${helpDeskAccountable} assumiu este chamado`
                : status === 'Concluído'
                ? 'HelpDesk Concluído'
                : 'Assumir Chamado'}
            </Button>
          )
        ) : (
          <Typography
            variant={'body2'}
            color={'text.secondary'}
            marginRight={4}
          >
            {helpDeskAccountable
              ? `${helpDeskAccountable} assumiu este chamado`
              : ''}
          </Typography>
        )}

        {isAdmin === 'admin' && helpDeskAccountable === user!.name ? (
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
                onClick={removeAccountable}
                sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}
              >
                <ListItemText>Passar HelpDesk</ListItemText>
                <ListItemIcon>
                  <FaExchangeAlt />
                </ListItemIcon>
              </MenuItem>
              <MenuItem
                onClick={setToDone}
                sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}
              >
                <ListItemText>Concluir HelpDesk</ListItemText>
                <ListItemIcon>
                  <AiFillLike />
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
