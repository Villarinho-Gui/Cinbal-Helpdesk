import React from 'react'
import DefaultLayout from '../../shared/layouts/DefaultLayout'
import { Box, Button, useTheme } from '@mui/material'
import BarraFerramentasDetalhesChamado from '../../shared/components/BarraFerramentasDetalhesChamado'
import { useNavigate } from 'react-router-dom'
import { Form } from '@unform/web'
import { VTextField } from '../../shared/Form/export'

const AbrirChamado: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  return (
    <DefaultLayout
      tituloPagina="Abrir Chamado"
      mostrarBotaoTema
      barraDeFerramentas={
        <BarraFerramentasDetalhesChamado
          aoClicarEmNovo={() => navigate('/abrir-chamado')}
        />
      }
    >
      <Box
        padding={5}
        borderRadius={1}
        margin={1}
        width="50%"
        border="1px solid"
        borderColor={theme.palette.divider}
      >
        <Form onSubmit={(dados) => console.log(dados)}>
          <VTextField name="Titulo" />
          <Button type="submit">Abrir Chamado</Button>
        </Form>
      </Box>
    </DefaultLayout>
  )
}

export default AbrirChamado
