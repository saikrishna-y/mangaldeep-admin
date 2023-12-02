import React from 'react'

import { Box } from '@mui/material'
import { useQuery } from 'react-query'

import TableUI from '../TableUI/tableUi'
import { client } from 'src/utlis/axios'

const columnData = [
  {
    name: 'User Name',
    id: 'Users.email'
  },
  {
    name: 'Category Name',
    id: 'Categories.name'
  },
  {
    name: 'Comments',
    id: 'comments'
  },
  {
    name: 'Commented At',
    id: 'commented_at'
  }
]

const CommentDetails = [
  {
    label: 'User Name',
    id: 'Users.name'
  },
  {
    label: 'Device Token',
    id: 'device_token    '
  },
  {
    label: 'Category Name',
    id: 'Categories.name    '
  },
  {
    label: 'Mobile Number',
    id: 'Users.mobile'
  },
  {
    label: 'Comments',
    id: 'comments'
  },
  {
    label: 'Device Name',
    id: 'device_name    '
  },
  {
    label: 'OS Name',
    id: 'os_name'
  },
  {
    label: 'AppBuild',
    id: 'app_build'
  },
  {
    label: 'LanguageName',
    id: 'Language.name'
  },
  {
    label: 'RegistrationID',
    id: 'registration_id'
  },
  {
    label: 'UpdatedAt',
    id: 'updated_at'
  },
  {
    label: 'Reconciled',
    id: 'reconciled'
  },
  {
    label: 'Commented At',
    id: 'commented_at'
  },
  {
    label: 'Email ID',
    id: 'Users.email'
  },
  {
    label: 'DeviceType',
    id: 'device_type_id '
  },
  {
    label: 'OS Version',
    id: 'os_version'
  },
  {
    label: 'AppVersion',
    id: 'app_version'
  },
  {
    label: 'LocationName',
    id: 'Location.name'
  },
  {
    label: 'CreatedAt',
    id: 'created_at'
  },
  {
    label: 'Failed',
    id: 'failed'
  },
  {
    label: 'iOSNotificationBadge',
    id: 'ios_notification_badge'
  }
]

const fetchFeedback = async () => {
  return await client.get('/api/modules/feedbacks')
}

const FeedbacksUi = () => {
  const { data } = useQuery('Feedback', fetchFeedback)
  console.log('ksjdflkajdkskjd', data, typeof data)

  return (
    <Box>
      <TableUI
        tableHeaderText='Feedbacks'
        columns={columnData}
        rows={data}
        details={'details'}
        CommentDetails={CommentDetails}
      />
    </Box>
  )
}

export default FeedbacksUi
