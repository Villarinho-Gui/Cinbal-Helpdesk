import React from 'react'
import {
  Box,
  Divider,
  Icon,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material'

import { FaBroom } from 'react-icons/fa'
import { BsSendFill } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai'

interface IBarraFerramentasAbrirNovoChamadoProps {
  textoBusca?: string

  mostrarBotaoVoltar?: boolean
  mostrarBotaoEnviarChamado?: boolean
  mostrarBotaoFiltro?: boolean
  mostrarBotaoLimpar?: boolean

  aoClicarEmVoltar?: () => void
  aoClicarEmLimpar?: () => void
  aoCLicarEmEnviar?: () => void
}

export const BarraFerramentasAbrirNovoChamado: React.FC<
  IBarraFerramentasAbrirNovoChamadoProps
> = ({
  mostrarBotaoEnviarChamado = true,
  mostrarBotaoLimpar = true,
  mostrarBotaoVoltar = true,

  aoCLicarEmEnviar,
  aoClicarEmVoltar,
  aoClicarEmLimpar,
}) => {
  const theme = useTheme()

  return (
    <Box
      border="1px solid"
      borderColor={theme.palette.divider}
      borderRadius={1}
      display="flex"
      alignItems="center"
      padding={1}
      paddingX={1}
      marginX={1}
      gap={1}
      height={theme.spacing(5)}
    >
      {mostrarBotaoVoltar && (
        <IconButton onClick={aoClicarEmVoltar}>
          <Icon>
            <AiOutlineArrowLeft />
          </Icon>
        </IconButton>
      )}
      <Divider variant="middle" orientation="vertical" />
      <Box display="flex" flex={1} justifyContent="end">
        {mostrarBotaoEnviarChamado && (
          <Tooltip title="Abrir Chamado" placement="top" arrow>
            <IconButton onClick={aoCLicarEmEnviar}>
              <Icon>
                <BsSendFill size={18} />
              </Icon>
            </IconButton>
          </Tooltip>
        )}
        {mostrarBotaoLimpar && (
          <Tooltip title="Limpar Campos" placement="top" arrow>
            <IconButton>
              <Icon>
                <FaBroom size={18} />
              </Icon>
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  )
}
