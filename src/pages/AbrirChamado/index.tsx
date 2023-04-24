import React, { useRef, useState } from 'react'
import DefaultLayout from '../../shared/layouts/DefaultLayout'
import { Box, Grid, IconButton, Tooltip, useTheme } from '@mui/material'
import BarraFerramentasDetalhesChamado from '../../shared/components/BarraFerramentasDetalhesChamado'
import { useNavigate, useParams } from 'react-router-dom'
import { Form } from '@unform/web'
import { VTextField } from '../../shared/Form/export'
import { FormHandles } from '@unform/core'
import { ChamadosService } from '../../shared/services/api/Chamados/ChamadosServices'
import { AiOutlinePaperClip } from 'react-icons/ai'

interface IFormData {
  author: string
  titulo: string
  descricao: string
  publishedAt: Date
}

const AbrirChamado: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { id = 'novo' } = useParams<'id'>()

  const theme = useTheme()
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (id !== 'novo') {
  //     setIsLoading(true)

  //     ChamadosService.getById(Number(id)).then((result) => {
  //       setIsLoading(false)
  //       if (result instanceof Error) {
  //         alert(result.message)
  //         navigate('/abrir-chamado')
  //       } else {
  //         setTitulo(result.titulo)
  //         console.log(result)
  //       }
  //     })
  //   }
  // }, [id, navigate])

  const formRef = useRef<FormHandles>(null)

  const triggerSave = (dados: IFormData) => {
    if (id === 'novo') {
      setIsLoading(true)
      ChamadosService.create(dados).then((result) => {
        setIsLoading(true)
        if (result instanceof Error) {
          alert(result.message)
        } else {
          navigate(`/chamados/detalhe/${result}`)
        }
      })
    } else {
      ChamadosService.updateById(Number(id), {
        id: Number(id),
        ...dados,
        chamadoId: 0,
        setor: '',
        categoria: '',
        attachedFile: [0],
      }).then((result) => {
        setIsLoading(true)
        if (result instanceof Error) {
          alert(result.message)
        } else {
          navigate(`/chamados/detalhe/${result}/${id}`)
        }
      })
    }
  }

  return (
    <DefaultLayout
      tituloPagina="Abrir Chamado"
      mostrarBotaoTema
      barraDeFerramentas={
        <BarraFerramentasDetalhesChamado
          aoClicarEmNovo={() => navigate('/abrir-chamado')}
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
        />
      }
    >
      <Box
        borderRadius={1}
        margin={1}
        width="auto"
        border="1px solid"
        borderColor={theme.palette.divider}
      >
        <Form ref={formRef} onSubmit={triggerSave}>
          <Grid container direction="column" padding={2} spacing={2}>
            <Grid container item direction="row">
              <Grid item lg={6} sm={12} xs={12}>
                <VTextField name="titulo" placeholder="Título" fullWidth />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item lg={4} sm={12} xs={12}>
                <VTextField
                  name="categoria"
                  placeholder="Categoria"
                  fullWidth
                />
              </Grid>
              <Grid item lg={4} sm={12} xs={12} sx={{ marginY: 'auto' }}>
                <Tooltip title="Anexar arquivo" placement="top" arrow>
                  <IconButton aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" />
                    <AiOutlinePaperClip />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item lg={6} sm={8} xs={12}>
                <VTextField
                  name="descricao"
                  placeholder="Descrição"
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          </Grid>

          <VTextField name="author" placeholder="Autor" fullWidth />

          <VTextField name="publishedAt" placeholder="publishedAt" fullWidth />
        </Form>
      </Box>
    </DefaultLayout>
  )
}

export default AbrirChamado
