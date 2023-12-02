import React, { useRef, useState } from 'react'

import { Box } from '@mui/material'

import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModulesModalUi from 'src/ui/ModalUI/modulesModalUi'
import { client } from '../../utlis/axios'
import { useQuery } from 'react-query'

const MangaldeepGeetUi = () => {
  const [open, setOpen] = useState(false)

  const formRef = useRef()

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
      name: 'Description',
      id: 'short_description'
    },
    {
      name: 'Locales',
      id: 'locales.name'
    }
  ]

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

  const fetchMangaldeepGeet = async () => {
    return await client.get('/api/modules/carousels/mangaldeepGeet')
  }

  const { data } = useQuery('MangaldeepGeet', fetchMangaldeepGeet)

  return (
    <Box>
      <TableUI
        isModule={true}
        tableHeaderText='Mangaldeep Geet'
        addButtonText='Add New Mangaldeep Geet'
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

export default MangaldeepGeetUi
