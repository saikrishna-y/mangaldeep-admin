import React, { useState } from 'react'

import Box from '@mui/material/Box'
import { useQuery } from 'react-query'

import ModalUi from 'src/ui/ModalUI/modalUi'
import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import { client } from 'src/utlis/axios'

const columnData = [
  {
    name: 'Name',
    id: 'name'
  },
  {
    name: 'Locales',
    id: 'locales'
  }
]

const fetchFestivals = async () => {
  return await client.get('/api/masters/festivals')
}

const FestivalsUi = () => {
  const [open, setOpen] = useState(false)
  const { isLoading, data } = useQuery('Festivals', fetchFestivals)

  const onButtonClick = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const onSave = () => {
    document.getElementById('add')?.click()
  }

  return (
    <Box>
      <TableUI
        tableHeaderText='Festivals'
        addButtonText='Add New Festival'
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

export default FestivalsUi
