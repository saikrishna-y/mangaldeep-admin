import React, { useRef, useState } from 'react'

import { Box } from '@mui/material'
import { useQuery } from 'react-query'

import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModulesModalUi from 'src/ui/ModalUI/modulesModalUi'
import { client } from 'src/utlis/axios'

const columnData = [
  {
    name: 'Name',
    id: 'name'
  },
  {
    name: 'Description',
    id: 'short_description'
  },
  {
    name: 'Locales',
    id: 'locales.name'
  }
]

const fetchPrasads = async () => {
  return await client.get('/api/modules/prasads')
}

const PrasadsUi = () => {
  const [open, setOpen] = useState(false)

  const formRef = useRef()

  const { isLoading, data } = useQuery('Prasads', fetchPrasads)

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
        tableHeaderText='Prasads'
        addButtonText='Add New Prasad'
        onClick={onButtonClick}
        columns={columnData}
        rows={data}
        isModule={true}
        isLoading={isLoading}
      />
      <CustomizedDialogs open={open} onClose={onClose} onSave={onSave}>
        <ModulesModalUi ref={formRef} onClose={onClose} isModule={true} />
      </CustomizedDialogs>
    </Box>
  )
}

export default PrasadsUi
