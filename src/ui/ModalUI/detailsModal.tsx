import React from 'react'

import { Box } from '@mui/material'

import BasicTypography from '../typography/typography'

interface FeedbackDetailsPorps {
  singleData: []
  CommentDetails?: { label: string; id: string; }[]
}

const FeedbackDetails = ({ singleData, CommentDetails }: FeedbackDetailsPorps) => {
  const arr = Object.entries(singleData).map(([key, value]) => ({ [key]: value }))
  console.log(
    'singleData',
    arr,
    Object.entries(singleData).map(([key, value]) => ({ [key]: value })),
    singleData
  )

  const renderCommentDetails = (id: any) => {
    const pathArr = id.split('.')
    console.log(pathArr, 'pathArr')
    let value = arr
    for (let i = 0; i < pathArr.length; i++) {
      if (Array.isArray(value)) {
        value = value.map(item => item?.[pathArr[i]])
      } else {
        value = value?.[pathArr[i]]
      }
      if (value === undefined) {
        return ''
      }
    }
    if (Array.isArray(value)) {
      return value.join(', ')
    }

    return value
  }

  return (
    <Box sx={{ marginTop: 5, marginBottom: 10 }}>
      {CommentDetails?.map((item, index) => (
        <BasicTypography key={index}>
          {item.label}: {renderCommentDetails(item.id)}
        </BasicTypography>
      ))}
    </Box>
  )
}

export default FeedbackDetails
