import {
  Box,
  Icon,
  IconButton,
  TextField,
  Tooltip,
  useTheme,
} from '@mui/material'
import React from 'react'

import { Environment } from '../../environment/export'
import { BsPlus } from 'react-icons/bs'
import { FaFilter } from 'react-icons/fa'
import { AiFillHome } from 'react-icons/ai'

import { useNavigate } from 'react-router-dom'

interface IBarraFerramentasAbrirChamado {
  textoBusca?: string
  mostrarInputBusca?: boolean

  mostrarBotaoHome?: boolean
  mostrarBotaoNovo?: boolean
  mostrarBotaoFiltro?: boolean

  aoMudarTextoDeBusca?: (novoTexto: string) => void
  aoClicarEmNovo: () => void
  aoClicarEmFiltrar: () => void
}

export const BarraFerramentasListagemDeChamados: React.FC<
  IBarraFerramentasAbrirChamado
> = ({
  textoBusca = '',

  mostrarBotaoHome = true,
  mostrarInputBusca = false,
  mostrarBotaoNovo = true,
  mostrarBotaoFiltro = true,

  aoMudarTextoDeBusca,
  aoClicarEmNovo,
  aoClicarEmFiltrar,
}) => {
  const theme = useTheme()
  const navigate = useNavigate()

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
        />
      )}
      <Box display="flex" flex={1} justifyContent="end">
        {mostrarBotaoHome && (
          <Tooltip title="Página Inicial" placement="top" arrow>
            <IconButton onClick={() => navigate('/home/dashboard')}>
              <Icon>
                <AiFillHome size={20} />
              </Icon>
            </IconButton>
          </Tooltip>
        )}
        {mostrarBotaoNovo && (
          <Tooltip title="Abrir Chamado" placement="top" arrow>
            <IconButton onClick={aoClicarEmNovo}>
              <Icon>
                <BsPlus size={25} />
              </Icon>
            </IconButton>
          </Tooltip>
        )}
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
