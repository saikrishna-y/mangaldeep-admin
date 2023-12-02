import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'

import BasicButton from '../button/button'
import BasicTypography from '../typography/typography'
import BannerImageUpload from 'src/ui/uploadImage/bannerImageUpload'
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

const BannerImage = ({ register, data, singleData, setValue }: ImagesProps) => {
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [selectedImage, setSelectedImage] = useState('')
  const [bannerCount, setBannerCount] = useState([0])
  const [imageObj, setImageObj] = useState<{ id: any; imageUrl: string }[]>([{ id: null, imageUrl: '' }])
  console.log(selectedImage)

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

  const onImageClick = (img: any, arrayIndex: number) => {
    const alteredImgObjs = imageObj.map((imgObj, i) => {
      if (i == arrayIndex) {

        return { id: img?.id, imageUrl: img.image_url }
      }

      return imgObj
    })
    setImageObj(alteredImgObjs)
    setValue('image_ids', alteredImgObjs.map((e) => e.id))
  }

  const addBanner = () => {
    setBannerCount(count => [...count, count.length + 1])
    setImageObj(imgArrs => [...imgArrs, { id: null, imageUrl: '' }])
  }

  const deleteBanner = (index: number) => {
    setBannerCount(oldCount => {
      return oldCount.filter(((old, i) => i !== index))
    })
    setImageObj(oldImgArr => {
      return oldImgArr.filter((old, i) => i !== index)
    })
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', marginTop: '1rem', alignItems: 'center' }}>
        <Typography className='fontClass'>Banners: </Typography>
        <Box sx={{ width: '40%', marginLeft: '1rem' }}>
          <BasicButton component='label' variant='contained' color='primary' onClick={addBanner}>
            Add Banner
          </BasicButton>
        </Box>
      </Box>

      {
        bannerCount.map((e, i) => (
          <Box key={i} sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ width: '95%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', py: 5 }}>
                {singleData && singleData?.image_url ? (
                  <Image src={singleData?.image_url} alt='My Image' width={180} height={180} />
                ) : (
                  <Image src={imageObj[i]?.imageUrl ? imageObj[i]?.imageUrl : imgSrc} alt='Profile Pic' width={180} height={180} />
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
              <BannerImageUpload
                register={register}
                data={data.children}
                onImageClick={onImageClick}
                singleData={singleData}
                setValue={setValue}
                setSelectedImage={setSelectedImage}
                arrayIndex={i}
              />
            </Box>
            <Box sx={{ width: '4%' }}>
              <p onClick={() => deleteBanner(i)}>x</p>
            </Box>
          </Box>
        ))
      }
    </Box>
  )
}

export default BannerImage
