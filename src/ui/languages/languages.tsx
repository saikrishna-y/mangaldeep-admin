import React, { useState } from 'react'

import { Grid } from '@mui/material'
import { Box } from '@mui/material'

import BasicButton from 'src/ui/button/button'

interface LanguageProps {
  register?: any
  data?: any
  singleData?: {}
  setValue?: any
}

const languagesList = [
  {
    name: 'English',
    value: 1,
    key: 1
  },
  {
    name: 'Hindi',
    value: 2,
    key: 2
  },
  {
    name: 'Tamil',
    value: 3,
    key: 3
  },
  {
    name: 'Telugu',
    value: 4,
    key: 4
  },
  {
    name: 'Kannada',
    value: 5,
    key: 5
  },
  {
    name: 'Marathi',
    value: 6,
    key: 6
  },
  {
    name: 'Gujarati',
    value: 7,
    key: 7
  },
  {
    name: 'Bengali',
    value: 8,
    key: 8
  },
  {
    name: 'Nepali',
    value: 9,
    key: 9
  }
]

const Languages = ({ register, setValue }: LanguageProps) => {
  const [language, setLanguage] = useState()

  const onLanguageClick = (data: any) => {
    setLanguage(data.name)
    setValue('language_id', data.value)
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {languagesList?.map((item, index) => (
            <Box sx={{ width: '200px' }} key={index}>
              <BasicButton
                variant={item.name === language ? 'contained' : undefined}
                color='primary'
                onClick={() => onLanguageClick(item)}
                {...register('language_id')}
              >
                {item.name}
              </BasicButton>
            </Box>
          ))}
          {/* <Box sx={{ width: '200px' }}>
            <BasicButton
              variant={language === 'Hindi' ? 'contained' : undefined}
              color='primary'
              onClick={() => onLanguageClick('Hindi')}
            >
              Hindi
            </BasicButton>
          </Box>
          <Box sx={{ width: '200px' }}>
            <BasicButton onClick={() => onLanguageClick('Tamil')}>Tamil</BasicButton>
          </Box>
          <Box sx={{ width: '200px' }}>
            <BasicButton onClick={() => onLanguageClick('Telugu')}>Telugu</BasicButton>
          </Box>
          <Box sx={{ width: '200px' }}>
            <BasicButton onClick={() => onLanguageClick('Kannada')}>Kannada</BasicButton>
          </Box>
          <Box sx={{ width: '200px' }}>
            <BasicButton onClick={() => onLanguageClick('Marathi')}>Marathi</BasicButton>
          </Box>
          <Box sx={{ width: '200px' }}>
            <BasicButton onClick={() => onLanguageClick('Gujarati')}>Gujarati</BasicButton>
          </Box>
          <Box sx={{ width: '200px' }}>
            <BasicButton onClick={() => onLanguageClick('Bengali')}>Bengali</BasicButton>
          </Box>
          <Box sx={{ width: '200px' }}>
            <BasicButton onClick={() => onLanguageClick('Nepali')}>Nepali</BasicButton>
          </Box> */}
        </Box>
      </Grid>
    </Grid>
  )
}

export default Languages
