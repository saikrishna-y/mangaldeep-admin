import React, { useRef, useState } from 'react'

import { Box } from '@mui/material'
import { useQuery } from 'react-query'

import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModulesModalUi from 'src/ui/ModalUI/modulesModalUi'
import { client } from 'src/utlis/axios'

const columnData = [
  {
    name: 'Category',
    id: 'category'
  },
  {
    name: 'Description',
    id: 'description'
  }
]

const fetchAbout = async () => {
  return await client.get('/api/modules/about')
}

const AboutUi = () => {
  const [open, setOpen] = useState(false)

  const formRef = useRef()

  const { data } = useQuery('About', fetchAbout)

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
        tableHeaderText='About'
        addButtonText='Add About Us'
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

export default AboutUi
