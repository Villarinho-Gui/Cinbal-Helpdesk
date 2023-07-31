/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import DefaultLayout from '../../layouts/DefaultLayout'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import {
  Box,
  Chip,
  Divider,
  Skeleton,
  Typography,
  Card,
  Icon,
  IconButton,
  Grid,
  Paper,
  Button,
  Menu,
  MenuItem,
  Select,
  InputLabel,
  SelectChangeEvent,
  CircularProgress,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import api from '../../../service/api/config/configApi'
import {
  MdImage,
  MdDownload,
  MdOutlineEmojiPeople,
  MdMoreVert,
} from 'react-icons/md'
import { Chat } from './components/Chat'
import { AiFillFile } from 'react-icons/ai'
import { UserProps, useUserHelpDeskContext } from '../../contexts/userContext'
import { IoMdSend } from 'react-icons/io'
import { useForm, SubmitHandler } from 'react-hook-form'

interface FileProps {
  id: string
  filename: string
  mimetype:
    | 'image/jpeg'
    | 'image/gif'
    | 'image/png'
    | 'image/bmp'
    | 'application/pdf'
}

interface AdminUsers extends UserProps {
  id?: string
  name: string
  sector: string
  email: string
  extension: string
  position: string
  role: string
}

interface HelpDeskDetailsProps {
  id: string
  user: {
    name: string
    sector: string
    role: string
  }
  title: string
  category: string
  description: string
  maxLines: number
  createdAt: Date
  files?: FileProps[]
  accountable?: string
}

const ChamadoAbertoParaDetalhe: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [helpDeskData, setHelpDeskData] = useState<HelpDeskDetailsProps | null>(
    null,
  )
  const [attachedFiles, setAttachedFiles] = useState<FileProps[]>([])

  const theme = useTheme()
  const { id } = useParams()
  const token = localStorage.getItem('access_token')

  const [newAccountable, setNewAccountable] = useState<string>('')
  const [changingAccountable, setChangingAccountable] = useState<boolean>(false)
  const [adminUsers, setAdminUsers] = useState<AdminUsers[]>([])

  const {
    user,
    setIsAssumed,
    isAssumed,
    setAccountable,
    accountable,
    isAdmin,
  } = useUserHelpDeskContext()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { handleSubmit, register } = useForm()
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const fetchChamado = async () => {
    setIsLoading(true)
    try {
      const response = await api.get<HelpDeskDetailsProps>(`/helpdesk/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      const { data } = response

      setHelpDeskData(data)
      setAttachedFiles(data.files!)
      setIsLoading(false)
    } catch (error) {
      console.error('Erro ao obter os dados do chamado', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchChamado()
  }, [id, isAssumed])

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

  const listAdminUsers = async () => {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    }
    api.get<AdminUsers[]>('/user', headers).then((response) => {
      const { data } = response
      setAdminUsers(data)
    })
  }

  useEffect(() => {
    listAdminUsers()
  }, [])

  const accountableRef = useRef(accountable)

  useEffect(() => {
    accountableRef.current = accountable
  }, [accountable])

  const publishedDateFormatted = () => {
    return format(
      new Date(helpDeskData!.createdAt),
      "d 'de' LLLL 'às' HH:mm'h'",
      {
        locale: ptBR,
      },
    )
  }

  const publishedDateRelativeToNow = () => {
    return formatDistanceToNow(new Date(helpDeskData!.createdAt), {
      locale: ptBR,
      addSuffix: true,
    })
  }

  return (
    <DefaultLayout
      mostrarBotaoTema={true}
      mostrarBotaoLogout
      mostrarBotaoPerfil
      mostrarBotaoHome
      tituloPagina={''}
      barraDeFerramentas={''}
    >
      <Box
        padding={5}
        borderRadius={1}
        margin={1}
        width="auto"
        border="1px solid"
        height={'max'}
        borderColor={theme.palette.divider}
      >
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
            {helpDeskData?.title}
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
                    {adminUsers.map((user) => {
                      return user.name === accountableRef.current ? (
                        ''
                      ) : (
                        <MenuItem key={user.id} value={user.name}>
                          {user.name === accountableRef.current
                            ? ''
                            : user.name}
                        </MenuItem>
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
                  variant={helpDeskData?.accountable ? 'text' : 'contained'}
                  size="small"
                  endIcon={<MdOutlineEmojiPeople />}
                  color={helpDeskData?.accountable ? 'success' : 'info'}
                  disableElevation
                  disabled={!!helpDeskData?.accountable}
                  sx={{
                    marginRight: '15px',
                  }}
                  onClick={takeOverHelpDesk}
                >
                  {helpDeskData?.accountable
                    ? helpDeskData.accountable === user?.name
                      ? `Você assumiu este chamado`
                      : `${helpDeskData.accountable} assumiu este chamado`
                    : 'Assumir Chamado'}
                </Button>
              )
            ) : (
              <Typography
                variant={'body2'}
                color={'text.secondary'}
                marginRight={4}
              >
                {helpDeskData?.accountable
                  ? `${helpDeskData.accountable} assumiu este chamado`
                  : ''}
              </Typography>
            )}

            {isAdmin === 'admin' && helpDeskData?.accountable === user?.name ? (
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
        <Box display="flex" justifyContent="space-between" paddingBottom={2}>
          <Box>
            {isLoading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: '1.5rem' }}
                width="200px"
              />
            ) : (
              <Typography variant="h5" sx={{ fontSize: '1rem' }}>
                {helpDeskData?.user.name}
              </Typography>
            )}

            {isLoading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: '1.5rem' }}
                width="50px"
              />
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '0.8rem' }}
              >
                {helpDeskData?.user.sector}
              </Typography>
            )}
          </Box>
          <time
            title={helpDeskData?.createdAt ? publishedDateFormatted() : ''}
            dateTime={String(helpDeskData?.createdAt) ?? ''}
          >
            {isLoading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: '1.5rem' }}
                width="90px"
              />
            ) : helpDeskData?.createdAt ? (
              <Typography
                variant="body2"
                sx={{ fontSize: '0.8rem' }}
                color="text.secondary"
              >
                {publishedDateRelativeToNow()}
              </Typography>
            ) : null}
          </time>
        </Box>
        <Divider />

        <Grid
          container
          spacing={2}
          display={'flex'}
          flex={1}
          justifyContent={'space-between'}
          paddingY={'20px'}
        >
          <Grid item xs={12} lg={2}>
            {isLoading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: '1.5rem' }}
                width="90px"
              />
            ) : (
              <Chip
                label={helpDeskData?.category}
                size="small"
                color="default"
              />
            )}
          </Grid>

          <Grid
            item
            xl={4}
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              justifyContent: 'end',
            }}
          >
            <Typography variant="body2">Id:</Typography>
            {isLoading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: '1.5rem' }}
                width="90px"
              />
            ) : (
              <Chip label={helpDeskData?.id} size="small" color="default" />
            )}
          </Grid>
        </Grid>

        <Box>
          {isLoading ? (
            <Skeleton
              variant="rounded"
              sx={{ fontSize: '1.5rem' }}
              width="100%"
              height="100px"
            />
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ paddingBottom: '40px' }}
            >
              {helpDeskData?.description}
            </Typography>
          )}
          <Divider />
          <Box display="flex" gap="10px"></Box>
        </Box>

        {helpDeskData?.files && helpDeskData?.files.length > 0 && (
          <Grid container spacing={2} maxWidth={'100%'} paddingY={'20px'}>
            {attachedFiles.map((file: FileProps) => (
              <Grid item xl={2} lg={6} md={6} sm={12} xs={12} key={file.id}>
                <Card
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '60px',
                    justifyContent: 'space-between',
                  }}
                  variant="outlined"
                >
                  <Box display={'flex'} alignItems={'center'} gap={'2px'}>
                    <Box margin={2}>
                      {file.mimetype === 'application/pdf' ? (
                        <Icon>
                          <AiFillFile size={25} />
                        </Icon>
                      ) : file.mimetype === 'image/png' ||
                        file.mimetype === 'image/jpeg' ||
                        file.mimetype === 'image/gif' ||
                        file.mimetype === 'image/bmp' ? (
                        <Icon>
                          <MdImage />
                        </Icon>
                      ) : (
                        ''
                      )}
                    </Box>
                    <Box
                      display={'flex'}
                      width={'200px'}
                      justifyContent={'center'}
                      flexDirection={'column'}
                    >
                      <Typography fontSize={'14px'} width={'30ch'} noWrap>
                        {file.filename}
                      </Typography>
                    </Box>
                  </Box>

                  <IconButton>
                    <MdDownload />
                  </IconButton>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box
          maxWidth={'1024px'}
          marginY={'10px'}
          border="1px solid"
          borderColor={theme.palette.divider}
          borderRadius={'8px'}
          padding={'10px'}
        >
          <Chat />
        </Box>
      </Box>
    </DefaultLayout>
  )
}

export default memo(ChamadoAbertoParaDetalhe)
