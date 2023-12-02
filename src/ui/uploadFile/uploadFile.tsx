import React from 'react'

import { Box } from '@mui/material'

import BasicTypography from '../typography/typography'

interface FileProps {
  register?: any
  data?: any
  setValue?: any
}

const UploadFile = ({ register, setValue }: FileProps) => {
  const onFileUploadChange = async (event: any) => {
    console.log('uploading a file', event.target.files[0])
    const formData = new FormData()
    formData.append('file', event.target.files[0], event.target.files[0].name)
    console.log(formData, 'formData')
    const fileName = event.target.files[0].name
    console.log(fileName, formData)

    setValue('file_url', fileName)
  }

  return (
    <Box>
      <Box sx={{ py: 5 }}>
        <BasicTypography variant='h6' color='black'>
          Excel File Upload:
        </BasicTypography>
        <Box>
          <input type='file' name='file_url' {...register('file_url')} onChange={onFileUploadChange} />
        </Box>
      </Box>
    </Box>
  )
}

export default UploadFile
