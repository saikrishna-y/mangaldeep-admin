import React, { useState, useRef } from 'react'

import { Box } from '@mui/material'

import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModulesModalUi from 'src/ui/ModalUI/modulesModalUi'
import { client } from '../../utlis/axios'
import { useQuery } from 'react-query'

const EventsUi = () => {
  const [open, setOpen] = useState(false)

  const formRef = useRef()

  const columnData = [
    {
      name: 'Name',
      id: 'name'
    },
    {
      name: 'Date',
      id: 'festival_start_date'
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

  const fetchEvents = async () => {
    return await client.get('/api/modules/carousels/events')
  }

  const { data } = useQuery('Events', fetchEvents)

  return (
    <Box>
      <TableUI
        tableHeaderText='Events'
        addButtonText='Add New Event'
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

export default EventsUi
