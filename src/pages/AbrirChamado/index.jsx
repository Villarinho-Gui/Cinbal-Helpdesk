import React, { useState } from 'react'
import api from '../../service/api/config/configApi'
import { FileList } from './components/FileList'
import { uniqueId } from 'lodash'
import { useForm } from 'react-hook-form'

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
  Typography,
  Snackbar,
} from '@mui/material'
import DefaultLayout from '../../shared/layouts/DefaultLayout'
import { AiOutlinePaperClip } from 'react-icons/ai'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const createChamadoSchema = yup
  .object()
  .shape({
    titulo: yup.string().required().min(3).max(50),
    categoria: yup.string().required(),
    descricao: yup.string().min(3).max(500).required(),
  })
  .required()

export default function AbrirChamado() {
  const [attachedFiles, setAttachedFiles] = useState([])
  const [newUploadImage, setNewUploadImage] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const theme = useTheme()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [files, setFiles] = useState('')
  const [openSuccessMessage, setOpenSuccessMessage] = useState(false)
  const [openErrorMessage, setOpenErrorMessage] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createChamadoSchema),
    defaultValues: {
      title: '',
      category: '',
      description: '',
      files: '',
    },
  })

  const PostChamado = async () => {
    event.preventDefault()
    setIsLoading(true)
    const formData = new FormData()

    formData.append('title', title)
    formData.append('category', category)
    formData.append('description', description)

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }

    const headers = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    try {
      await api.post('/abrir-chamado', formData, headers).then(() => {
        setOpenSuccessMessage(true)
      })
    } catch (error) {
      console.log(error)
      setOpenErrorMessage(true)
    }

    setIsLoading(false)
  }

  const triggerCloseSuccessMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSuccessMessage(false)
  }

  const triggerCloseErrorMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenErrorMessage(false)
  }

  function triggerNewImageChange(event) {
    setNewUploadImage(event.target.value)
  }

  function triggerSelectNewFile(e) {
    e.preventDefault()
    setAttachedFiles([...attachedFiles, newUploadImage])

    setNewUploadImage('')
  }

  function deleteImage(imageToDelete) {
    const newListImageWithoutDeletedOne = files.filter((image) => {
      return image !== imageToDelete
    })

    setFiles(newListImageWithoutDeletedOne)
  }

  return (
    <DefaultLayout
      tituloPagina="Abrir Chamado"
      mostrarBotaoLogout
      mostrarBotaoPerfil
      mostrarBotaoTema
      mostrarBotaoHome
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
            onSubmit={handleSubmit(PostChamado)}
            method="POST"
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
                    id="titulo_id"
                    {...register('titulo')}
                    name="titulo"
                    label="Título"
                    type="text"
                    variant="outlined"
                    value={title}
                    disabled={isLoading}
                    onChange={(e) => setTitle(e.target.value)}
                    error={!!errors.title}
                    helperText={
                      <Typography variant="body2" color="error">
                        {errors.title && <span>{errors.title?.message}</span>}
                      </Typography>
                    }
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Grid>
              <Grid item xl={4}>
                <Select
                  label="Categoria"
                  {...register('categoria')}
                  placeholder="categoria"
                  name="categoria"
                  value={category}
                  disabled={isLoading}
                  type="text"
                  onChange={(e) => setCategory(e.target.value)}
                  error={!!errors.category}
                  helperText={
                    <Typography variant="body2" color="error">
                      {errors.category && (
                        <span>{errors.category?.message}</span>
                      )}
                    </Typography>
                  }
                  sx={{ width: '100%' }}
                >
                  <MenuItem value={'email'}>Email</MenuItem>
                  <MenuItem value={'ramal'}>Ramal</MenuItem>
                  <MenuItem value={'rede'}>Rede</MenuItem>
                  <MenuItem value={'fluig'}>Fluig</MenuItem>
                  <MenuItem value={'hardware'}>Hardware</MenuItem>
                  <MenuItem value={'software'}>Software</MenuItem>
                  <MenuItem value={'pcfactory'}>PcFactory</MenuItem>
                  <MenuItem value={'preactor'}>Preactor</MenuItem>
                  <MenuItem value={'protheus'}>Protheus</MenuItem>
                  <MenuItem value={'vexon'}>Vexon</MenuItem>
                  <MenuItem value={'portaldocliente'}>
                    Portal do Cliente
                  </MenuItem>
                  <MenuItem value={'outros'}>Outros</MenuItem>
                </Select>
              </Grid>
            </Grid>

            <Grid item xl={6} lg={9} sx={{ marginY: '20px' }}>
              <TextField
                id="descricao_id"
                name="descricao"
                {...register('descricao')}
                label="Descrição"
                type="text"
                variant="outlined"
                multiline
                rows={4}
                sx={{ width: '100%' }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
                error={!!errors.description}
                helperText={
                  <Typography variant="body2" color="error">
                    {errors.description && (
                      <span>{errors.description?.message}</span>
                    )}
                  </Typography>
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
              {files && files.length > 0 && (
                <Grid
                  container
                  gap={2}
                  paddingY={4}
                  paddingX={2}
                  className="FileList"
                >
                  {files.map((file) => {
                    return (
                      <FileList
                        image={file}
                        key={uniqueId(file.id)}
                        onDeleteImage={deleteImage}
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
                    variant="contained"
                    component="label"
                    color="primary"
                    onChange={triggerSelectNewFile}
                  >
                    <input
                      name="file"
                      value={newUploadImage}
                      {...register('image')}
                      hidden
                      accept="image/*"
                      multiple="3"
                      type="file"
                      onChange={(e) => {
                        setFiles([...files, ...e.target.files])
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
