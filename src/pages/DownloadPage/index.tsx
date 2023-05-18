import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../service/api/config/configApi'
import DefaultLayout from '../../shared/layouts/DefaultLayout'
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import { BsDownload } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const DownloadPage = () => {
  const { filename } = useParams()
  const [fileUrl, setFileUrl] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFileUrl = async () => {
      try {
        const response = await api.get(`/download/${filename}`, {
          responseType: 'blob',
        })
        const fileBlob = new Blob([response.data])
        const fileUrl = URL.createObjectURL(fileBlob)
        setFileUrl(fileUrl)
      } catch (error) {
        console.error('Erro ao obter o URL do arquivo', error)
      }
    }

    fetchFileUrl()
  }, [filename])

  /**
   * Função para retornar para a página anterior, ou seja, o chamado correspondente.
   */

  const triggerReturnChamado = () => {
    navigate(-1)
  }

  return (
    <DefaultLayout
      tituloPagina={'Download do arquivo'}
      mostrarBotaoLogout
      mostrarBotaoTema
      mostrarBotaoPerfil
    >
      <Box
        marginX={'10px'}
        display={'flex'}
        width={'400px'}
        gap={'5'}
        justifyContent={'space-between'}
      >
        <Tooltip title="Voltar para o chamado" placement="top" arrow>
          <IconButton onClick={triggerReturnChamado}>
            <AiOutlineArrowLeft />
          </IconButton>
        </Tooltip>
        {fileUrl ? (
          <a href={fileUrl} download={`${filename}.jpg`}>
            <Button variant="contained" endIcon={<BsDownload size={15} />}>
              Clique aqui para baixar o arquivo
            </Button>
          </a>
        ) : (
          <Typography variant="h6" color={'3b8eef'}>
            Carregando...
          </Typography>
        )}
      </Box>
    </DefaultLayout>
  )
}

export default DownloadPage
