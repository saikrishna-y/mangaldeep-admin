import React, { useRef, useState } from 'react'

import { Box } from '@mui/material'

import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModulesModalUi from 'src/ui/ModalUI/modulesModalUi'
import { client } from '../../utlis/axios'
import { useQuery } from 'react-query'

const DynamicBannerUi = () => {
  const [open, setOpen] = useState(false)

  const formRef = useRef()

  const columnData = [
    {
      name: 'Description',
      id: 'description'
    },
    {
      name: 'Module Name',
      id: 'ModuleName.name'
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

  const fetchDynamicBanner = async () => {
    return await client.get('/api/modules/carousels/dynamicBanner')
  }

  const { data } = useQuery('DynamicBanner', fetchDynamicBanner)

  return (
    <Box>
      <TableUI
        tableHeaderText='Dynamic Banner'
        addButtonText='Add New Dynamic Banner'
        onClick={onButtonClick}
        columns={columnData}
        rows={data}
      />
      <CustomizedDialogs open={open} onClose={onClose} onSave={onSave}>
        <ModulesModalUi ref={formRef} onClose={onClose} />
      </CustomizedDialogs>
    </Box>
  )
}

export default DynamicBannerUi
