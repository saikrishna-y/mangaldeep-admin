import React, { useState, useEffect } from 'react'

import { Box } from '@mui/material'

import BasicTextField from 'src/ui/textField/textField'
import BasicSelect from 'src/ui/select/select'
import CheckboxLabels from 'src/ui/checkbox/checkbox'
import LocalesUi from '../LocalesUI/localesUi'
import Images from 'src/ui/image/image'
import BannerImage from 'src/ui/image/bannerImage'
import Languages from 'src/ui/languages/languages'
import { useForm, Controller } from 'react-hook-form'
import { client } from 'src/utlis/axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import ReactAudioPlayer from 'react-audio-player'
import { DevTool } from '@hookform/devtools'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import PujaMaterialInput from '../inputField/pujaMaterialInput'
import { toast } from 'react-toastify'
import AshtothraDetail from '../inputField/ashtothraDetail'
import QuoteDetail from '../inputField/quoteDetails'

interface ModulesUiProps {
  isModule?: boolean
  onClose: () => void
  ref?: React.MutableRefObject<undefined>
}

const ControllerFixed = Controller as any
const ReactAudioPlayerFixed = ReactAudioPlayer as any

interface ModulesUiProps {
  isModule?: boolean;
  onClose: () => void;
  ref?: React.MutableRefObject<undefined>
}

const fetchJSONTemplate = async () => {
  return await client.get('/api/template')
}

const ModalUi = ({ isModule = false, onClose }: ModulesUiProps) => {
  const queryClient = useQueryClient()
  const [url, setUrl] = useState('')
  const [mostPlayedSongsData, setMostPlayedSongsData] = useState({
    data: [], locales: [], label: 'Most Played Songs', name: 'songs', type: "multiSelectTable", validation: {
      "required": "Please select the song"
    }
  })
  const { data: template } = useQuery('JSONTemplate', fetchJSONTemplate)

  useEffect(() => {
    if (window !== undefined) {
      setUrl(window.location.pathname)
    }
  }, [])

  const data = isModule
    ? template && JSON.parse(template?.data?.data?.modules)
    : template && JSON.parse(template?.data?.data?.masters)
  const modulesModalUi = data?.filter((item: { title: string }) => item.title === url)
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    setValue
  } = useForm()

  const renderUi = (data: any) => {
    const { type } = data
    switch (type) {
      case 'text':
        return (
          <div>
              <ControllerFixed
                name={data.name}
                control={control}
                rules={data.validation}
                render={({ field: { onChange, onBlur, value } }: any) => (
                  <BasicTextField
                    label={data.label}
                    type='text'
                    placeholder={data.label}
                    fullWidth
                    value={value || ""}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errors?.[`${data.name}`]?.message}
                  />
                )}
              />
            <p style={{ color: 'red', marginLeft: '1px' }}>{errors?.[`${data.name}`]?.message}</p>
          </div>
        )
      case 'select':
        return (
          <ControllerFixed
            name={data.name}
            control={control}
            rules={data.validation}
            render={({ field: { onChange, onBlur, value } }: any) => (
              <BasicSelect
                label={data.label}
                value={value || ''}
                onChange={onChange}
                onBlur={onBlur}
                data={data.data}
                setMostPlayedSongsData={setMostPlayedSongsData}
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
              <CheckboxLabels label={data.label} name={data.name} checked={value} value={value} onChange={onChange} error={errors?.[`${data.name}`]?.message} />
            )}
          />
        )
      case 'audio':
        return <ReactAudioPlayerFixed src={data.name} autoPlay controls />
      case 'languagesList':
        return <Languages />
      case 'img':
        return <Images register={register} data={data} setValue={setValue} />
      case 'multiSelectTable':
        return <LocalesUi register={register} data={mostPlayedSongsData.data.length > 0 ? mostPlayedSongsData : data} setValue={setValue} singleData={mostPlayedSongsData} mostPlayedSongsData={mostPlayedSongsData} />
      case 'button':
        return <BannerImage register={register} data={data} setValue={setValue} />
      case 'date':
        return <ControllerFixed
          name={data.name}
          control={control}
          rules={data.validation}
          render={({ field: { onChange, value } }: any) => (
            <DatePicker
              label={data.label}
              value={value}
              onChange={(e) => onChange(dayjs(e).format())}
              sx={{ marginBottom: '1rem' }}
            />
          )}
        />
      case 'pujaMaterialAndQty':
        return <PujaMaterialInput register={register} data={data} setValue={setValue} />
      case 'ashtothraDetails':
        return <AshtothraDetail register={register} data={data} setValue={setValue} />
      case 'quoteDetails':
        return <QuoteDetail register={register} data={data} setValue={setValue} />
      default:
        return
    }
  }

  const addApiEndPoint = (url: string) => {
    switch (url) {
      case url:
        return `/api${url}add`
      default:
        return
    }
  }

  const addModulesLocation = async (data: any) => {
    const endpoint = await addApiEndPoint(url)
    onClose()

    return client.post(`${endpoint}`, data)
  }

  const { mutate } = useMutation(addModulesLocation, {
    onSuccess: (dataOnSuccess: any) => {
      console.log('dataOnSuccess => modules =>', dataOnSuccess)
      toast.success(dataOnSuccess.data.message ? `${dataOnSuccess.data.message}` : `Something went wrong`)

      // Invalidate the query in the shared query cache
      queryClient.invalidateQueries('TempleRaagas')
      queryClient.invalidateQueries('LiveStreamings')
      queryClient.invalidateQueries('MangaldeepGeet')
      queryClient.invalidateQueries('Events')
      queryClient.invalidateQueries('DevotionalSongs')
      queryClient.invalidateQueries('fetchMostPlayedSongs')
      queryClient.invalidateQueries('fetchMangaldeepStore')
      queryClient.invalidateQueries('fetchPuja')
      queryClient.invalidateQueries('fetchSankalp')
      queryClient.invalidateQueries('fetchEditorials')
      queryClient.invalidateQueries('CarouselGroupingModules')
      queryClient.invalidateQueries('CarouselGrouping')
      queryClient.invalidateQueries('Banners')
      queryClient.invalidateQueries('Kavachas')
      queryClient.invalidateQueries('Shlokas')
      queryClient.invalidateQueries('Prasads')
      queryClient.invalidateQueries('TemplesOfIndia')
      queryClient.invalidateQueries('TempleArchitecture')
      queryClient.invalidateQueries('Ashtothras')
      queryClient.invalidateQueries('GeetaQuotesAudio')
      queryClient.invalidateQueries('About')
      queryClient.invalidateQueries('Quotes')
    }
  })

  const onSubmit = (data: any) => {
    // For banners
    if (data?.image_ids) {
      const { image_id, ...rest } = data
      console.log(image_id)
      mutate(rest)

      return
    }

    if (data?.image_id) {
      const { image_id, ...rest } = data
      console.log(image_id)
      const data1 = { ...rest, image_url: 'https://img.freepik.com/free-vector/happy-ram-navami-greetings-red-black-background-indian-hinduism-festival-social-media-banner-free-vector_1340-19090.jpg?w=1060&t=st=1696414115~exp=1696414715~hmac=0a93bb684c9a2f5f40d476ff2467eaded75e2dcbb07d7d438c70e5abf79d3dfb', image_module_id: modulesModalUi[0]?.image_module_id }
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
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        {modulesModalUi && modulesModalUi.map((item: { addModal: { children: {}[] } }) => item.addModal.children.map(child => renderUi(child)))}
        <button type='submit' id='addModule' hidden>
          submit
        </button>
      </form>
      <DevTool control={control} />
    </Box>
  )
}

export default ModalUi
