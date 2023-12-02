import * as React from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { Noop } from 'react-hook-form'

type FieldError = any
interface BasicTextFieldProps {
  margin?: string
  width?: string
  label?: string
  sx?: any
  helperText?: string
  required?: boolean
  fullWidth?: boolean
  type?: string
  placeholder?: string
  multiline?: boolean
  rows?: number
  onChange?: (event: any) => void
  onBlur?: Noop
  name?: string
  value?: string
  error?: string | undefined | FieldError
}

const useStyles = makeStyles(() => ({
  multilineInput: {
    padding: '0 0 0 12px',
    height: '45px',
    '& .MuiInputBase-input': {
      padding: 0
    },
    '& .MuiInputBase-multiline': {
      padding: 0
    }
  },
  inputLabel: {
    '&.Mui-focused': {
      top: '0'
    }
  },
  input: {
    '& input[type=number]': {
      '-moz-appearance': 'textfield'
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    }
  },
  error: {
    border: '1px red solid',
    borderRadius: '10px'
  }
}))

const BasicTextField = ({
  margin,
  width,
  label,
  sx,
  helperText,
  required,
  fullWidth,
  type,
  placeholder,
  rows,
  onChange,
  name,
  value,
  error
}: BasicTextFieldProps) => {
  const classes = useStyles()

  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: { margin }, width: { width } }
      }}
      noValidate
      autoComplete='off'
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12}>
          <TextField
            id='date'
            label={label}
            variant='outlined'
            sx={sx}
            helperText={helperText}
            required={required}
            fullWidth={fullWidth}
            type={type}
            placeholder={placeholder}
            rows={rows}
            name={name}
            value={value}
            onChange={onChange}
            InputProps={{ className: `${classes.multilineInput} fontClass` }}
            InputLabelProps={{ className: classes.inputLabel + classes.input }}
            className={error ? classes.error : ''}
          />
          <p style={{ color: 'red' }}>{error}</p>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BasicTextField
