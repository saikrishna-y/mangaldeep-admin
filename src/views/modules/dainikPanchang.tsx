import React, { useState } from 'react'

import { Box } from '@mui/material'
import { useQuery } from 'react-query'
import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import { client } from 'src/utlis/axios'
import ModalUi from 'src/ui/ModalUI/modalUi'

const columnData = [
  {
    name: 'Panchang Date',
    id: 'panchang_date'
  },
  {
    name: 'Day',
    id: 'day'
  },
  {
    name: 'Karna',
    id: 'karna'
  },
  {
    name: 'Locales',
    id: 'locales.name'
  }
]

const fetchDainikPanchang = async () => {
  return await client.get('/api/modules/panchang/dainikPanchang')
}

const DainikPanchangUi = () => {
  const [open, setOpen] = useState(false)

  const { data } = useQuery('DainikPanchang', fetchDainikPanchang)

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
        tableHeaderText='Dainik Panchang'
        addButtonText='Add New Dainik Panchang'
        onClick={onButtonClick}
        columns={columnData}
        rows={data}
        isModule={true}
      />
      <CustomizedDialogs open={open} onClose={onClose} onSave={onSave}>
        <ModalUi isModule={true} onClose={onClose} />
      </CustomizedDialogs>
    </Box>
  )
}

export default DainikPanchangUi
