import React from 'react'

import Box from '@mui/material/Box'
import { useQuery } from 'react-query'

import TableUI from 'src/views/TableUI/tableUi'
import { client } from 'src/utlis/axios'

const columnData = [
  {
    name: 'Module Name',
    id: 'module_name'
  },
  {
    name: 'Display Order',
    id: 'display_order'
  }
]

const fetchGlobalSearchModules = async () => {
  return await client.get('/api/masters/modules/globalSearchModules')
}

const GlobalSearchModulesUi = () => {
  const { isLoading, data } = useQuery('GlobalSearchModules', fetchGlobalSearchModules) as any

  return (
    <Box>
      <TableUI tableHeaderText='Global Search Modules' columns={columnData} rows={data} isLoading={isLoading} />
    </Box>
  )
}

export default GlobalSearchModulesUi
