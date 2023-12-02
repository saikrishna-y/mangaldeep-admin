import React, { useState } from 'react'

import Box from '@mui/material/Box'
import { useQuery } from 'react-query'

import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModalUi from 'src/ui/ModalUI/modalUi'
import { client } from 'src/utlis/axios'

const columnData = [
  {
    name: 'Locale Name',
    id: 'name'
  },
  {
    name: 'Country Name',
    id: 'country_name'
  },
  {
    name: 'Location Name',
    id: 'location_name'
  },
  {
    name: 'Language Name',
    id: 'language_name'
  }
]

const fetchLocales = async () => {
  return await client.get('/api/masters/locales')
}

const LocalesUi = () => {
  const [open, setOpen] = useState(false)

  const { isLoading, data } = useQuery('Locales', fetchLocales) as any

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
        tableHeaderText='Locales'
        addButtonText='Add New Locale'
        onClick={onButtonClick}
        columns={columnData}
        rows={data}
        isLoading={isLoading}
      />
      <Box>
        <CustomizedDialogs open={open} onClose={onClose} onSave={onSave}>
          <ModalUi onClose={onClose} />
        </CustomizedDialogs>
      </Box>
    </Box>
  )
}

export default LocalesUi
