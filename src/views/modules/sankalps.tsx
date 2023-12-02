import React, { useRef, useState } from 'react'

import { Box } from '@mui/material'

import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModulesModalUi from 'src/ui/ModalUI/modulesModalUi'
import { client } from 'src/utlis/axios'
import { useQuery } from 'react-query'

const columnData = [
  {
    name: 'Sankalp Text',
    id: 'text'
  },
  {
    name: 'Locales',
    id: 'locales.name'
  }
]

const SankalpsUi = () => {
  const [open, setOpen] = useState(false)

  const formRef = useRef()

  const onButtonClick = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const fetchSankalp = async () => {
    return await client.get('/api/modules/puja/sankalps')
  }

  const { data } = useQuery('fetchSankalp', fetchSankalp)
  const onSave = () => {
    console.log('save btn clicked')
    document.getElementById('addModule')?.click()
    setOpen(false)
  }

  return (
    <Box>
      <TableUI isModule tableHeaderText='Sankalps' addButtonText='Add New Sankalp' onClick={onButtonClick} columns={columnData} rows={data} />
      <CustomizedDialogs open={open} onClose={onClose} onSave={onSave}>
        <ModulesModalUi ref={formRef} onClose={onClose} isModule={true} />
      </CustomizedDialogs>
    </Box>
  )
}

export default SankalpsUi
