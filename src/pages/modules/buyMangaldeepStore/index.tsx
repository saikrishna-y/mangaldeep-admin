import React, { useState } from 'react'
import { Box } from '@mui/material'
import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModulesModalUi from 'src/ui/ModalUI/modulesModalUi'
import { useQuery } from 'react-query'
import { client } from 'src/utlis/axios'

const columnData = [
  {
    name: 'Store Name',
    id: 'name'
  },
  {
    name: 'Disclaimer',
    id: 'disclaimer'
  },
  {
    name: 'Store URL',
    id: 'store_url'
  },
  {
    name: 'Locales',
    id: 'locales.name'
  }
]

const BuyMangaldeepStore = () => {
  const [open, setOpen] = useState(false)

  const fetchMangaldeepStore = async () => {
    return await client.get('/api/modules/buyMangaldeepStore/')
  }

  const { data } = useQuery('fetchMangaldeepStore', fetchMangaldeepStore)

  const onButtonClick = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const onSave = (): void => {
    console.log('save btn clicked')
    document.getElementById('addModule')?.click()
    setOpen(false)
  }

  return (
    <Box>
      <TableUI isModule={true} tableHeaderText='Mangaldeep Store' addButtonText='Add New Store' onClick={onButtonClick} columns={columnData} rows={data} uploadExcel={''} />
      <CustomizedDialogs open={open} onClose={onClose} onSave={onSave}>
        <ModulesModalUi onClose={onClose} />
      </CustomizedDialogs>
    </Box>
  )
}

export default BuyMangaldeepStore
