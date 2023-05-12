import React, { useState } from 'react'
import api from '../../service/api/config/configApi'
import { FileList } from './components/FileList'
import { uniqueId } from 'lodash'

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
} from '@mui/material'
import DefaultLayout from '../../shared/layouts/DefaultLayout'
import { AiOutlinePaperClip } from 'react-icons/ai'

export default function AbrirChamado() {
  const [image, setImage] = useState('')
  const [attachedFiles, setAttachedFiles] = useState([])
  const [newUploadImage, setNewUploadImage] = useState([])

  const [status, setStatus] = useState({
    type: '',
    mensagem: '',
  })

  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [categoria, setCategoria] = useState('Email')

  const handleChange = (event) => {
    setCategoria(event.target.value)
  }

  const PostChamado = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('image', image)
    formData.append('titulo', titulo)
    formData.append('descricao', descricao)
    formData.append('categoria', categoria)

    for (let i = 0; i < image.length; i++) {
      formData.append('image', image[i])
    }
    const headers = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    await api
      .post('/upload', formData, headers)
      .then((response) => {
        console.log(response)
        setStatus({
          type: 'success',
          mensagem: response.data.mensagem,
        })
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response)
          setStatus({
            type: 'error',
            mensagem: err.response.data.mensagem,
          })
        } else {
          console.log('Erro no banco de dados')
        }
      })
  }

  function triggerNewImageChange(e) {
    setNewUploadImage(e.target.value)
  }

  function triggerSelectNewFile(e) {
    e.preventDefault()

    if (attachedFiles.length >= 3) {
      alert('Limite máximo de arquivos excedido')
    } else {
      setAttachedFiles([...attachedFiles, newUploadImage])
      setNewUploadImage('')
    }
  }

  function deleteImage(imageToDelete) {
    const newListImageWithoutDeletedOne = image.filter((image) => {
      return image !== imageToDelete
    })

    setImage(newListImageWithoutDeletedOne)
  }

  const theme = useTheme()

  return (
    <DefaultLayout
      tituloPagina="Abrir Chamado"
      mostrarBotaoLogout
      mostrarBotaoPerfil
      mostrarBotaoTema
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
            onSubmit={PostChamado}
            method="post"
          >
            {status.type === 'success' ? (
              <p>{status.mensagem}</p>
            ) : (
              <p>{status.mensagem}</p>
            )}
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
                    name="titulo"
                    label="Título"
                    variant="outlined"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Grid>
              <Grid item xl={4}>
                <Select
                  id="combo-box-demo"
                  name="categoria"
                  value={categoria}
                  onChange={handleChange}
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
                label="Descrição"
                variant="outlined"
                multiline
                rows={4}
                sx={{ width: '100%' }}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Grid>

            <Grid
              container
              spacing={2}
              direction={'row'}
              alignItems={'center'}
              gap={2}
            >
              {image && image.length > 0 && (
                <Grid
                  container
                  gap={2}
                  paddingY={4}
                  paddingX={2}
                  className="FileList"
                >
                  {image.map((file) => {
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
                      hidden
                      accept="image/*"
                      multiple="3"
                      type="file"
                      onChange={(e) => {
                        setImage([...image, ...e.target.files])
                        triggerNewImageChange()
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
              <Grid item xl={2} lg={6}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: '100%' }}
                >
                  Enviar chamado
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Box>
    </DefaultLayout>
  )
}
