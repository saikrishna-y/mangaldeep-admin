import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@mui/material/Box'

import BasicTypography from 'src/ui/typography/typography'
import CheckboxLabels from 'src/ui/checkbox/checkbox'
import BasicTextField from 'src/ui/textField/textField'

interface SingleDataProps {
  locales: any
}
interface LocalesUiProps {
  header?: string
  sectionName?: string
  register?: any
  singleData?: SingleDataProps
  setValue?: any
  validation?: object
  data: { type: string; label: string; name: string; data?: any }
  error?: {};
  mostPlayedSongsData?: any
}

interface ItemsProps {
  name: string
}

interface SelectedLocaleProps {
  name: string
}

const useStyles = makeStyles(() => ({
  tableborder: {
    display: 'flex',
    border: '1px solid rgba(58, 53, 65, 0.22)',
    width: '100%',
    height: '300px',
    position: 'relative'
  },
  tableBorderRight: {
    borderRight: '1px solid rgba(58, 53, 65, 0.22)'
  }
}))

const LocalesUi = ({ register, setValue, singleData, data, mostPlayedSongsData }: LocalesUiProps) => {
  const classes = useStyles()
  const [select, setSelect] = useState(false)
  const [items, setItems] = useState<any[]>([])
  const [filteredData, setFilteredData] = useState(data?.data)

  const handleCheckboxSelectChange = (e: any): void => {
    setSelect(e.target.checked)
    if (e.target.checked) {
      setItems([...data?.data])
    } else {
      setItems([])
    }
  }
  const handleItemClick = (data: SelectedLocaleProps) => {
    const filteredItems = items.filter((item: ItemsProps) => item.name !== data.name)
    setItems(filteredItems)
  }

  const handleClick = (data: any) => {
    const indexOfElement = items.find((item: ItemsProps) => item.name === data.name)

    if (indexOfElement) {
      const filteredItem = items.filter((item: ItemsProps) => item?.name !== data.name)
      setItems(filteredItem)
    } else {
      setItems([...items, data])
    }
  }

  useEffect(() => {
    if (data.data) setFilteredData(data.data)
  }, [mostPlayedSongsData])

  useEffect(() => {
    if (items?.length) {
      const result = items.map(item => item?.name)
      let alteredRes = ''
      result?.forEach(res => {
        alteredRes = alteredRes + res + ', '
      })

      setValue(data.name, alteredRes)
    }
  }, [items, setValue])

  useEffect(() => {
    if (singleData?.locales) {
      // console.log('useEffect => singleData =>', singleData?.locales?.split(", ").filter(e => e !== ''))
      // const result = filteredData?.filter((item: { id: number }) => singleData?.locales.includes(item?.id))
      // const result = singleData?.locales?.split(", ").filter(e => e !== '')
      // const localeData: any[] = []
      // singleData?.locales?.forEach(locale => {
      //   localeData.push(locale?.locale_display_name)
      // })
      setItems(singleData?.locales)
    }
  }, [singleData, filteredData])

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredData = data?.data.filter((item: { name: string }) => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredData(filteredData)
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <BasicTypography variant='h6' color='black'>
            {data?.label}:
          </BasicTypography>
        </Grid>

        <Grid item xs={12} sm={12}>
          <CheckboxLabels
            label={`Select/UnSelect All ${data?.label}`}
            onChange={handleCheckboxSelectChange}
            checked={select}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <BasicTextField label={data?.label} type='search' placeholder={`Search ${data?.label}`} fullWidth onChange={onSearchChange} />
        </Grid>
      </Grid>
      <Grid container className={classes.tableborder}>
        <Grid item xs={6} className={classes.tableBorderRight}>
          <Box sx={{ overflowY: 'scroll', height: '300px' }}>
            <BasicTypography
              variant='h6'
              align='center'
              color='black'
              sx={{ borderBottom: '1px solid rgba(58, 53, 65, 0.22)' }}
            >
              {`All ${data?.label}`}
            </BasicTypography>
            {filteredData?.map((item: { locale_display_name: string; type: string; label: string; name: string; data?: any; Country: { name: string; }; Location: { name: string; }; Language: { name: string; } }) => (
              <Box
                key={item.name}
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  width: '100%',
                  color: 'black',
                  '&:hover': {
                    color: '#7B68EE',
                    backgroundColor: 'lightGray'
                  }
                }}
              >
                <BasicTypography variant='p' onClick={() => handleClick(item)}>
                  {item?.locale_display_name}
                </BasicTypography>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ overflowY: 'scroll', height: '300px' }}>
            <BasicTypography
              variant='h6'
              align='center'
              color='black'
              sx={{ borderBottom: '1px solid rgba(58, 53, 65, 0.22);' }}
            >
              {`Selected ${data?.label}`}
            </BasicTypography>
            {items && items?.map((item: any) => (
              <Box
                key={item.name}
                sx={{
                  padding: 2,
                  cursor: 'pointer',
                  width: '100%',
                  color: 'black',
                  '&:hover': {
                    color: '#7B68EE',
                    backgroundColor: 'lightGray'
                  }
                }}
              >
                <BasicTypography
                  variant='p'
                  key={item.name}
                  label={item.name}
                  onClick={() => handleItemClick(item)}
                  {...register(`${data?.name}`)}
                >
                  {item?.locale_display_name}
                </BasicTypography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default LocalesUi
