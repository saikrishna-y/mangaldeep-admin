import React, { useState, useRef } from 'react'

import { Box } from '@mui/material'

import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModulesModalUi from 'src/ui/ModalUI/modulesModalUi'
import { useQuery } from 'react-query'
import { client } from 'src/utlis/axios'

const columnData = [
  {
    name: 'Title',
    id: 'title'
  },
  {
    name: 'Name',
    id: 'name'
  },
  {
    name: 'Deity',
    id: 'deities.name'
  },
  {
    name: 'Locales',
    id: 'locales.name'
  }
]

const DevotionalSongsUi = () => {
  const [open, setOpen] = useState(false)

  const formRef = useRef()

  const fetchDevotionalSongs = async () => {
    return await client.get('/api/modules/devotionalSong/devotionalSongs')
  }

  const { isLoading, data } = useQuery('DevotionalSongs', fetchDevotionalSongs)

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
        tableHeaderText='Devotional Songs'
        addButtonText='Add New Song'
        onClick={onButtonClick}
        columns={columnData}
        rows={data}
        isLoading={isLoading}
      />
      <CustomizedDialogs open={open} onClose={onClose} onSave={onSave}>
        <ModulesModalUi ref={formRef} onClose={onClose} isModule={true} />
      </CustomizedDialogs>
    </Box>
  )
}

export default DevotionalSongsUi
