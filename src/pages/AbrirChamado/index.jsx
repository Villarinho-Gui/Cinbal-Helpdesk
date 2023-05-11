import React, { useState } from 'react'
import api from '../../service/api/config/configApi'
import { FileList } from './components/FileList'
import { uniqueId } from 'lodash'

import { Button, Autocomplete, Box, TextField } from '@mui/material'
import { AbrirChamadoContainer, Title } from './styles'

const categorias = [
  { label: 'Email' },
  { label: 'Telefone' },
  { label: 'Rede' },
  { label: 'Fluig' },
  { label: 'Hardware' },
  { label: 'Software' },
  { label: 'PC FACTORY' },
  {
    label: 'PREACTOR',
  },
  { label: 'PROTHEUS' },
  { label: 'VEXON' },
  {
    label: 'Portal do Cliente',
  },
  {
    label: 'Outros',
  },
]

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

  const PostChamado = async (e) => {
    e.preventDefault()

    console.log('Upload')
    const formData = new FormData()
    formData.append('image', image)
    formData.append('titulo', titulo)
    formData.append('descricao', descricao)

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

  function triggerNewImageChange() {
    setNewUploadImage(event.target.value)
  }

  function triggerSelectNewFile(e) {
    e.preventDefault()
    setAttachedFiles([...attachedFiles, newUploadImage])

    setNewUploadImage('')
  }

  function deleteImage(imageToDelete) {
    const newListImageWithoutDeletedOne = image.filter((image) => {
      return image !== imageToDelete
    })

    setImage(newListImageWithoutDeletedOne)

    // console.log(`Deletar ${image}`);
  }

  return (
    <>
      <AbrirChamadoContainer>
        <Title>Abrir Chamado</Title>

        <form className="AbrirChamadoForm" onSubmit={PostChamado} method="post">
          {status.type === 'success' ? (
            <p>{status.mensagem}</p>
          ) : (
            <p>{status.mensagem}</p>
          )}
          <div className="formPrincipais">
            <Autocomplete
              id="combo-box-demo"
              name="categoria"
              disablePortal
              options={categorias}
              sx={{ width: '100%' }}
              renderInput={(params) => (
                <TextField {...params} label="Categoria" />
              )}
            />
            <Button
              className="upload"
              variant="contained"
              component="label"
              color="primary"
              sx={{ width: '100%', maxHeight: '56px' }}
              onChange={triggerSelectNewFile}
            >
              Anexar arquivo
              <input
                name="file"
                value={newUploadImage}
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(e) => {
                  setImage([...image, ...e.target.files])
                  triggerNewImageChange()
                }}
              />
            </Button>
          </div>

          {image && image.length > 0 && (
            <div className="FileList">
              {image.map((file) => {
                return (
                  <FileList
                    image={file}
                    key={uniqueId(file.id)}
                    onDeleteImage={deleteImage}
                  />
                )
              })}
            </div>
          )}

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
          <Box sx={{ minWidth: 120, paddingTop: 3 }}>
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
          </Box>
          <div className="ActionButtons">
            <Button
              type="button"
              variant="outlined"
              sx={{ width: '100%', maxHeight: '56px' }}
            >
              Voltar
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: '100%', maxHeight: '56px' }}
            >
              Abrir Chamado
            </Button>
          </div>
        </form>
      </AbrirChamadoContainer>
    </>
  )
}
