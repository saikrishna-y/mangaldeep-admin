import React, { useState, useEffect } from 'react'

import Image from 'next/image'

import { Box } from '@mui/material'

import BasicTypography from '../typography/typography'
import BasicSelect from 'src/ui/select/select'
import CheckboxLabels from 'src/ui/checkbox/checkbox'
import { client } from 'src/utlis/axios'

interface UploadImagesPropTypes {
  register: any
  data: [{}]
  onImageClick: (img: any) => void
  singleData?: { isCustomizedGod: boolean; image_url: string; }
  setValue?: any;
  setSelectedImage: (imageUrl: string) => void
}

function UploadImage({ register, data, singleData, setValue, setSelectedImage }: UploadImagesPropTypes) {

  const [selectedImageModule, setSelectedImageModule] = useState<any>('')
  const [selectedLocale, setSelectedLocale] = useState('')
  const [checked, setChecked] = useState(false)
  const [locales, setLocales] = useState<any>([])
  const [images, setImages] = useState([])

  useEffect(() => {
    if (singleData) {
      setValue('isCustomizedGod', singleData.isCustomizedGod)
    }
  }, [singleData, setValue])

  const fetchImagesOnModuleSelect = async (module_id: number, locales: []) => {
    const images = await client.post('/api/images', { module_id, locales })
    setImages(images.data)
  }

  const fetchImagesOnLocaleSelect = async (module_id: number, locales: number[]) => {
    const images = await client.post('/api/images', { module_id, locales })
    setImages(images.data)
  }

  const onImageModuleChange = (e: any) => {
    setSelectedImageModule(e.target.value)
    fetchImagesOnModuleSelect(e.target.value, locales)
  }

  const onLocaleChange = (e: any) => {

    setSelectedLocale(e.target.value)
    setLocales([e.target.value])
    fetchImagesOnLocaleSelect(selectedImageModule, [e.target.value])
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked
    const value = checked ? true : false
    setValue('isCustomizedGod', value)
    setChecked(event.target.checked)
  }

  return (
    <Box>
      {data?.map((item: any) => (
        <>
          {item.hasChooseUploadImages && (
            <BasicTypography variant='h6' color='black'>
              {item.name} :
            </BasicTypography>
          )}
          {item.props.hasImageModules && (
            <BasicSelect
              label='Select Image Module'
              data={item.props?.hasImageModulesData?.data}
              value={selectedImageModule || ''}
              onChange={onImageModuleChange}
            />
          )}
          {item.props.hasLocale && (
            <BasicSelect
              label='Select Locale'
              data={item.props?.hasLocaleData?.data}
              value={selectedLocale}
              onChange={onLocaleChange}
            />
          )}

          <Box sx={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexWrap: 'wrap', marginTop: '1rem' }}>
            {
              images && images.map((image: { id: number; image_url: string }) => (
                <Box sx={{ marginLeft: '0.2rem', marginRight: '0.2rem' }} key={image.id}>
                  <Image
                    src={image.image_url}
                    width={50} height={50}
                    onClick={() => {
                      setSelectedImage(image.image_url)
                      setValue('image_id', image.id)
                      setValue('image_url', image.image_url)
                    }} />
                </Box>
              ))
            }
          </Box>

          {item.props.hasIsCustomisedGod && (
            <CheckboxLabels
              label='Is Customized God'
              name='isCustomized'
              {...register('isCustomizedGod')}
              checked={checked}
              value={!checked || undefined ? false : true}
              onChange={handleChange}
            />
          )}
        </>
      ))}
    </Box>
  )
}

export default UploadImage
