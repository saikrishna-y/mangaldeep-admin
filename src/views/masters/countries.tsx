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
    name: 'Country Code',
    id: 'country_code'
  }
]

const fetchCountries = async () => {
  return await client.get('/api/masters/countries')
}

const CountriesUi = () => {
  const [open, setOpen] = useState(false)

  const { isLoading, data, } = useQuery('Countries', fetchCountries) as any

  const onButtonClick = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const onSave = () => {
    document.getElementById('add')?.click()

    // setOpen(false)
  }

  return (
    <Box>
      <TableUI
        tableHeaderText='Countries'
        addButtonText='Add New Country'
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

export default CountriesUi
