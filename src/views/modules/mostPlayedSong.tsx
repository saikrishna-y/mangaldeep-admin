import React, { useRef, useState } from 'react'

import { Box } from '@mui/material'

import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModulesModalUi from 'src/ui/ModalUI/modulesModalUi'
import { client } from 'src/utlis/axios'
import { useQuery } from 'react-query'

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

const MostPlayedSongUi = () => {
  const [open, setOpen] = useState(false)

  const formRef = useRef()

  const onButtonClick = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const onSave = () => {
    document.getElementById('addModule')?.click()
    setOpen(false);
  }
  const fetchMostPlayedSongs = async () => {
    return await client.get('/api/modules/devotionalSong/mostPlayedSong')
  }

  const { data } = useQuery('fetchMostPlayedSongs', fetchMostPlayedSongs)

  return (
    <Box>
      <TableUI isModule={true} tableHeaderText='Most Played Song' addButtonText='Add Most Played Songs' columns={columnData} rows={data} onClick={onButtonClick} isEdit={false} />
      <CustomizedDialogs open={open} onClose={onClose} onSave={onSave} >
        <ModulesModalUi ref={formRef} onClose={onClose} isModule={true} />
      </CustomizedDialogs>
    </Box>
  )
}

export default MostPlayedSongUi
