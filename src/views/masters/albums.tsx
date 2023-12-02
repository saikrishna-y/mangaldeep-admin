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
  }
]

const fetchAlbums = async () => {
  return await client.get('/api/masters/devotionalSongs/albums')
}

const AlbumsUi = () => {
  const [open, setOpen] = useState(false)

  const { isLoading, data } = useQuery('Albums', fetchAlbums) as any

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
        tableHeaderText='Albums'
        addButtonText='Add New Album'
        onClick={onButtonClick}
        columns={columnData}
        rows={data}
        isLoading={isLoading}
      />
      <Box>
        <CustomizedDialogs open={open} onClose={onClose} onSave={onSave}>
          <ModalUi onClose={onClose} />
        </CustomizedDialogs>
      </Box>
    </Box>
  )
}

export default AlbumsUi
