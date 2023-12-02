import React, { useRef, useState } from 'react'

import { Box } from '@mui/material'

import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModulesModalUi from 'src/ui/ModalUI/modulesModalUi'
import { useQuery } from 'react-query'
import { client } from 'src/utlis/axios'

const columnData = [
  {
    name: 'Editorial Date',
    id: 'editorial_date'
  },
  {
    name: 'Title',
    id: 'title'
  },
  {
    name: 'Locales',
    id: 'locales.name'
  }
]

const EditorialsUi = () => {
  const [open, setOpen] = useState(false)

  const formRef = useRef()

  const onButtonClick = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const fetchEditorials = async () => {
    return await client.get('/api/modules/editorials/editorials')
  }

  const { isLoading, data } = useQuery('fetchEditorials', fetchEditorials)
  const onSave = () => {
    document.getElementById('addModule')?.click()
    setOpen(false)
  }

  return (
    <Box>
      <TableUI isModule={true} tableHeaderText='Editorials' addButtonText='Add New Editorials' onClick={onButtonClick} columns={columnData} rows={data} isLoading={isLoading} />
      <CustomizedDialogs open={open} onClose={onClose} onSave={onSave} >
        <ModulesModalUi ref={formRef} onClose={onClose} isModule={true} />
      </CustomizedDialogs>
    </Box>
  )
}

export default EditorialsUi
