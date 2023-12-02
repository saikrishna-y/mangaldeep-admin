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
  },
  {
    name: 'Display Order',
    id: 'display_order'
  }
]

const fetchEditorialCategories = async () => {
  return await client.get('/api/masters/editorials/category')
}

const EditorialCategoriesUi = () => {
  const [open, setOpen] = useState(false)

  const { isLoading, data } = useQuery('EditorialCategories', fetchEditorialCategories) as any

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
        tableHeaderText='Editorial Categories'
        addButtonText='Add New Editorial Category'
        onClick={onButtonClick}
        columns={columnData}
        rows={data}
        isLoading={isLoading}
      />
      <Box>
        <CustomizedDialogs open={open} onClose={onClose} onSave={onSave}>
          <Box sx={{ marginTop: 4.5, marginBottom: 8, px: 3 }}>
            <ModalUi onClose={onClose} />
          </Box>
        </CustomizedDialogs>
      </Box>
    </Box>
  )
}

export default EditorialCategoriesUi
