import React, { useState } from 'react'
import { Box } from '@mui/material'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import ModalUi from 'src/ui/ModalUI/modalUi'
import TableUI from '../TableUI/tableUi'
import { useQuery } from 'react-query'
import { client } from 'src/utlis/axios'

const AddUserGroupUi = () => {
  const [addNew, setAddNew] = useState(false)

  const columnData = [
    {
      name: 'Name',
      id: 'Groups.name'
    }
  ]

  const onButtonClick = () => {
    setAddNew(true)
  }

  const onClose = () => {
    setAddNew(false)
  }

  const onSave = () => {
    document.getElementById('add')?.click()
  }

  const fetchUserGroups = async () => {
    return await client.get('/api/userManagement/getUserGroups/')
  }

  const { data } = useQuery('UserGroups', fetchUserGroups)

  return (
    <Box>

      <TableUI
        tableHeaderText='User Group'
        addButtonText='Add User Group'
        onClick={onButtonClick}
        columns={columnData}
        rows={data}
      />
      <CustomizedDialogs open={addNew} onClose={onClose} onSave={onSave}>
        <ModalUi onClose={onClose} isUserManagement={true} />
      </CustomizedDialogs>
    </Box>
  )
}

export default AddUserGroupUi
