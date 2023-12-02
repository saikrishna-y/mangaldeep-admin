import React, { useRef, useState } from 'react'

import { Box } from '@mui/material'

import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModulesModalUi from 'src/ui/ModalUI/modulesModalUi'

import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import { useQuery } from 'react-query'
import { client } from 'src/utlis/axios'

const PujasUi = () => {
  const [open, setOpen] = useState(false)

  const formRef = useRef()

  const columnData = [
    {
      name: 'Deity',
      id: 'deities.name'
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

  const fetchPuja = async () => {
    return await client.get('/api/modules/puja/pujas')
  }

  const { data } = useQuery('fetchPuja', fetchPuja)

  return (
    <Box>
      <TableUI isModule={true} tableHeaderText='Puja' addButtonText='Add New Puja' onClick={onButtonClick} columns={columnData} rows={data} />
      <CustomizedDialogs open={open} onClose={onClose} onSave={onSave} >
        <ModulesModalUi ref={formRef} onClose={onClose} isModule={true} />
      </CustomizedDialogs>
    </Box>
  )
}

export default PujasUi
