import React, { useRef, useState } from 'react'
import { Box } from '@mui/material'
import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModulesModalUi from 'src/ui/ModalUI/modulesModalUi'
import { client } from 'src/utlis/axios'
import { useQuery } from 'react-query'

const CarouselGroupingUi = () => {
  const [open, setOpen] = useState(false)

  const formRef = useRef()

  const columnData = [
    {
      name: 'Name',
      id: 'name'
    },
    {
      name: 'Module Name',
      id: 'CarouselGroupingModules.display_name'
    },
    {
      name: 'Display Order',
      id: 'display_order'
    },
    {
      name: 'Locales',
      id: 'locales.name'
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

  const fetchCarouselGrouping = async () => {
    return await client.get('/api/modules/carousels/carouselGrouping/carouselGrouping/')
  }

  const { data } = useQuery('CarouselGrouping', fetchCarouselGrouping)

  return (
    <Box>
      <TableUI tableHeaderText='Carousel Grouping' addButtonText='Add New Carousel Grouping' onClick={onButtonClick} columns={columnData} rows={data} isModule={true} />
      <CustomizedDialogs open={open} onClose={onClose} onSave={onSave}>
        <ModulesModalUi ref={formRef} onClose={onClose} isModule={true} />
      </CustomizedDialogs>
    </Box>
  )
}

export default CarouselGroupingUi
