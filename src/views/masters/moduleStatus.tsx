import React, { useState } from 'react'

import Box from '@mui/material/Box'
import { useQuery } from 'react-query'

import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModalUi from 'src/ui/ModalUI/modalUi'
import { client } from 'src/utlis/axios'

const columnData = [
  {
    name: 'Module Name',
    id: 'module_name'
  }
]

const fetchModuleStatus = async () => {
  return await client.get('/api/masters/modules/moduleStatus')
}

const ModuleStatusUi = () => {
  const [open, setOpen] = useState(false)

  const { isLoading, data } = useQuery('ModuleStatus', fetchModuleStatus) as any

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
        tableHeaderText='Module Status'
        addButtonText='Add New Module'
        onClick={onButtonClick}
        columns={columnData}
        rows={data}
        isLoading={isLoading}
      />
      <CustomizedDialogs open={open} onClose={onClose} onSave={onSave}>
        <ModalUi />
      </CustomizedDialogs>
    </Box>
  )
}

export default ModuleStatusUi
