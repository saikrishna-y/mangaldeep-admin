import React, { useState } from 'react'

import Box from '@mui/material/Box'
import { useQuery } from 'react-query'

import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModalUi from 'src/ui/ModalUI/modalUi'
import { client } from 'src/utlis/axios'

const columnData = [
  {
    name: 'Version Date',
    id: 'version_date'
  },
  {
    name: 'Version Number',
    id: 'version_number'
  },
  {
    name: 'Build Number',
    id: 'build_number'
  },
  {
    name: 'Is Backward Compatible',
    id: 'is_backward_compatible'
  },
  {
    name: 'Device',
    id: 'device_type_id'
  }
]

const fetchReleaseManagement = async () => {
  return await client.get('/api/masters/releaseManagement')
}

const ReleaseManagementUi = () => {
  const [open, setOpen] = useState(false)

  const { isLoading, data } = useQuery('ReleaseManagement', fetchReleaseManagement) as any

  const onButtonClick = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const onSave = () => {
    // setOpen(false)

    document.getElementById('add')?.click()
    setOpen(false)
  }

  return (
    <Box>
      <TableUI
        tableHeaderText='Release Categories'
        addButtonText='Add Version'
        onClick={onButtonClick}
        columns={columnData}
        rows={data}
        isLoading={isLoading}
      />
      <Box>
        <CustomizedDialogs open={open} onClose={onClose} onSave={onSave}>
          <ModalUi />
        </CustomizedDialogs>
      </Box>
    </Box>
  )
}

export default ReleaseManagementUi
