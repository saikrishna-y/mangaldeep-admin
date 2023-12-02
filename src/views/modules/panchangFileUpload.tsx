import React from 'react'
import { useQuery } from 'react-query'
import Box from '@mui/material/Box'
import BasicTypography from 'src/ui/typography/typography'
import ModalUi from 'src/ui/ModalUI/modalUi'
import { client } from '../../utlis/axios'

const fetchJSONTemplate = async () => {
  return await client.get('/api/template')
}

const PanchangFileUploadUi = () => {
  const panchangTemplate = useQuery('JSONTemplate', fetchJSONTemplate)
  console.log('panchangTemplate', panchangTemplate)

  return (
    <Box sx={{ paddingTop: '1.5rem' }}>
      <Box>
        <BasicTypography variant='h5' color='primary'>
          Panchang Excel File Upload
        </BasicTypography>
      </Box>
      <Box>
        <ModalUi isModule={true} />
      </Box>
    </Box>
  )
}

export default PanchangFileUploadUi
