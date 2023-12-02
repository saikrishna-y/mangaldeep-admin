import React from 'react'

import { Box } from '@mui/material'
import { useQuery } from 'react-query'

import TableUI from '../TableUI/tableUi'
import { client } from 'src/utlis/axios'

const columnData = [
  {
    name: 'Header Text',
    id: 'header_text'
  },
  {
    name: 'Message Text',
    id: 'message_text'
  },
  {
    name: 'User Token',
    id: 'user_token'
  },
  {
    name: 'Sent At',
    id: 'sent_at'
  },
  {
    name: 'Users Count',
    id: 'users_count'
  }
]

const CommentDetails = [
  {
    label: 'Header Text',
    id: 'header_text'
  },
  {
    label: 'Message Text',
    id: 'message_text'
  },
  {
    label: 'User Token',
    id: 'user_token'
  },
  {
    label: 'Module Name',
    id: 'module_name'
  },
  {
    label: 'Module Data',
    id: 'module_Data'
  },
  {
    label: 'Language Name',
    id: 'Language.name'
  },
  {
    label: 'Location Names',
    id: 'Location.name'
  },
  {
    label: 'Sent At',
    id: 'sent_at'
  },
  {
    label: 'Users Count',
    id: 'users_count'
  }
]

const fetchNotificationMessages = async () => {
  return await client.get('/api/modules/notifyUsers/notificationMessages')
}

const NotificationMessagesUi = () => {
  const { data } = useQuery('NotificationMessages', fetchNotificationMessages)

  return (
    <Box>
      <TableUI
        tableHeaderText='Get Notification Messages'
        columns={columnData}
        rows={data}
        details={'details'}
        isModule={true}
        CommentDetails={CommentDetails}
        deleteIcon={false}
      />
    </Box>
  )
}

export default NotificationMessagesUi
