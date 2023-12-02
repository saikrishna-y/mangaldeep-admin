import React, { useState } from 'react'
import { Box } from '@mui/material'

import BasicButton from '../button/button'
import BasicTypography from '../typography/typography'
import UploadImage from 'src/ui/uploadImage/uploadImage'
import Image from 'next/image'

interface SingleDataProps {
  image_url: string;
  isCustomizedGod: boolean;
}

interface ImagesProps {
  register?: any
  data?: any
  singleData?: SingleDataProps
  setValue?: any
}

const Imagess = ({ register, data, singleData, setValue }: ImagesProps) => {
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [selectedImage, setSelectedImage] = useState('')

  const onFileChange = (e: any) => {
    const file = e.target.files[0]
    const objectUrl = URL.createObjectURL(file)
    setSelectedImage(objectUrl)
  }

  const onClickUpload = () => {
    const fileInput = document.getElementById('account-settings-upload-image')
    if (fileInput) {
      fileInput.click()
    }
    setImgSrc('/images/avatars/1.png')
  }

  const onResetClick = () => {
    setSelectedImage('')
  }

  const onImageClick = (img: any) => {
    setValue('image_id', img?.id)
    setSelectedImage(img?.img)
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', py: 5 }}>
        {selectedImage ? (
          <Image src={selectedImage ? selectedImage : imgSrc} alt='Profile Pic' width={180} height={180} />
        ) : (
          <Image src={singleData?.image_url ? singleData?.image_url : imgSrc} alt='My Image' width={180} height={180} />
        )}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', marginLeft: '1rem' }}>
            <Box sx={{ marginRight: '20px' }}>
              <BasicButton component='label' variant='contained' color='primary' onClick={onClickUpload}>
                Upload New Photo
              </BasicButton>
              <input
                hidden
                type='file'
                name='image_url'
                accept='image/png, image/jpeg'
                id='account-settings-upload-image'
                {...register('image_id')}
                onChange={onFileChange}
              />
            </Box>
            <Box>
              <BasicButton color='secondary' variant='outlined' onClick={onResetClick} typoClass="deleteButtonText">
                Reset
              </BasicButton>
            </Box>
          </Box>
          <Box sx={{ marginLeft: '1rem' }}>
            <BasicTypography variant='body2' sx={{ marginTop: 5 }}>
              Allowed PNG or JPEG. Max size of 800K.
            </BasicTypography>
          </Box>
        </Box>
      </Box>
      <UploadImage
        register={register}
        data={data.children}
        onImageClick={onImageClick}
        singleData={singleData}
        setValue={setValue}
        setSelectedImage={setSelectedImage}
      />
    </Box>
  )
}

export default Imagess
