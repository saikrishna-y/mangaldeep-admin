import React, { useRef, useState } from 'react'

import { Box } from '@mui/material'

import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModulesModalUi from 'src/ui/ModalUI/modulesModalUi'
import { useQuery } from 'react-query'
import { client } from 'src/utlis/axios'

const LiveStreamingUi = () => {
  const [open, setOpen] = useState(false)

  const formRef = useRef()

  const columnData = [
    {
      name: 'Name',
      id: 'name'
    },
    {
      name: 'Streaming time',
      id: 'date'
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

  const fetchLiveStreamings = async () => {
    return await client.get('/api/modules/carousels/liveStreaming')
  }

  const { data } = useQuery('LiveStreamings', fetchLiveStreamings)

  return (
    <Box>
      <TableUI
        tableHeaderText='Live Streaming'
        addButtonText='Add New Live Streaming'
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

export default LiveStreamingUi
