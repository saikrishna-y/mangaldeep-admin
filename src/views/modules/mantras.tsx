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
    name: 'Description Text',
    id: 'description_text'
  },
  {
    name: 'Mantra Content',
    id: 'mantra_content'
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

const fetchMantras = async () => {
  return await client.get('/api/modules/mantras/mantras')
}

const MantrasUi = () => {
  const [open, setOpen] = useState(false)

  const { data } = useQuery('Mantras', fetchMantras)

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
        tableHeaderText='Mantras'
        addButtonText='Add New Mantra'
        onClick={onButtonClick}
        columns={columnData}
        rows={data}
        isModule={true}
      />
      <CustomizedDialogs open={open} onClose={onClose} onSave={onSave}>
        <ModalUi isModule={true} onClose={onClose} />
      </CustomizedDialogs>
    </Box>
  )
}

export default MantrasUi
