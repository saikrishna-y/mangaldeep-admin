import React, { useState } from 'react'

import Box from '@mui/material/Box'
import { useQuery } from 'react-query'

import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModalUi from 'src/ui/ModalUI/modalUi'
import { client } from 'src/utlis/axios'

const columnData = [
  {
    name: 'Name',
    id: 'name'
  },
  {
    name: 'Location Code',
    id: 'location_code'
  },
  {
    name: 'Country Name',
    id: 'Country.name'
  },
  {
    name: 'Zone Name',
    id: 'Zone.name'
  }
]

const fetchLocations = async () => {
  return await client.get('/api/masters/locations')
}

const LocationsUi = () => {
  const [open, setOpen] = useState(false)

  const { isLoading, data } = useQuery('Locations', fetchLocations) as any

  const onButtonClick = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const onSave = () => {
    document.getElementById('add')?.click()
  }

  return (
    <Box>
      <TableUI
        tableHeaderText='Locations'
        addButtonText='Add New Location'
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

export default LocationsUi
