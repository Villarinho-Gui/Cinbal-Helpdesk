import { Box, Button, TextField, useTheme } from '@mui/material'
import React from 'react'

import { BiPlus } from 'react-icons/bi'

interface IBarraFerramentasAbrirChamado {
  textoBusca?: string
  mostrarInputBusca?: boolean
  aoMudarTextoDeBusca?: (novoTexto: string) => void
  textoBotaoNovo?: string
  mostrarBotaoNovo?: boolean
  aoClicarEmNovo?: (novoTexto: string) => void
}

const BarraFerramentasAbrirChamado: React.FC<IBarraFerramentasAbrirChamado> = ({
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  textoBusca = '',
  aoClicarEmNovo,
  mostrarBotaoNovo = true,
  textoBotaoNovo = 'Abrir novo Chamado',
}) => {
  const theme = useTheme()

  return (
    <Box
      border="1px solid"
      borderColor={theme.palette.divider}
      borderRadius={1}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding={1}
      paddingX={1}
      marginX={1}
      gap={1}
      height={theme.spacing(5)}
    >
      {mostrarInputBusca && (
        <TextField
          size="small"
          placeholder="Pesquisar..."
          value={textoBusca}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
        />
      )}
      <Box display="flex" flex={1} justifyContent="end">
        {mostrarBotaoNovo && (
          <Button
            variant="contained"
            size="medium"
            endIcon={<BiPlus />}
            disableElevation
            onClick={() => aoClicarEmNovo}
            sx={{ position: 'relative', right: '22px' }}
          >
            {textoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default BarraFerramentasAbrirChamado
