import React from 'react'

import Box from '@mui/material/Box'
import { useQuery } from 'react-query'

import TableUI from 'src/views/TableUI/tableUi'
import { client } from 'src/utlis/axios'

const columnData = [
  {
    name: 'Module Name',
    id: 'name'
  }
]

const fetchMangaldeepIcon = async () => {
  return await client.get('/api/masters/icon')
}

const MangaldeepIconUi = () => {
  const { isLoading, data } = useQuery('MangaldeepIcon', fetchMangaldeepIcon) as any
  const deleteIcon = false

  return (
    <Box>
      <TableUI
        tableHeaderText='Mangaldeep Icon'
        columns={columnData}
        rows={data}
        deleteIcon={deleteIcon}
        isLoading={isLoading}
      />
    </Box>
  )
}

export default MangaldeepIconUi
