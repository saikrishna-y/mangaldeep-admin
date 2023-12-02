import React, { useState } from 'react'

import Box from '@mui/material/Box'
import { useQuery } from 'react-query'

import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModalUi from 'src/ui/ModalUI/modalUi'
import { client } from 'src/utlis/axios'

const columnData = [
  {
    name: 'Title',
    id: 'name'
  },
  {
    name: 'Module Name',
    id: 'module_name'
  }
]

const fetchDynamicHeader = async () => {
  return await client.get('/api/masters/modules/dynamicHeader')
}

const DynamicHeaderUi = () => {
  const [open, setOpen] = useState(false)

  const { isLoading, data } = useQuery('DynamicHeader', fetchDynamicHeader) as any

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
        tableHeaderText='Dynamic Header Status'
        addButtonText='Add New Dynamic Header'
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

export default DynamicHeaderUi
