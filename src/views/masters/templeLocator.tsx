import React, { useState } from 'react'

import Box from '@mui/material/Box'
import { useQuery } from 'react-query'

import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModalUi from 'src/ui/ModalUI/modalUi'
import { client } from 'src/utlis/axios'

const columnData = [
  {
    name: 'Deity',
    id: `Deities.name`
  },
  {
    name: 'Keywords',
    id: 'keyword'
  },
  {
    name: 'Locales',
    id: 'locales.name'
  }
]

const fetchTempleLocatorKeywords = async () => {
  return await client.get('/api/masters/templeLocator')
}

const TempleLocatorKeywordsUi = () => {
  const [open, setOpen] = useState(false)

  const { isLoading, data } = useQuery('TempleLocatorKeywords', fetchTempleLocatorKeywords) as any

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
        tableHeaderText='Temple Locator Keywords'
        addButtonText='Add New Keywords'
        onClick={onButtonClick}
        columns={columnData}
        rows={data}
        isLoading={isLoading}
      />
      <Box>
        <CustomizedDialogs open={open} onClose={onClose} onSave={onSave}>
          <Box sx={{ marginTop: 4.5, marginBottom: 8, px: 3 }}>
            <ModalUi onClose={onClose} />
          </Box>
        </CustomizedDialogs>
      </Box>
    </Box>
  )
}

export default TempleLocatorKeywordsUi
