import React, { useState } from 'react'
import { Box } from '@mui/material'
import BasicTypography from 'src/ui/typography/typography'
import TableUI from 'src/views/TableUI/tableUi'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import { client } from 'src/utlis/axios'
import { useQuery } from 'react-query'

const AllUsersUi = () => {
  const [open, setOpen] = useState(false)

  const columnData = [
    {
      name: 'Full Name',
      id: 'full_name'
    },
    {
      name: 'Email',
      id: 'email'
    },
    {
      name: 'Provider',
      id: 'Providers.name'
    },
    {
      name: 'Source',
      id: 'source'
    },
    {
      name: 'Version',
      id: 'version'
    },
    {
      name: 'Language',
      id: 'Languages.name'
    },
    {
      name: 'Location',
      id: 'Locations.name'
    }
  ]

  const onButtonClick = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const fetchAllUsers = async () => {
    return await client.get('/api/userManagement/getAllUser')
  }

  const { data } = useQuery('GetAllUsers', fetchAllUsers)

  return (
    <Box>
      <TableUI
        addButtonText='Send User Details'
        tableHeaderText='All Users'
        onClick={onButtonClick}
        columns={columnData}
        rows={data}
      />
      <CustomizedDialogs open={open} onClose={onClose}>
        <BasicTypography variant='p'>Send user details to Mangaldeep Admin</BasicTypography>
      </CustomizedDialogs>
    </Box>
  )
}

export default AllUsersUi
