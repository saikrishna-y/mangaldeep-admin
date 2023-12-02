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
    name: 'Language Name',
    id: 'Languages.name'
  },
  {
    name: 'Display Order',
    id: 'display_order'
  }
]

const fetchFeedbackCategories = async () => {
  return await client.get('/api/masters/feedbackCategory')
}

const FeedbackCategoryUi = () => {
  const [open, setOpen] = useState(false)

  const { isLoading, data } = useQuery('FeedbackCategories', fetchFeedbackCategories) as any

  const onButtonClick = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const onSave = () => {
    // setOpen(false)

    document.getElementById('add')?.click()
    setOpen(false)
  }

  return (
    <Box>
      <TableUI
        tableHeaderText='Feedback Categories'
        addButtonText='Add New Feedback Category'
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

export default FeedbackCategoryUi
