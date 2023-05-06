/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import DefaultLayout from '../../shared/layouts/DefaultLayout'
import { Box, Grid, useTheme } from '@mui/material'

import { useNavigate, useParams } from 'react-router-dom'
import { VTextField, VForm, useVForm } from '../../shared/Form/export'
// import { ChamadosService } from '../../shared/services/api/Chamados/ChamadosServices'

import * as yup from 'yup'
import { SelectCategoria } from '../../shared/Form/SelectCategoria'
import { BarraFerramentasAbrirNovoChamado } from '../../shared/components/BarraFerramentasAbrirNovoChamado'

interface IFormData {
  author: string
  titulo: string
  descricao: string
  publishedAt: Date
}

const formValidationSchema = yup
  .object({
    titulo: yup
      .string()
      .required('Esse campo precisa ser preenchido')
      .min(3, 'Deve ter no mínimo 3 caracteres')
      .max(50, 'Deve conter no máximo 50 caracteres'),
    categoria: yup.string().required('Esse campo precisa ser preenchido'),
    descricao: yup
      .string()
      .required('Esse campo precisa ser preenchido')
      .min(3, 'Deve ter no mínimo 3 caracteres')
      .max(300, 'Deve conter no máximo 300 caracteres'),
  })
  .required()

const AbrirChamado: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { id = 'novo' } = useParams<'id'>()

  const theme = useTheme()
  const navigate = useNavigate()

  const { formRef, save, isSaveAndClose, reset } = useVForm()

  // const triggerSave = (dados: IFormData) => {
  //   formValidationSchema
  //     .validate(dados, { abortEarly: false })
  //     .then((dadosValidados) => {
  //       if (id === 'novo') {
  //         setIsLoading(true)
  //         ChamadosService.create(dadosValidados).then((result) => {
  //           setIsLoading(true)
  //           if (result instanceof Error) {
  //             alert(result.message)
  //           } else {
  //             if (isSaveAndClose()) {
  //               navigate(`/chamados`)
  //             } else {
  //               navigate(`/chamados/detalhe/${result}`)
  //             }
  //           }
  //         })
  //       } else {
  //         ChamadosService.updateById(Number(id), {
  //           id: Number(id),
  //           ...dadosValidados,
  //           chamadoId: 0,
  //           setor: '',
  //           categoria: '',
  //           attachedFile: [0],
  //           author: '',
  //           publishedAt: Date,
  //         }).then((result) => {
  //           setIsLoading(true)
  //           if (result instanceof Error) {
  //             alert(result.message)
  //           } else {
  //             navigate(`/chamados/detalhe/${result}/${id}`)
  //           }
  //         })
  //       }
  //     })
  //     .catch((errors: yup.ValidationError) => {
  //       const validationErrors: { [key: string]: string } = {}

  //       errors.inner.forEach((error) => {
  //         // eslint-disable-next-line no-useless-return
  //         if (!error.path) return

  //         validationErrors[error.path] = error.message
  //       })
  //       console.log(validationErrors)

  //       formRef.current?.setErrors(validationErrors)
  //     })
  // }

  return (
    <DefaultLayout
      tituloPagina="Abrir Chamado"
      mostrarBotaoTema
      mostrarBotaoLogout
      mostrarBotaoPerfil
      barraDeFerramentas={
        <BarraFerramentasAbrirNovoChamado
          aoCLicarEmEnviar={save}
          aoClicarEmLimpar={reset}
          mostrarBotaoAnexarArquivo
          aoClicarEmAnexar={() => {}}
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
        {/* <VForm ref={formRef} onSubmit={triggerSave} action="POST">
          <Grid container direction="column" padding={2} spacing={2}>
            <Grid container item direction="row">
              <Grid item lg={6} sm={12} xs={12}>
                <VTextField
                  type="text"
                  placeholder="Título"
                  label="Título"
                  fullWidth
                  name="titulo"
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item lg={4} sm={12} xs={12}>
                <SelectCategoria name="categoria" />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item lg={6} sm={8} xs={12}>
                <VTextField
                  type="text"
                  name="descricao"
                  placeholder="Descrição"
                  label="Descrição"
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          </Grid>

          <VTextField name="author" placeholder="Autor" fullWidth />

          <VTextField name="publishedAt" placeholder="publishedAt" fullWidth />
        </VForm> */}
      </Box>
    </DefaultLayout>
  )
}

export default AbrirChamado
