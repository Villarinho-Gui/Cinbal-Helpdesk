import React from 'react'
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
import FilterListIcon from '@mui/icons-material/FilterList'

import { Environment } from '../../environment/export'
interface IBarraFerramentasAbrirChamado {
  textoBusca?: string
  mostrarInputBusca?: boolean
  mostrarBotaoFiltro?: boolean

  aoMudarTextoDeBusca?: (novoTexto: string) => void
  aoClicarBotaoFiltro?: () => void
}

export const BarraFerramentasListagemDeChamados: React.FC<
  IBarraFerramentasAbrirChamado
> = ({
  textoBusca = '',
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  mostrarBotaoFiltro,
  aoClicarBotaoFiltro,
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

      {mostrarBotaoFiltro && (
        <Tooltip title="Filtrar" placement="top" arrow>
          <IconButton onClick={aoClicarBotaoFiltro}>
            <Icon>
              <FilterListIcon />
            </Icon>
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}
