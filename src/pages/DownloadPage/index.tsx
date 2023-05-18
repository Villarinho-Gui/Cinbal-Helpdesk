import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../service/api/config/configApi'
import DefaultLayout from '../../shared/layouts/DefaultLayout'
import { Box, Button } from '@mui/material'
import { BsDownload } from 'react-icons/bs'

const DownloadPage = () => {
  const { filename } = useParams()
  const [fileUrl, setFileUrl] = useState('')

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

  return (
    <DefaultLayout tituloPagina={'Download do arquivo'}>
      <Box marginX={'10px'}>
        {fileUrl ? (
          <a href={fileUrl} download={`${filename}.jpg`}>
            <Button variant="contained" endIcon={<BsDownload size={15} />}>
              Clique aqui para baixar o arquivo
            </Button>
          </a>
        ) : (
          <p>Carregando...</p>
        )}
      </Box>
    </DefaultLayout>
  )
}

export default DownloadPage
