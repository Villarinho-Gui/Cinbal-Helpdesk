/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Button,
  CircularProgress,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import React, { memo, useEffect, useRef, useState } from 'react'
import { IoMdSend } from 'react-icons/io'
import { MdMoreVert, MdOutlineEmojiPeople } from 'react-icons/md'
import { useUserHelpDeskContext } from '../../../../contexts/userContext'
import { useForm } from 'react-hook-form'
import api from '../../../../../service/api/config/configApi'

interface HelpDeskHeaderProps {
  title: string | undefined
  helpDeskAccountable: string | undefined
  token: string | null
  id: string | undefined
  isLoading: boolean
}

const HelpDeskHeader: React.FC<HelpDeskHeaderProps> = ({
  title,
  helpDeskAccountable,
  token,
  id,
  isLoading,
}) => {
  const { user, isAdmin, accountable, setIsAssumed, setAccountable } =
    useUserHelpDeskContext()
  const [changingAccountable, setChangingAccountable] = useState<boolean>(false)
  const [newAccountable, setNewAccountable] = useState<string>('')
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)
  const { handleSubmit, register } = useForm()
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const accountableRef = useRef(accountable)

  useEffect(() => {
    accountableRef.current = accountable
  }, [accountable])

  const takeOverHelpDesk = async () => {
    const formData = new FormData()

    if (changingAccountable) {
      setAccountable(newAccountable)
    }

    formData.append('accountable', accountable!)
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    }
    try {
      await api.patch(`/helpdesk/${id}`, formData, headers).then(() => {
        setAccountable(user?.name!)
        setIsAssumed(true)
      })
    } catch (error) {
      console.error(error)
    }
  }

  const removeHelpDeskResponsibility = async () => {
    const formData = new FormData()
    formData.append('accountable', newAccountable!)
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    }
    try {
      await api.patch(`/helpdesk/${id}`, formData, headers).then(() => {
        setIsAssumed(false)
        setChangingAccountable(true)
      })
    } catch (error) {
      console.error(error)
    }
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
      <Typography variant="h6" margin={2}>
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
              style={{ display: 'flex' }}
            >
              <Select
                {...register('newAccountable')}
                name="newAccountable"
                type={'text'}
                size="small"
                value={newAccountable ?? newAccountable}
                onChange={(e: SelectChangeEvent) =>
                  setNewAccountable(e.target.value)
                }
                fullWidth
                sx={{ marginRight: '20px' }}
              >
                {/* {adminUser.map((user: any) => {
                  return user.name === accountableRef.current ? (
                    ''
                  ) : (
                    <MenuItem key={user.id} value={user.name}>
                      {user.name === accountableRef.current ? '' : user.name}
                    </MenuItem>
                  )
                })} */}
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
              disabled={!!helpDeskAccountable}
              sx={{
                marginRight: '15px',
              }}
              onClick={takeOverHelpDesk}
            >
              {helpDeskAccountable
                ? helpDeskAccountable === user!.name
                  ? `Você assumiu este chamado`
                  : `${helpDeskAccountable} assumiu este chamado`
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
              <MenuItem onClick={removeHelpDeskResponsibility}>
                Passar HelpDesk
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

export default memo(HelpDeskHeader)
