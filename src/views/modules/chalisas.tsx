import React, { useState } from 'react'

import { Box } from '@mui/material'
import { useQuery } from 'react-query'

import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModalUi from 'src/ui/ModalUI/modalUi'
import { client } from 'src/utlis/axios'

const columnData = [
  {
    name: 'Name',
    id: 'name'
  },
  {
    name: 'Deity Name',
    id: 'Deities.name'
  },
  {
    name: 'Locales',
    id: 'locales.name'
  }
]

const fetchChalisas = async () => {
  return await client.get('/api/modules/mantras/chalisas')
}

const ChalisasUi = () => {
  const [open, setOpen] = useState(false)

  const { isLoading, data } = useQuery('Chalisas', fetchChalisas)

  const onButtonClick = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const onSave = () => {
    document.getElementById('add')?.click()
    setOpen(false)
  }

  return (
    <Box>
      <TableUI
        isModule={true}
        tableHeaderText='Chalisas'
        addButtonText='Add New Chalisa'
        onClick={onButtonClick}
        columns={columnData}
        rows={data}
        isLoading={isLoading}
      />
      <CustomizedDialogs open={open} onClose={onClose} onSave={onSave}>
        <ModalUi onClose={onClose} isModule={true} />
      </CustomizedDialogs>
    </Box>
  )
}

export default ChalisasUi
