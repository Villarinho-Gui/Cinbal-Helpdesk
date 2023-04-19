import React from 'react'
import DefaultLayout from '../../shared/layouts/DefaultLayout'
import {
  Autocomplete,
  Box,
  Icon,
  IconButton,
  TextField,
  useTheme,
} from '@mui/material'
import BarraFerramentasDetalhesChamado from '../../shared/components/BarraFerramentasDetalhesChamado'
import { useNavigate } from 'react-router-dom'

import { FiPaperclip } from 'react-icons/fi'

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
        <form className="AbrirChamadoForm" method="post">
          <Box display="flex" gap={1}>
            <Autocomplete
              disablePortal
              options={categorias}
              sx={{ width: '300px' }}
              renderInput={(params) => (
                <TextField {...params} label="Categoria" />
              )}
            />
            <IconButton size="medium">
              <input type="file" multiple hidden />
              <Icon>
                <FiPaperclip />
              </Icon>
            </IconButton>
          </Box>

          <Box sx={{ minWidth: 120, paddingTop: 3 }}>
            <TextField
              id="titulo_id"
              name="titulo"
              label="Título"
              variant="outlined"
              sx={{ width: '450px' }}
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
              sx={{ width: '500px' }}
            />
          </Box>
        </form>
      </Box>
    </DefaultLayout>
  )
}

export default AbrirChamado
