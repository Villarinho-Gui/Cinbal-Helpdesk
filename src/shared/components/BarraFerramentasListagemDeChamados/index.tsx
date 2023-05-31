import {
  Box,
  Icon,
  IconButton,
  TextField,
  Tooltip,
  useTheme,
} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import React from 'react'

import { Environment } from '../../environment/export'
import { FaFilter } from 'react-icons/fa'
interface IBarraFerramentasAbrirChamado {
  textoBusca?: string
  mostrarInputBusca?: boolean
  mostrarBotaoFiltro?: boolean

  aoMudarTextoDeBusca?: (novoTexto: string) => void
  aoClicarEmFiltrar: () => void
}

export const BarraFerramentasListagemDeChamados: React.FC<
  IBarraFerramentasAbrirChamado
> = ({
  textoBusca = '',
  mostrarInputBusca = false,
  mostrarBotaoFiltro = true,
  aoMudarTextoDeBusca,
  aoClicarEmFiltrar,
}) => {
  const theme = useTheme()

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding={1}
      gap={1}
      height={theme.spacing(5)}
    >
      {mostrarInputBusca && (
        <TextField
          size="small"
          fullWidth
          placeholder={Environment.INPUT_DE_BUSCA}
          value={textoBusca}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
      <Box display="flex" flex={1} justifyContent="end">
        {mostrarBotaoFiltro && (
          <Tooltip title="Filtrar" placement="top" arrow>
            <IconButton onClick={aoClicarEmFiltrar}>
              <Icon>
                <FaFilter size={18} />
              </Icon>
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  )
}
