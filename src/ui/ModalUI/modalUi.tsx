import React, { useState, useEffect } from 'react'

import { useQuery } from 'react-query'
import { useMutation, useQueryClient } from 'react-query'

import { useForm, Controller } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import ReactAudioPlayer from 'react-audio-player'

import { Box, Autocomplete, TextField } from '@mui/material'

import BasicTextField from 'src/ui/textField/textField'
import BasicSelect from 'src/ui/select/select'
import CheckboxLabels from 'src/ui/checkbox/checkbox'
import LocalesUi from '../LocalesUI/localesUi'
import Languages from 'src/ui/languages/languages'
import Images from 'src/ui/image/image'
import UploadFile from '../uploadFile/uploadFile'
import SecondaryButton from '../secondaryButton/secondaryButton'
import Paragraph from '../paragraph/paragraph'
import { client } from 'src/utlis/axios'
import { toast } from 'react-toastify'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

const ControllerFixed = Controller as any
const ReactAudioPlayerFixed = ReactAudioPlayer as any

interface ModalUIProps {
  isModule?: boolean
  onClose?: any
  isUserManagement?: boolean
}

const addApiEndPoint = (url: string) => {
  switch (url) {
    case '/modules/panchang/panchangFileUpload/':
      return `/api${url}upload`
    case '/userManagement/addUserGroup/':
      return `/api/${url}`
    case '/userManagement/addUser/':
      return `/api${url}`
    case '/userManagement/changePassword/':
      return `/api${url}`
    case url:
      return `/api${url}add`
    default:
      return
  }
}

const fetchJSONTemplate = async () => {
  return await client.get('/api/template')
}

const ModalUi = ({ onClose, isModule = false, isUserManagement = false }: ModalUIProps) => {
  const queryClient = useQueryClient()
  const [url, setUrl] = useState('')
  const { data: template } = useQuery('JSONTemplate', fetchJSONTemplate)

  useEffect(() => {
    if (window !== undefined) {
      setUrl(window.location.pathname)
    }
  }, [])

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const addLocation = async (data: any) => {
    const endpoint = await addApiEndPoint(url)
    onClose()

    return client.post(`${endpoint}`, data)
  }

  const { mutate } = useMutation(addLocation, {
    onSuccess: dataOnSuccess => {
      dataOnSuccess?.data.message
      ? toast.success(`${dataOnSuccess?.data?.message}`)
      : toast.error(`Something went wrong`)
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
      queryClient.invalidateQueries('ModuleStatus')
      queryClient.invalidateQueries('DynamicHeader')
      queryClient.invalidateQueries('ReleaseManagement')

      // modules list
      queryClient.invalidateQueries('DainikPanchang')
      queryClient.invalidateQueries('FestivalCalendar')
      queryClient.invalidateQueries('Mantras')
      queryClient.invalidateQueries('Shlokas')
      queryClient.invalidateQueries('Ashtothras')
      queryClient.invalidateQueries('Chalisas')
      queryClient.invalidateQueries('Kavachas')
      queryClient.invalidateQueries('TemplesOfIndia')
      queryClient.invalidateQueries('TempleArchitecture')
      queryClient.invalidateQueries('GeetaQuotesAudio')
      queryClient.invalidateQueries('Prasads')
      queryClient.invalidateQueries('Banners')

      // User management
      queryClient.invalidateQueries('UserGroups')
    }
  })

  const data = isModule
    ? template && JSON.parse(template?.data?.data?.modules)
    : isUserManagement
    ? template && JSON.parse(template?.data?.data?.userManagement)
    : template && JSON.parse(template?.data?.data?.masters)
  const modalUi = data && data.filter((item: { title: string }) => item?.title === url)
  const renderUi = (data: {
    type: string
    label: string
    name: string
    data?: any
    valueType?: string
    validation?: { required?: string }
  }) => {
    const { type } = data

    switch (type) {
      case 'text':
        return (
          <ControllerFixed
            name={data.name}
            control={control}
            rules={data.validation}
            render={({ field: { onChange, value } }: any) => (
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
            rules={data.validation}
            render={({ field: { onChange, value } }: any) => (
              <BasicSelect
                label={data.label}
                name={data.name}
                onChange={onChange}
                value={value || ''}
                data={data?.data}
                error={errors?.[`${data.name}`]?.message}
              />
            )}
          />
        )
      case 'checkbox':
        return (
          <ControllerFixed
            name={data.name}
            control={control}
            rules={data.validation}
            render={({ field: { onChange, value } }: any) => (
              <CheckboxLabels
                label={data.label}
                name={data.name}
                checked={value}
                value={value}
                onChange={onChange}
                error={errors?.[`${data.name}`]?.message}
              />
            )}
          />
        )
      case 'date':
        return (
          <ControllerFixed
            name={data.name}
            control={control}
            rules={data.validation}
            render={({ field: { onChange, value } }: any) => (
              <DatePicker
                label={data.label}
                value={value}
                onChange={e => onChange(dayjs(e).format())}
                sx={{ marginBottom: '1rem' }}
              />
            )}
          />
        )
      case 'button':
        return (
          <SecondaryButton register={register} data={data} setValue={setValue} isUserManagement={isUserManagement} />
        )
      case 'audio':
        return <ReactAudioPlayerFixed src={data.name} autoPlay controls />
      case 'languagesList':
        return <Languages register={register} data={data} setValue={setValue} />
      case 'img':
        return <Images register={register} data={data} setValue={setValue} />
      case 'paragraph':
        return <Paragraph register={register} data={data} setValue={setValue} />
      case 'fileUpload':
        return <UploadFile register={register} data={data} setValue={setValue} />
      case 'multiSelectTable':
        return <LocalesUi register={register} data={data} setValue={setValue} />
      case 'autocomplete':
        return (
          <Autocomplete
            multiple
            disablePortal
            id='combo-box-demo'
            options={data.data.map((e: { email: string }) => {
              return { label: e.email }
            })}
            renderInput={params => <TextField {...params} label='Email' />}
            {...register(`${data?.name}`)}
            onChange={(e, v) => {
              setValue(
                data.name,
                v.map((selectedEmail: any) => selectedEmail.label)
              )
            }}
          />
        )
      default:
        return
    }
  }

  const onSubmit = (data: any) => {
    if (data?.image_id) {
      const { image_id, ...rest } = data
      const data1 = {
        ...rest,
        image_url:
          'https://img.freepik.com/free-vector/happy-diwali-traditional-white-decorative-background_1017-34303.jpg?w=1060&t=st=1696408354~exp=1696408954~hmac=ffd495fc141b50c16067a11364b7dbe3e4f7f9c5c08bb94cd8458c7f8a635b28',
        image_module_id: modalUi[0]?.image_module_id
      }
      if (data?.display_order) {
        data1.display_order = Number(data.display_order)
      }
      if (typeof data?.image_id == 'number') data1.image_id = image_id
      mutate(data1)
    } else {
      if (data?.display_order) {
        data.display_order = Number(data.display_order)
      }
      mutate(data)
    }
  }

  return (
    <Box sx={{ marginTop: 5, marginBottom: 10 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {modalUi?.map((item: any) =>
          item.addModal.children.map((child: { type: string; label: string; name: string; data?: any }) =>
            renderUi(child)
          )
        )}
        <button type='submit' id='add' hidden>
          submit
        </button>
      </form>
      <DevTool control={control} />
    </Box>
  )
}

export default ModalUi
