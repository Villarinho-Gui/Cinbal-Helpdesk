/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import React, { useState } from 'react'
import api from '../../service/api/config/configApi'
import { uniqueId } from 'lodash'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  Button,
  Box,
  TextField,
  Grid,
  useTheme,
  IconButton,
  Tooltip,
  Divider,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Snackbar,
  SelectChangeEvent,
} from '@mui/material'
import DefaultLayout from '../../shared/layouts/DefaultLayout'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { useHelpDeskContext } from '../../shared/contexts/HelpDeskContext'
import FileList from '../../shared/components/FileList'
import { useUserContext } from '../../shared/contexts/userContext'

interface OpenHelpDesk {
  title: string
  category: string
  description: string
  status: string
  files?: File[]
}

const createHelpDeskSchema = yup
  .object()
  .shape({
    title: yup.string().required().min(3).max(50),
    category: yup.string().required(),
    description: yup.string().min(3).max(500).required(),
  })
  .required()

export const AbrirChamado: React.FC = () => {
  const [textFieldTitle, setTextFieldTitle] = useState('')
  const [textFieldDescription, setTextFieldDescription] = useState('')
  const [selectFieldCategory, setSelectFieldCategory] = useState<
    | 'Email'
    | 'Ramal'
    | 'Rede'
    | 'Fluig'
    | 'Hardware'
    | 'Software'
    | 'PcFactory'
    | 'Preactor'
    | 'Protheus'
    | 'Vexon'
    | 'Portal do Cliente'
    | 'Outros'
  >('Email')

  const [attachedFiles, setAttachedFiles] = useState<File[] | undefined>([])
  const [newUploadFile, setNewUploadFile] = useState<File | undefined>()

  const [openSuccessMessage, setOpenSuccessMessage] = useState(false)
  const [openErrorMessage, setOpenErrorMessage] = useState(false)

  const theme = useTheme()
  const { toggleHelpDesk, toggleLoading, isLoading } = useHelpDeskContext()

  const { user } = useUserContext()
  const currentUser = user

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createHelpDeskSchema),
    defaultValues: {
      title: '',
      category: '',
      description: '',
      status: 'Aberto',
      files: undefined,
    },
  })

  const PostHelpDesk: SubmitHandler<OpenHelpDesk> = async () => {
    toggleLoading()
    const token = localStorage.getItem('access_token')

    const formData = new FormData()

    formData.append('title', textFieldTitle)
    formData.append('category', selectFieldCategory)
    formData.append('description', textFieldDescription)

    for (let quantity = 0; quantity < attachedFiles!.length; quantity++) {
      const quantityDisplayed = quantity
      const attachedFilesToSend = attachedFiles![quantityDisplayed]
      formData.append('files', attachedFilesToSend)
    }

    const headers = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    }

    try {
      await api.post<OpenHelpDesk>('/helpdesk', formData, headers).then(() => {
        setTextFieldTitle('')
        setTextFieldDescription('')
        setAttachedFiles([])
        setOpenSuccessMessage(true)
        toggleHelpDesk()
      })
    } catch (error) {
      console.error(error)
      setOpenErrorMessage(true)
    }

    toggleLoading()
  }

  const triggerCloseSuccessMessage = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSuccessMessage(false)
  }

  const triggerCloseErrorMessage = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenErrorMessage(false)
  }

  function triggerNewImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files![0]
    setNewUploadFile(file)
  }

  function triggerSelectNewFile() {
    if (newUploadFile !== undefined) {
      setAttachedFiles([...attachedFiles!, newUploadFile!])
    }

    setNewUploadFile(undefined)
  }

  const deleteFile = (attachedFileToDelete: any) => {
    const newListImageWithoutDeletedOne = attachedFiles!.filter((file) => {
      return file !== attachedFileToDelete
    })

    setAttachedFiles(newListImageWithoutDeletedOne)
  }

  return (
    <DefaultLayout
      tituloPagina="Abrir Chamado"
      mostrarBotaoLogout
      mostrarBotaoPerfil
      mostrarBotaoTema
      mostrarBotaoHome={currentUser?.role === 'admin'}
    >
      <Box
        borderRadius={1}
        marginX={1}
        width="auto"
        border="1px solid"
        height="max-content"
        borderColor={theme.palette.divider}
      >
        <Grid
          container
          direction="column"
          padding={5}
          spacing={2}
          sx={{
            [theme.breakpoints.down('sm')]: {
              padding: '30px',
            },
          }}
        >
          <form
            className="AbrirChamadoForm"
            onSubmit={handleSubmit(PostHelpDesk)}
            method="POST"
            acceptCharset="UTF-8"
          >
            <Grid
              container
              item
              direction={'column'}
              spacing={2}
              sx={{ maxWidth: '600px' }}
            >
              <Grid item xl={4} lg={6}>
                <Box sx={{ minWidth: 120, paddingTop: 3 }}>
                  <TextField
                    {...register('title')}
                    name="title"
                    label="Título"
                    type="text"
                    variant="outlined"
                    disabled={isLoading}
                    value={textFieldTitle}
                    onChange={(e) => setTextFieldTitle(e.target.value)}
                    error={!!errors.title}
                    helperText={
                      errors.title && <span>{errors.title?.message}</span>
                    }
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Grid>
              <Grid item xl={4}>
                <Select
                  {...register('category')}
                  placeholder="categoria"
                  name="category"
                  disabled={isLoading}
                  type="text"
                  value={selectFieldCategory}
                  onChange={(event: SelectChangeEvent) =>
                    setSelectFieldCategory(
                      event.target.value as
                        | 'Email'
                        | 'Ramal'
                        | 'Rede'
                        | 'Fluig'
                        | 'Hardware'
                        | 'Software'
                        | 'PcFactory'
                        | 'Preactor'
                        | 'Protheus'
                        | 'Vexon'
                        | 'Portal do Cliente'
                        | 'Outros',
                    )
                  }
                  error={!!errors.category}
                  sx={{ width: '100%' }}
                >
                  <MenuItem value={'Email'}>Email</MenuItem>
                  <MenuItem value={'Ramal'}>Ramal</MenuItem>
                  <MenuItem value={'Rede'}>Rede</MenuItem>
                  <MenuItem value={'Fluig'}>Fluig</MenuItem>
                  <MenuItem value={'Hardware'}>Hardware</MenuItem>
                  <MenuItem value={'Software'}>Software</MenuItem>
                  <MenuItem value={'PcFactory'}>PcFactory</MenuItem>
                  <MenuItem value={'Preactor'}>Preactor</MenuItem>
                  <MenuItem value={'Protheus'}>Protheus</MenuItem>
                  <MenuItem value={'Vexon'}>Vexon</MenuItem>
                  <MenuItem value={'PortalDoCliente'}>
                    Portal do Cliente
                  </MenuItem>
                  <MenuItem value={'Outros'}>Outros</MenuItem>
                </Select>
              </Grid>
            </Grid>

            <Grid item xl={6} lg={9} sx={{ marginY: '20px' }}>
              <TextField
                {...register('description')}
                name="description"
                label="Descrição"
                type="text"
                variant="outlined"
                value={textFieldDescription}
                multiline
                rows={4}
                sx={{ width: '100%' }}
                onChange={(e) => setTextFieldDescription(e.target.value)}
                disabled={isLoading}
                error={!!errors.description}
                helperText={
                  errors.description && (
                    <span>{errors.description?.message}</span>
                  )
                }
              />
            </Grid>

            <Grid
              container
              spacing={2}
              direction={'row'}
              alignItems={'center'}
              gap={2}
            >
              {attachedFiles && attachedFiles.length > 0 && (
                <Grid
                  container
                  gap={2}
                  paddingY={4}
                  paddingX={2}
                  className="FileList"
                >
                  {attachedFiles.map((file) => {
                    return (
                      <FileList
                        file={file}
                        key={uniqueId(String(file.lastModified))}
                        onDeleteFile={deleteFile}
                      />
                    )
                  })}
                </Grid>
              )}
            </Grid>
            <Grid item lg={6} md={8} sx={{ marginY: '10px' }}>
              <Alert severity="info">
                Serão aceitos no máximo 3 arquivos de até 2mb
              </Alert>
            </Grid>
            <Grid
              container
              direction={'row'}
              spacing={2}
              paddingY={2}
              alignItems={'center'}
            >
              <Grid item>
                <Tooltip title="Anexar arquivo" placement="top" arrow>
                  <IconButton
                    className="upload"
                    component="label"
                    color="primary"
                    onChange={triggerSelectNewFile}
                    disabled={isLoading}
                  >
                    <input
                      {...register('files')}
                      id="file-input"
                      hidden
                      // accept="image/*"
                      type="file"
                      multiple
                      disabled={isLoading}
                      onChange={(e) => {
                        setAttachedFiles([
                          ...attachedFiles!,
                          ...e.target.files!,
                        ])
                        triggerNewImageChange(e)
                      }}
                    />
                    <AiOutlinePaperClip size={25} />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Divider
                variant="middle"
                orientation="vertical"
                sx={{ height: '35px', marginTop: '20px' }}
              />
              <Grid item xl={2} lg={4}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="contained"
                  sx={{ width: '100%' }}
                  endIcon={
                    isLoading ? (
                      <CircularProgress
                        variant="indeterminate"
                        color="inherit"
                        size={20}
                        sx={{ alignSelf: 'end' }}
                      />
                    ) : undefined
                  }
                >
                  {isLoading ? 'Enviando...' : 'Enviar Chamado'}
                </Button>
                <Snackbar
                  open={openSuccessMessage}
                  autoHideDuration={6000}
                  onClose={triggerCloseSuccessMessage}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <Alert
                    severity="success"
                    onClose={triggerCloseSuccessMessage}
                  >
                    Chamado aberto com sucesso!
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={openErrorMessage}
                  autoHideDuration={6000}
                  onClose={triggerCloseErrorMessage}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <Alert severity="error" onClose={triggerCloseErrorMessage}>
                    Falha ao abrir o chamado
                  </Alert>
                </Snackbar>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Box>
    </DefaultLayout>
  )
}
