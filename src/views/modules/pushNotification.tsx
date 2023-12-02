import React from 'react'
import { Box } from '@mui/material'
import BasicTypography from 'src/ui/typography/typography'
import ModalUi from 'src/ui/ModalUI/modalUi'

const PushNotificationUi = () => {

  return (
    <Box sx={{ paddingTop: '1.5rem' }}>
      <Box>
        <BasicTypography variant='h5' color='primary'>
          Push Notification
        </BasicTypography>
        <ModalUi />
      </Box>
    </Box>
  )
}

export default PushNotificationUi
