import React from 'react'

import { Box } from '@mui/material'
import { Skeleton } from '@mui/material'

const SkeletonLoader = () => {
  return (
    <Box
      sx={{ display: 'flex', position: 'absolute', width: '100%', justifyContent: 'space-between', padding: '10px' }}
    >
      <Box sx={{ width: '18%' }}>
        <Skeleton variant='text' width='100%' height={80} animation='wave' />

        <Skeleton variant='rectangular' width='100%' height='100vh' animation='wave' />
      </Box>
      {/* For variant="text", adjust the height via font-size */}
      <Box sx={{ width: '80%' }}>
        <Box sx={{ marginBotton: '20px' }}>
          <Skeleton variant='text' width='100%' height={80} animation='wave' />
        </Box>

        {/* For other variants, adjust the size with `width` and `height` */}
        {/* <Skeleton variant='rectangular' width={210} height={100} animation='wave' /> */}
        <Box>
          <Skeleton variant='rounded' width='100%' height='100vh' animation='wave' />
        </Box>
        <Box>
          <Skeleton variant='text' width='100%' height='100vh' animation='wave' />
        </Box>
      </Box>
    </Box>
  )
}

export default SkeletonLoader
