import { Card, Box, CardContent, Typography } from '@mui/material'
import React from 'react'

interface CardHelpDesksConcluidosProps {
  numberOfCompleted: string
}

export const CardHelpDesksConcluidos: React.FC<
  CardHelpDesksConcluidosProps
> = ({ numberOfCompleted }) => {
  return (
    <Card elevation={0} variant="outlined">
      <CardContent>
        <Box>
          <Typography variant="h6" sx={{ margin: 'auto' }}>
            HelpDesks Concluídos
          </Typography>
          <Box display="flex" gap={2} width="100%" alignItems="center">
            <Typography
              variant="body2"
              fontSize={45}
              color="text.secondary"
              sx={{ margin: 'auto' }}
            >
              {numberOfCompleted}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
