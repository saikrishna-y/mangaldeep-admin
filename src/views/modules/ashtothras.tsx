import React, { useRef, useState } from 'react'

import { Box } from '@mui/material'
import { useQuery } from 'react-query'

import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModulesModalUi from 'src/ui/ModalUI/modulesModalUi'
import { client } from 'src/utlis/axios'

const columnData = [
  {
    name: 'Deity Name',
    id: 'Deities.name'
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

const fetchAshtothras = async () => {
  return await client.get('/api/modules/mantras/ashtothras')
}

const AshtothrasUi = () => {
  const [open, setOpen] = useState(false)

  const formRef = useRef()

  const { data } = useQuery('Ashtothras', fetchAshtothras)

  const onButtonClick = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const onSave = () => {
    document.getElementById('addModule')?.click()
    setOpen(false)
  }

  return (
    <Box>
      <TableUI
        isModule={true}
        tableHeaderText='Ashtothras'
        addButtonText='Add New Ashtothra'
        onClick={onButtonClick}
        columns={columnData}
        rows={data}
      />
      <CustomizedDialogs open={open} onClose={onClose} onSave={onSave}>
        <ModulesModalUi ref={formRef} onClose={onClose} isModule={true} />
      </CustomizedDialogs>
    </Box>
  )
}

export default AshtothrasUi
