import React, { useState } from 'react'

import { Box } from '@mui/material'
import Image from 'next/image'

import BasicButton from '../button/button'
import Images from 'src/ui/image/image'

interface SingleDataProps {
  icon_url: string
}

interface ImagesProps {
  register?: any
  data?: any
  singleData?: SingleDataProps
  setValue?: any
  isUserManagement?: boolean
}

const SecondaryButton = ({ register, data, setValue, isUserManagement }: ImagesProps) => {
  const [addBanner, setAddBanner] = useState<string[]>([])
  const deleteIcon = '/images/logos/delete.png'

  const onUploadBtnClick = () => {
    if (isUserManagement) {
      document.getElementById('add')?.click()
    } else {
      document.getElementById('add')?.click()
      const newBanners = [...addBanner, 'new-banner']
      setAddBanner(newBanners)
    }
  }

  const onDeleteClick = (index: number) => {
    const filteredData = addBanner.filter((item, i) => i !== index)
    setAddBanner(filteredData)
  }

  return (
    <Box>
      <BasicButton variant='contained' color='primary' onClick={onUploadBtnClick}>
        {data.label}
      </BasicButton>
      {addBanner.map((banner, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Images key={index} register={register} data={data} setValue={setValue} />
          <Image
            src={deleteIcon}
            alt='delete'
            width={30}
            height={30}
            style={{ cursor: 'pointer' }}
            onClick={() => onDeleteClick(index)}
          />
        </Box>
      ))}
    </Box>
  )
}

export default SecondaryButton
