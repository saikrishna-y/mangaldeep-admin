import React from 'react'
import { Box } from '@mui/material'

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'

interface RadioButtonProps {
  register: any;
  data: { type: string; label: string, name: string }[],
  setValue: any
}

const RadioButton = ({ register, data, setValue }: RadioButtonProps) => {
  console.log('sakdflksajfdka', data)

  const onRadioChange = (e: any) => {
    setValue('send_type', e.target.value)
  }

  return (
    <Box>
      <FormControl>
        <RadioGroup row aria-labelledby='demo-radio-buttons-group-label' name='radios' onChange={onRadioChange}>
          {data?.map((item, index) => (
            <FormControlLabel key={index} value={item.name} {...register('send_type')} control={<Radio />} label={item.label} />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

export default RadioButton
