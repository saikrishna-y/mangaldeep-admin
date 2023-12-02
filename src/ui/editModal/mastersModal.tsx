import React, { useState, useEffect } from 'react'

import { useQuery, useMutation } from 'react-query'
import { useQueryClient } from 'react-query'

import { useForm, Controller } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import ReactAudioPlayer from 'react-audio-player'

import { Box } from '@mui/material'

import BasicTextField from 'src/ui/textField/textField'
import BasicSelect from 'src/ui/select/select'
import CheckboxLabels from 'src/ui/checkbox/checkbox'
import LocalesUi from '../LocalesUI/localesUi'
import Languages from 'src/ui/languages/languages'
import Images from 'src/ui/image/image'
import SecondaryButton from '../secondaryButton/secondaryButton'
import UploadFile from '../uploadFile/uploadFile'
import { client } from 'src/utlis/axios'
import { toast } from 'react-toastify'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import CircularProgress from '@mui/material/CircularProgress'

const ControllerFixed = Controller as any
const ReactAudioPlayerFixed = ReactAudioPlayer as any

interface mastersModalProps {
  isModule?: boolean
  singleData?: any
  ref?: any;
  loading: boolean;
}

interface TextFieldProps {
  onChange?: () => void | undefined
  value?: any
  ref?: any
}

interface ReactHookFormField {
  field: TextFieldProps
}

interface Template {
  data: {
    data: {
      data: {
        masters: string
        modules: string
      }
    }
  }
}

const editApiEndPoint = (url: string) => {
  switch (url) {
    case url:
      return `/api${url}edit/`
    default:
      return
  }
}

const MastersModal = ({ singleData, ref, isModule = false, loading }: mastersModalProps) => {
  const queryClient = useQueryClient()
  const template = useQuery('JSONTemplate') as any
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (window !== undefined) {
      setUrl(window.location.pathname)
    }
  }, [])

  const fetchJsonData = (isModule: boolean, template: Template) => {
    const data = isModule ? template && template?.data?.data?.data?.modules : template && template?.data?.data?.data?.masters

    return JSON.parse(data)
  }

  const editLocation = async (data: any) => {
    try {
      const endpoint = await editApiEndPoint(url)

      await client
        .post(`${endpoint}`, {
          ...data,
          id: singleData?.length ? singleData?.[0]?.id : singleData?.id
        })
        .then((response: { data: any }) => {
          toast.success(response.data.message)
        })
        .catch((err: any) => {
          toast.error(err.message)
        })
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  const { mutate } = useMutation(editLocation, {
    onSuccess: (data: any) => {
      toast.success(`${data?.message}`)

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
      queryClient.invalidateQueries('ModuleStatus')
      queryClient.invalidateQueries('DynamicHeader')
      queryClient.invalidateQueries('ReleaseManagement')

      // modules listing
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
    }
  })

  const data = fetchJsonData(isModule, template)
  const modalUi = data && data.filter((item: { title: string }) => item.title === url)

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { }
  } = useForm()

  const renderUi = (data: { type: string; label: string; name: string; data?: any, valueType: string; }) => {
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
                type={data.valueType ? data.valueType : 'text'}
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
              <CheckboxLabels label={data.label} name={data.name} checked={value} value={value} onChange={onChange} />
            )}
          />
        )
      case 'button':
        return <SecondaryButton register={register} data={data} setValue={setValue} />
      case 'audio':
        return <ReactAudioPlayerFixed src={data.name} autoPlay controls />
      case 'languagesList':
        return <Languages register={register} data={data} setValue={setValue} />
      case 'img':
        return <Images register={register} data={data} singleData={singleData} setValue={setValue} />
      case 'fileUpload':
        return <UploadFile register={register} data={data} setValue={setValue} />
      case 'multiSelectTable':
        return <LocalesUi register={register} setValue={setValue} singleData={singleData} data={data} />
      case 'date':
        return <ControllerFixed
          name={data.name}
          control={control}
          render={({ field: { onChange, value } }: any) => {
            return <DatePicker
              label={data.label}
              value={value}
              onChange={(e) => onChange(dayjs(e).format())}
              sx={{ marginBottom: '1rem' }}
            />
          }}
        />
        case 'descriptiontext':
          return (
            <ControllerFixed
              name={data.name}
              control={control}
              defaultValue={singleData?.length ? singleData[0]?.[data.name] : singleData && singleData[data.name]}
              render={({ field: { onChange, value } }: ReactHookFormField) => (
                <BasicTextField
                  label={data.label}
                  type={data.valueType ? data.valueType : 'descriptiontext'}
                  placeholder={data.label}
                  name={data.name}
                  fullWidth
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          )
      default:
        return
    }
  }

  const addRecordToTrendingNow = async (addOrRemove: string, payLoadForTrendingNow: { typeId: number, categoryName: string, categoryId: number }) => {
    await client.post(`/api/modules/trendingNow/${addOrRemove == 'add' ? 'addFromModule' : 'deleteFromModule'}`, payLoadForTrendingNow)
  }

  const onSubmit = async (data: any) => {
    const formData = getValues() // get the updated form values
    if (data?.image_id) {
      const { image_id, ...rest } = data
      const data1 = { ...rest, 
        image_url: formData?.image_url ? formData?.image_url : 'https://img.freepik.com/premium-vector/vector-illustration-happy-hanuman-jayanti-wishes-greeting_181203-14249.jpg?w=1060', 
        image_module_id: modalUi[0]?.image_module_id 
      }
      if (data?.display_order) {
        data1.display_order = Number(data.display_order)
      }
      if (typeof data?.image_id == 'number') data1.image_id = image_id
      if (!singleData?.is_trending_now && formData?.is_trending_now) {
        addRecordToTrendingNow('add', { typeId: modalUi[0]?.typeId, categoryName: modalUi[0]?.categoryName, categoryId: singleData?.id })
      }
      if (singleData?.is_trending_now && !formData?.is_trending_now) {
        addRecordToTrendingNow('remove', { typeId: modalUi[0]?.typeId, categoryName: modalUi[0]?.categoryName, categoryId: singleData?.id })
      }
      mutate(data1)
    } else {
      mutate(formData)
    }
  }

  return (
    <Box sx={{ marginTop: 5, marginBottom: 10 }}>
      {
        loading
        ? <CircularProgress size={25} color={'warning'} />
        : <form onSubmit={handleSubmit(onSubmit)} ref={ref}>
            {modalUi && modalUi.map((item: any) =>
              item.addModal.children.map((child: { type: string; label: string; name: string; data?: any; valueType: string; }) =>
                renderUi(child)
              )
            )}
            <button type='submit' hidden id='form'>
              submit
            </button>
          </form>
      }
      <DevTool control={control} />
    </Box>
  )
}

export default MastersModal
