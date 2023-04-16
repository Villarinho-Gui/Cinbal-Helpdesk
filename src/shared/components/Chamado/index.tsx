import { Card } from '@mui/material'
import React from 'react'

const Chamado: React.FC = () => {
  return (
    <Card
      variant="elevation"
      sx={{
        height: 80,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      Chamado de Guilherme
    </Card>
  )
}

export default Chamado
