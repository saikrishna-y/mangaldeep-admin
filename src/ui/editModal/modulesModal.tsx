import React, { useState, useEffect } from 'react'

import { Box } from '@mui/material'
import ReactAudioPlayer from 'react-audio-player'
import { useForm, Controller } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import BasicTextField from 'src/ui/textField/textField'
import BasicSelect from 'src/ui/select/select'
import CheckboxLabels from 'src/ui/checkbox/checkbox'
import LocalesUi from '../LocalesUI/localesUi'
import { Modules } from '../../formJson/formJsonData'
import Languages from 'src/ui/languages/languages'
import Images from 'src/ui/image/image'
import { client } from 'src/utlis/axios'
import { useMutation } from 'react-query'
import { useQueryClient } from 'react-query'

const ControllerFixed = Controller as any
const ReactAudioPlayerFixed = ReactAudioPlayer as any

interface modulesModalProps {
  singleData?: any
  ref?: any
}

interface TextFieldProps {
  onChange?: () => void | undefined
  value?: any
  ref?: any
}

interface ReactHookFormField {
  field: TextFieldProps
}

interface JsonTitle {
  title?: string
}

const editApiEndPoint = (url: string) => {
  switch (url) {
    case url:
      return `/api${url}edit/`
    default:
      return
  }
}

const ModulesModal = ({ singleData, ref }: modulesModalProps) => {
  const queryClient = useQueryClient()
  const [url, setUrl] = useState('')

  useEffect(() => {

    // const path = window.location.pathname
    // setUrl(path)
    if (window !== undefined) {
      setUrl(window.location.pathname)
    }
  }, [])

  const editTempleRaaga = async (data: any) => {
    const endpoint = await editApiEndPoint(url)

    return client.post(`${endpoint}`, {
      ...data,
      id: singleData.id,
      locales: [1, 2],
      description:
        'A tribute to the source of all life - Bhuja Bhawani by Mangaldeep Temple Raaga celebrates the supreme goddess. Indira Naik lends her soulful voice to this devotional piece.',
      is_android: data.is_android ? data.is_android : false,
      is_ios: data.is_ios ? data.is_ios : false,
      image_url: 'image',
      display_order: parseInt(data.display_order)
    })
  }

  const { isLoading, mutate } = useMutation(editTempleRaaga, {
    onSuccess: () => {
      // Invalidate the query in the shared query cache
      queryClient.invalidateQueries('Deities')
      queryClient.invalidateQueries('Festivals')
      queryClient.invalidateQueries('Languages')
      queryClient.invalidateQueries('Locations')
      queryClient.invalidateQueries('Countries')
      queryClient.invalidateQueries('Locales')
      queryClient.invalidateQueries('Artists')
      queryClient.invalidateQueries('Albums')
      queryClient.invalidateQueries('EditorialCategories')
      queryClient.invalidateQueries('SubCategories')
      queryClient.invalidateQueries('TempleLocatorKeywords')
      queryClient.invalidateQueries('Pandals')
      queryClient.invalidateQueries('FeedbackCategories')
      queryClient.invalidateQueries('PrasadCategory')
      queryClient.invalidateQueries('MangaldeepCategory')
      queryClient.invalidateQueries('MangaldeepIcon')
      queryClient.invalidateQueries('GlobalSearchModules')
      queryClient.invalidateQueries('TempleRaagas')
      queryClient.invalidateQueries('About')
    }
  })

  const data = JSON.parse(Modules())
  const modalUi = data.filter((item: JsonTitle) => item.title === url)

  const {
    control,
    handleSubmit,
    getValues,
    formState: { },
    register,
    setValue
  } = useForm()

  const renderUi = (data: any) => {
    const { type } = data

    switch (type) {
      case 'text':
        return (
          <ControllerFixed
            name={data.name}
            control={control}
            defaultValue={singleData?.length ? singleData[0]?.[data.name] : singleData && singleData[data.name]}
            render={({ field: { onChange, value } }: ReactHookFormField) => (
              <BasicTextField
                label={data.label}
                type='text'
                placeholder={data.label}
                name={data.name}
                fullWidth
                value={value}
                onChange={onChange}
              />
            )}
          />
        )
      case 'select':
        return (
          <ControllerFixed
            name={data.name}
            control={control}
            defaultValue={singleData?.length ? singleData[0]?.[data.name] : singleData && singleData[data.name]}
            render={({ field: { onChange, value } }: ReactHookFormField) => (
              <BasicSelect
                label={data.label}
                name={data.name}
                onChange={onChange as any}
                value={value}
                data={data?.data}

              // option={data?.option}
              />
            )}
          />
        )
      case 'checkbox':
        return (
          <ControllerFixed
            name={data.name}
            control={control}
            defaultValue={singleData?.length ? singleData[0]?.[data.name] : singleData && singleData[data.name]}
            render={({ field: { onChange, value } }: ReactHookFormField) => (
              <CheckboxLabels label={data.label} name={data.name} value={value} onChange={onChange} />
            )}
          />
        )
      case 'audio':
        return <ReactAudioPlayerFixed src={data.name} autoPlay controls />
      case 'languagesList':
        return <Languages />
      case 'img':
        return <Images register={register} data={data} />
      case 'multiSelectTable':
        return <LocalesUi data={data} register={register} setValue={setValue} />
      default:
        return
    }
  }

  const onSubmit = async () => {
    const formData = getValues() // get the updated form values

    await mutate(formData)
  }

  if (isLoading) {
    return <h4>Loading</h4>
  }

  return (
    <Box sx={{ marginTop: 5, marginBottom: 10 }}>
      <form onSubmit={handleSubmit(onSubmit)} ref={ref}>
        {modalUi.map((item: any) => item.addModal.children.map((child: any) => renderUi(child)))}
        <button type='submit' hidden id='form'>
          submit
        </button>
      </form>
      <DevTool control={control} />
    </Box>
  )
}

export default ModulesModal
