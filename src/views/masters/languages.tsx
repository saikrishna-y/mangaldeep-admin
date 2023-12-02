import React, { useState } from 'react'

import Box from '@mui/material/Box'
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
    name: 'Language Code',
    id: 'language_code'
  }
]

const fetchLanguages = async () => {
  return await client.get('/api/masters/languages')
}

const LanguagesUi = () => {
  const [open, setOpen] = useState(false)

  const { isLoading, data } = useQuery('Languages', fetchLanguages, {
    cacheTime: 5 * 60 * 1000, // 5 minutes
    staleTime: 2 * 60 * 1000 // 2 minutes
  }) as any

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
        tableHeaderText='Languages'
        addButtonText='Add New Language'
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

export default LanguagesUi
