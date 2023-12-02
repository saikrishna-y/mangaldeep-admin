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

const fetchArtists = async () => {
  return await client.get('/api/masters/devotionalSongs/artists')
}

const ArtistsUi = () => {
  const [open, setOpen] = useState(false)

  const { isLoading, data } = useQuery('Artists', fetchArtists) as any

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
        tableHeaderText='Artists'
        addButtonText='Add New Artist'
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

export default ArtistsUi
