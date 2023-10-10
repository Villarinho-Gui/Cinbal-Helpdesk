import { Card, Box, CardContent, Typography } from '@mui/material'
import React from 'react'

interface CardHelpDesksEmAndamentoProps {
  quantityInProgress: string
}

export const CardHelpDesksEmAndamento: React.FC<
  CardHelpDesksEmAndamentoProps
> = ({ quantityInProgress }) => {
  return (
    <Card elevation={0} variant="outlined">
      <CardContent>
        <Box>
          <Typography variant="h6" sx={{ margin: 'auto' }}>
            Em Andamento
          </Typography>
          <Box display="flex" gap={2} width="100%" alignItems="center">
            <Typography
              variant="body2"
              fontSize={45}
              color="text.secondary"
              sx={{ margin: 'auto' }}
            >
              {quantityInProgress}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
