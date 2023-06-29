import React, { useState } from 'react'
import { Box, useTheme } from '@mui/material'
import { MessageTextField } from './components/MessageTextField'
import { MessageComponent } from './components/MessageComponent'

// interface SendMessageListProps {
//   user: {
//     name: string
//   }
//   createdAt: Date
//   content: string
//   files?: File[]
// }

export const Chat: React.FC = () => {
  // const [sendMessage, setSendMessage] = useState('')
  // const [textFieldText, setTextFieldText] = useState('')
  const theme = useTheme()

  // Função de envio

  return (
    <>
      <Box
        bgcolor={theme.palette.background.default}
        display={'flex'}
        justifyContent={'end'}
        height={250}
      >
        <MessageComponent />
      </Box>
      <MessageTextField />
    </>
  )
}
