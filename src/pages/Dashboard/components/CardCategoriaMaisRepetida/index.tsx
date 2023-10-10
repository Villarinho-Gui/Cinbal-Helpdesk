import { Card, Box, CardContent, Typography } from '@mui/material'
import React from 'react'

interface CardCategoriaMaisRepetidaProps {
  maxCategory: string
}

export const CardCategoriaMaisRepetida: React.FC<
  CardCategoriaMaisRepetidaProps
> = ({ maxCategory }) => {
  return (
    <Card elevation={0} variant="outlined">
      <CardContent>
        <Box>
          <Typography variant="h6" sx={{ margin: 'auto' }}>
            Categoria mais aparente:
          </Typography>
          <Box display="flex" gap={2} width="100%" alignItems="center">
            <Typography variant="body2" fontSize={20} color="text.secondary">
              {maxCategory}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
