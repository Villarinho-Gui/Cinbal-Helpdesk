import React, { useEffect, useState } from 'react'

import { TextField, TextFieldProps } from '@mui/material'
import { useField } from '@unform/core'

type TVTextField = TextFieldProps & {
  name: string
}

export const VTextField: React.FC<TVTextField> = ({ name, ...rest }) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name)

  const [value, setValue] = useState(defaultValue || '')

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    })
  }, [registerField, fieldName, value])

  return (
    <TextField
      {...rest}
      value={value}
      error={!!error}
      helperText={error}
      defaultValue={defaultValue}
      onKeyDown={() => (error ? clearError() : undefined)}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
