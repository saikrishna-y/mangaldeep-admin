import React, { useState } from 'react'

import { Box } from '@mui/material'
import { useQuery } from 'react-query'

import CustomizedDialogs from 'src/ui/dialog/dialog'
import TableUI from '../TableUI/tableUi'
import { client } from 'src/utlis/axios'
import ModalUi from 'src/ui/ModalUI/modalUi'

const columnData = [
  {
    name: 'Festival Date',
    id: 'festival_date'
  },
  {
    name: 'Festival Name',
    id: 'Festivals.name'
  },
  {
    name: 'Locales',
    id: 'locales.name'
  }
]

const fetchFestivalCalendar = async () => {
  return await client.get('/api/modules/panchang/festivalCalendar')
}

const FestivalCalenderUi = () => {
  const [open, setOpen] = useState(false)

  const { data } = useQuery('FestivalCalendar', fetchFestivalCalendar)

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
        tableHeaderText='Festival Calender'
        addButtonText='Add New Festival Calender'
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

export default FestivalCalenderUi
