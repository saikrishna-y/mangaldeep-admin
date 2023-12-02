import React, { useRef, useState } from 'react'

import { Box } from '@mui/material'
import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModulesModalUi from 'src/ui/ModalUI/modulesModalUi'
import { useQuery } from 'react-query'
import { client } from 'src/utlis/axios'

const ModulesModalUiFixed = ModulesModalUi as any

const TempleRaagaUi = () => {
  const [open, setOpen] = useState(false)

  const formRef = useRef()

  const columnData = [
    {
      name: 'Name',
      id: 'name'
    },
    {
      name: 'Locales',
      id: 'locales'
    }
  ]

  const onButtonClick = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const onSave = () => {
    document.getElementById('addModule')?.click()
  }

  const fetchTempleRaagas = async () => {
    return await client.get('/api/modules/carousels/templeRaaga')
  }

  const { data } = useQuery('TempleRaagas', fetchTempleRaagas)

  return (
    <Box>
      <TableUI
        tableHeaderText='Temple Raaga'
        addButtonText='Add New Temple Raaga'
        onClick={onButtonClick}
        columns={columnData}
        rows={data}
      />
      <CustomizedDialogs open={open} onClose={onClose} onSave={onSave}>
        <ModulesModalUiFixed isModule={true} ref={formRef} onClose={onClose} />
      </CustomizedDialogs>
    </Box>
  )
}

export default TempleRaagaUi
