import { Box, useTheme } from '@mui/material'
import React from 'react'

const Chat: React.FC = () => {
  const theme = useTheme()
  return (
    <Box
      bgcolor={theme.palette.background.default}
      display={'flex'}
      height={250}
    >
      Interaction Here
    </Box>
  )
}

export default Chat
