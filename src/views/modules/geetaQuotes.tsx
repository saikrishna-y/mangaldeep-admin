import React from 'react'
import { useQuery } from 'react-query'
import { client } from 'src/utlis/axios'
import TableUI from 'src/views/TableUI/tableUi'

const columnData = [
  {
    name: 'GeetaQuote',
    id: 'geeta_quote'
  },
  {
    name: 'GeetaQuote Info',
    id: 'chapter_and_shloka'
  }
]

const GeetaQuotesUi = () => {

  const fetchGeetaQuotes = async () => {
    return await client.get('/api/modules/geetaQuotes/geetaQuotes/')
  }

  const { isLoading, data } = useQuery('GeetaQuotes', fetchGeetaQuotes)

  return (
    <TableUI
      tableHeaderText='Geeta Quotes'
      uploadExcel='Upload Excel'
      rows={data}
      isLoading={isLoading}
      columns={columnData}
    />
  )
}

export default GeetaQuotesUi
