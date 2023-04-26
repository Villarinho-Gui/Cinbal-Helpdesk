import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material'
import { useField } from '@unform/core'
import React, { useEffect, useState } from 'react'

type TVSelectValue = SelectProps & {
  name: string
}

interface ICategoria {
  categoria:
    | 'Email'
    | 'Telefone'
    | 'Rede'
    | 'Fluig'
    | 'Hardware'
    | 'Software'
    | 'PCFactory'
    | 'Preactor'
    | 'Protheus'
    | 'Vexon '
    | 'PortalDoCliente'
    | 'Outros'
}

export const SelectCategoria: React.FC<TVSelectValue> = ({ name, ...rest }) => {
  const { fieldName, registerField, defaultValue, error } = useField(name)

  const [categoria, setCategoria] = useState<ICategoria>(defaultValue || '')

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => categoria,
      setValue: (_, newValue) => setCategoria(newValue),
    })
  }, [registerField, fieldName, categoria])

  return (
    <FormControl>
      <InputLabel> Categoria</InputLabel>
      <Select
        {...rest}
        value={categoria}
        label="Categoria"
        error={!!error}
        size="medium"
        sx={{ width: '350px' }}
        onChange={(e) => {
          setCategoria(e.target.value)
        }}
        defaultValue={defaultValue}
      >
        <MenuItem value="Email">Email</MenuItem>
        <MenuItem value="Telefone">Telefone</MenuItem>
        <MenuItem value="Fluig">Fluig</MenuItem>
        <MenuItem value="Hardware">Hardware</MenuItem>
        <MenuItem value="Software">Software</MenuItem>
        <MenuItem value="PCFactory">PC Factory</MenuItem>
        <MenuItem value="Preactor">Preactor</MenuItem>
        <MenuItem value="Protheus">Protheus</MenuItem>
        <MenuItem value="Vexon">Vexon</MenuItem>
        <MenuItem value="PortalDoCliente">Portal do Cliente</MenuItem>
        <MenuItem value="Outros">Outros</MenuItem>
      </Select>
    </FormControl>
  )
}
