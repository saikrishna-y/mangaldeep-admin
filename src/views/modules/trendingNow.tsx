import React from 'react'

import { Box } from '@mui/material'
import { useQuery } from 'react-query'

import TableUI from 'src/views/TableUI/tableUi'
import { client } from 'src/utlis/axios'

const columnData = [
  {
    name: 'Module Type',
    id: 'ModuleType.name'
  },
  {
    name: 'Module Name',
    id: 'category_name'
  },
  {
    name: 'Module Data',
    id: 'name'
  },
  {
    name: 'Module ID',
    id: 'category_id'
  }
]

const fetchAllTrendingNow = async () => {
  return await client.get('/api/modules/trendingNow/')
}

const TrendingNowUi = () => {

  const { data } = useQuery('TrendingNow', fetchAllTrendingNow, { enabled: true })

  return (
    <Box>
      <TableUI
        tableHeaderText='Trending Now'
        columns={columnData}
        rows={data}
        isModule={true}
        isEdit={false}
      />
    </Box>
  )
}

export default TrendingNowUi