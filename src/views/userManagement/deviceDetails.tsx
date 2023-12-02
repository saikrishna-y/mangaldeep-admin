import React from 'react'

import { Box } from '@mui/material'

import TableUI from 'src/views/TableUI/tableUi'

const DeviceDetailsUi = () => {
  return (
    <Box>
      <TableUI addButtonText='Refresh Page' tableHeaderText='Device Details' />
    </Box>
  )
}

export default DeviceDetailsUi
