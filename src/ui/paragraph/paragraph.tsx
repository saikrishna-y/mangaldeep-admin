import React from 'react'

import { Box } from '@mui/material'

import BasicTypography from '../typography/typography'
import RadioButton from '../radioButton/radioButton'

interface ParagraphProps {
  register?: any
  data?: any
  setValue?: any
}

const Paragraph = ({ register, data, setValue }: ParagraphProps) => {
  console.log('kdsjfkasjfkjas', data)

  return (
    <Box>
      <Box>
        <BasicTypography variant='p'>{data.label}</BasicTypography>
      </Box>
      {data.hasRadioButtons ? <RadioButton data={data?.data} setValue={setValue} register={register} /> : ''}
    </Box>
  )
}

export default Paragraph
