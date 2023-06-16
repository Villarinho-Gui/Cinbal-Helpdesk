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
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

import { Environment } from '../../environment/export'
import { BsFillCalendar2XFill } from 'react-icons/bs'
interface IBarraFerramentasAbrirChamado {
  textoBusca?: string
  mostrarInputBusca?: boolean
  mostrarBotaoFiltro?: boolean
  mostrarBotaoLimparFiltro?: boolean

  aoMudarTextoDeBusca?: (novoTexto: string) => void
  aoClicarBotaoFiltro?: () => void
  aoClicarBotaoLimparFiltro?: () => void
}

export const BarraFerramentasListagemDeChamados: React.FC<
  IBarraFerramentasAbrirChamado
> = ({
  textoBusca = '',
  mostrarInputBusca = false,
  mostrarBotaoLimparFiltro,
  aoMudarTextoDeBusca,
  aoClicarBotaoFiltro,
  aoClicarBotaoLimparFiltro,
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

      {mostrarBotaoLimparFiltro ? (
        <Tooltip title="Remover Filtro" placement="top" arrow>
          <IconButton onClick={aoClicarBotaoLimparFiltro}>
            <Icon>
              <BsFillCalendar2XFill />
            </Icon>
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filtrar por data" placement="top" arrow>
          <IconButton onClick={aoClicarBotaoFiltro}>
            <Icon>
              <CalendarTodayIcon />
            </Icon>
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}
