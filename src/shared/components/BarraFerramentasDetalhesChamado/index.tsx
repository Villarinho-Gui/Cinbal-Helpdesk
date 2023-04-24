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
import { BsFillSendFill } from 'react-icons/bs'
import { MdDelete, MdOutlineEmojiPeople } from 'react-icons/md'
// import { ChamadosService } from '../../services/api/Chamados/ChamadosServices'

interface IBarraFerramentasDetalhesChamadoProps {
  mostrarBotaoVoltar?: boolean
  mostrarBotaoNovo?: boolean
  mostrarBotaoSalvar?: boolean
  mostrarBotaoDeletar?: boolean
  mostrarBotaoAssumirChamado?: boolean

  aoClicarEmVoltar?: () => void
  aoClicarEmNovo?: () => void
  aoClicarEmSalvar?: () => void
  aoClicarEmAssumirChamado?: void
}

const BarraFerramentasDetalhesChamado: React.FC<
  IBarraFerramentasDetalhesChamadoProps
> = ({
  mostrarBotaoVoltar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoNovo = true,
  mostrarBotaoDeletar = true,
  mostrarBotaoAssumirChamado,

  aoClicarEmVoltar,
  aoClicarEmNovo,
  aoClicarEmSalvar,
}) => {
  const theme = useTheme()

  // const triggerDeleteChamado = (id: number) => {
  //   ChamadosService.deleteById(id).then((result) => {
  //     if (result instanceof Error) {
  //       alert(result.message)
  //     }
  //   })
  //   console.log('Deletar')
  // }

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
        {mostrarBotaoSalvar && (
          <Tooltip title="Abrir chamado" placement="top" arrow>
            <IconButton onClick={aoClicarEmSalvar}>
              <Icon>
                <BsFillSendFill size={18} />
              </Icon>
            </IconButton>
          </Tooltip>
        )}
        {mostrarBotaoAssumirChamado && (
          <Tooltip title="Assumir Chamado" placement="top" arrow>
            <IconButton>
              <Icon>
                <MdOutlineEmojiPeople />
              </Icon>
            </IconButton>
          </Tooltip>
        )}
        {mostrarBotaoDeletar && (
          <IconButton>
            <Icon>
              <MdDelete />
            </Icon>
          </IconButton>
        )}
      </Box>
    </Box>
  )
}

export default BarraFerramentasDetalhesChamado
