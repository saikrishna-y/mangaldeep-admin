import * as React from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'

type FieldError = any
interface CheckboxProps {
  label: string
  onChange?: (e: any) => void
  value?: string
  checked?: boolean
  name?: string
  error?: string | undefined | FieldError
}

export default function CheckboxLabels({ label, onChange, name, checked, error }: CheckboxProps) {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label={<Typography className='fontClass'>{label}</Typography>}
            checked={checked}
            onChange={onChange}
            name={name}
            sx={{ marginLeft: 'inherit', paddingRight: '10px' }}
          />
        </FormGroup>
        <p style={{ color: 'red' }}>{error}</p>
      </Grid>
    </Grid>
  )
}
