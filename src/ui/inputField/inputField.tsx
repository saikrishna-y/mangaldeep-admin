import React from 'react'
import FormControl from '@mui/material/FormControl'

import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'

interface inputFieldProps {
  type: string
  onChange: () => void
  value?: any
  label: string
}

const InputField = ({ type, onChange, value, label }: inputFieldProps) => {
  return (
    <FormControl>
      <InputLabel htmlFor='component-outlined'>{label}</InputLabel>
      <OutlinedInput
        id='component-outlined'
        defaultValue='Composed TextField'
        label={label}
        type={type}
        onChange={onChange}
        color='primary'
        value={value}
      />
    </FormControl>
  )
}

export default InputField
