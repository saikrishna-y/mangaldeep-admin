import React, { useRef, useState } from 'react'

import { Box } from '@mui/material'
import { useQuery } from 'react-query'

import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import { client } from 'src/utlis/axios'
import ModulesModalUi from 'src/ui/ModalUI/modulesModalUi'

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

const fetchTempleArchitecture = async () => {
  return await client.get('/api/modules/templeConnect/templeArchitecture/')
}

const TempleArchitectureUi = () => {
  const [open, setOpen] = useState(false)

  const formRef = useRef()

  const { data } = useQuery('TempleArchitecture', fetchTempleArchitecture)

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
        tableHeaderText='Temple Architecture'
        addButtonText='Add New Temple Architecture'
        onClick={onButtonClick}
        columns={columnData}
        rows={data}
        isModule={true}
      />
      <CustomizedDialogs open={open} onClose={onClose} onSave={onSave}>
        <ModulesModalUi ref={formRef} onClose={onClose} isModule={true} />
      </CustomizedDialogs>
    </Box>
  )
}

export default TempleArchitectureUi
