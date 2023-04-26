import {
  Box,
  Divider,
  Icon,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material'
import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { MdOutlineEmojiPeople } from 'react-icons/md'

interface IBarraFerramentasDetalhesChamadoProps {
  mostrarBotaoVoltar?: boolean
  mostrarBotaoAssumirChamado?: boolean

  aoClicarEmVoltar?: () => void
  aoClicarEmAssumirChamado?: void
}

const BarraFerramentasDetalhesChamado: React.FC<
  IBarraFerramentasDetalhesChamadoProps
> = ({
  mostrarBotaoVoltar = true,
  mostrarBotaoAssumirChamado,
  aoClicarEmVoltar,
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
        {mostrarBotaoAssumirChamado && (
          <Tooltip title="Assumir Chamado" placement="top" arrow>
            <IconButton>
              <Icon>
                <MdOutlineEmojiPeople />
              </Icon>
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  )
}

export default BarraFerramentasDetalhesChamado
