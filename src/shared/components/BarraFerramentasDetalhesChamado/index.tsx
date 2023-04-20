import { Box, Divider, Icon, IconButton, useTheme } from '@mui/material'
import React from 'react'
import { BiPlus } from 'react-icons/bi'
import { AiOutlineArrowLeft } from 'react-icons/ai'
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
  mostrarBotaoNovo = true,
  mostrarBotaoDeletar = true,
  mostrarBotaoAssumirChamado,

  aoClicarEmVoltar,
  aoClicarEmNovo,
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
        {mostrarBotaoNovo && (
          <IconButton onClick={aoClicarEmNovo}>
            <Icon>
              <BiPlus />
            </Icon>
          </IconButton>
        )}
        {mostrarBotaoAssumirChamado && (
          <IconButton>
            <Icon>
              <MdOutlineEmojiPeople />
            </Icon>
          </IconButton>
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
