import React, { useState } from 'react'
import { Typography, Box } from '@mui/material';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import BasicButton from '../button/button';
import BasicTextField from '../textField/textField';

interface AstotthhraDetailProps {
  register: any;
  data: any;
  setValue: any
}

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  width: 320px;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 24px ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const AshtothraDetail = ({ data, setValue }: AstotthhraDetailProps) => {
  const [names, setNames] = useState('')
  const [ashtothraDetailCount, setAshtothraDetailCount] = useState<number[]>([])
  const [ashtothraData, setAshtothraData] = useState<{ name: string }[]>([])

  const increaseAshtothraCount = () => {
    setAshtothraDetailCount(prevCount => [...prevCount, prevCount.length + 1])
    setAshtothraData(prevData => [...prevData, { name: '' }])
  }

  const deleteAshtothraData = (index: number) => {
    setAshtothraDetailCount(oldCount => {
      return oldCount.filter(((old, i) => i !== index))
    })
    setAshtothraData(oldData => {
      return oldData.filter((old, i) => i !== index)
    })
  }

  const onChangeAshtothraData = (ashtothraCountIndex: number, e: any) => {
    const alteredAshtothraData = ashtothraData.map((ashData, i) => {
      if (i == ashtothraCountIndex) {

        return { name: e.target.value }
      }

      return ashData
    })
    setAshtothraData(alteredAshtothraData)
    setValue(data.name, alteredAshtothraData.map((data, index) => {
      return { order: index + 1, name: data.name }
    }))

  }

  const autoFillAshtothraNames = () => {
    if (names.length > 0) {
      console.log('autoFillAshtothraNames => names =>', names)
      console.log('autoFillAshtothraNames =>', JSON.stringify(names).split("\\"))
      const namesWithoutSlash = JSON.stringify(names).split("\\")
      namesWithoutSlash.map((name) => {
        setAshtothraDetailCount(prevCount => [...prevCount, prevCount.length + 1])
        setAshtothraData(prevData => [...prevData, { name: name.replace('"', '') }])
      })
    }
  }

  return (
    <Box sx={{ marginTop: '1rem' }}>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ width: '49%' }}>
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Copy & Paste the Ashtothra Names"
            className='fontClass'
            value={names}
            onChange={(e) => setNames(e.target.value)}
          />
        </Box>
        <Box>
          <BasicButton component='label' variant='contained' color='primary' onClick={autoFillAshtothraNames}>
            Auto Fill Ashtothra Names
          </BasicButton>
        </Box>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', marginTop: '1rem', alignItems: 'center' }}>
          <Typography className='fontClass'>Ashtothra Names: </Typography>
          <Box sx={{ width: '40%', marginLeft: '1rem' }}>
            <BasicButton component='label' variant='contained' color='primary' onClick={increaseAshtothraCount}>
              Add Ashtothra Name
            </BasicButton>
          </Box>
        </Box>
        {
          ashtothraDetailCount.map((ashCount, ashIndex) => (
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }} key={ashIndex}>
              <Box sx={{ width: '5%' }}>
                <Typography className='fontClass'>{ashIndex + 1}</Typography>
              </Box>
              <Box sx={{ width: '75%' }}>
                <BasicTextField
                  label={'Name'}
                  type='text'
                  placeholder={'Name'}
                  fullWidth
                  value={ashtothraData[ashIndex].name}
                  onChange={(e) => onChangeAshtothraData(ashIndex, e)}
                />
              </Box>
              <Box sx={{ width: '10%' }}>
                <p onClick={() => deleteAshtothraData(ashIndex)}>x</p>
              </Box>
            </Box>
          ))
        }
      </Box>
    </Box>
  )
}

export default AshtothraDetail