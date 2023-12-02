import React, { useRef, useState } from 'react'

import { Box } from '@mui/material'
import { useQuery } from 'react-query'

import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModulesModalUi from 'src/ui/ModalUI/modulesModalUi'
import { client } from 'src/utlis/axios'

const columnData = [
  {
    name: 'Name',
    id: 'name'
  },
  {
    name: 'Geeta Quotes',
    id: 'geeta_quotes.chapter'
  }
]

const fetchGeetaQuotesAudio = async () => {
  return await client.get('/api/modules/geetaQuotes/geetaQuoteAudio/')
}

const GeetaQuoteAudioUi = () => {
  const [open, setOpen] = useState(false)

  const formRef = useRef()

  const { isLoading, data } = useQuery('GeetaQuotesAudio', fetchGeetaQuotesAudio)

  const onButtonClick = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const onSave = () => {
    document.getElementById('addModule')?.click()
    setOpen(false)
  }

  return (
    <Box>
      <TableUI
        isModule={true}
        tableHeaderText='Geeta Quote Audio'
        addButtonText='Add New Audio'
        onClick={onButtonClick}
        columns={columnData}
        rows={data}
        isLoading={isLoading}
      />
      <CustomizedDialogs open={open} onClose={onClose} onSave={onSave}>
        <ModulesModalUi ref={formRef} onClose={onClose} isModule={true} />
      </CustomizedDialogs>
    </Box>
  )
}

export default GeetaQuoteAudioUi
