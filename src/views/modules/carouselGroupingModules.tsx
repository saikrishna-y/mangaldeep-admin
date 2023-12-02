import React, { useRef, useState } from 'react'
import { Box } from '@mui/material'
import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModulesModalUi from 'src/ui/ModalUI/modulesModalUi'
import { client } from 'src/utlis/axios'
import { useQuery } from 'react-query'

const CarouselGroupingModulesUi = () => {
  const [open, setOpen] = useState(false)

  const formRef = useRef()

  const columnData = [
    {
      name: 'Display Name',
      id: 'display_name'
    },
    {
      name: 'Display Order',
      id: 'display_order'
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
    setOpen(false)
  }

  const fetchCarouselGroupingModules = async () => {
    return await client.get('/api/modules/carousels/carouselGrouping/carouselGroupingModules/')
  }

  const { data } = useQuery('CarouselGroupingModules', fetchCarouselGroupingModules)

  return (
    <Box>
      <TableUI
        tableHeaderText='Carousel Grouping Modules'
        addButtonText='Add New Carousel Grouping Modules'
        onClick={onButtonClick}
        columns={columnData}
        rows={data}
      />
      <CustomizedDialogs open={open} onClose={onClose} onSave={onSave}>
        <ModulesModalUi ref={formRef} onClose={onClose} isModule={true} />
      </CustomizedDialogs>
    </Box>
  )
}

export default CarouselGroupingModulesUi
