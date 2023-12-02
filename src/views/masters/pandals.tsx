import React, { useState } from 'react'

import Box from '@mui/material/Box'
import { useQuery } from 'react-query'

import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModalUi from 'src/ui/ModalUI/modalUi'
import { client } from 'src/utlis/axios'

const columnData = [
  {
    name: 'Deity',
    id: 'name'
  },
  {
    name: 'Name',
    id: 'name'
  },
  {
    name: 'Locales',
    id: 'locales.name'
  }
]

const fetchPandals = async () => {
  return await client.get('/api/masters/pandals')
}

const PandalsUi = () => {
  const [open, setOpen] = useState(false)

  const { isLoading, data } = useQuery('Pandals', fetchPandals) as any

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
        tableHeaderText='Pandals'
        addButtonText='Add New Pandal'
        onClick={onButtonClick}
        columns={columnData}
        rows={data}
        isLoading={isLoading}
      />
      <CustomizedDialogs open={open} onClose={onClose} onSave={onSave}>
        <ModalUi onClose={onClose} />
      </CustomizedDialogs>
    </Box>
  )
}

export default PandalsUi
