import { Typography, Box } from '@mui/material';
import React, { useState } from 'react'
import BasicTextField from '../textField/textField';
import BasicButton from '../button/button';
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

interface PujaMaterialInputProps {
  register: any;
  data: any;
  setValue: any
}

const PujaMaterialInput = ({ data, setValue }: PujaMaterialInputProps) => {
  const [pujaMaterialCount, setPujaMaterialCount] = useState([1])
  const [pujaMaterialData, setPujaMaterialData] = useState([{ name: '', optional: false, quantity: '' }])

  const increasePujaMaterialCount = () => {
    setPujaMaterialCount(prevCount => [...prevCount, prevCount.length + 1])
    setPujaMaterialData(prevData => [...prevData, { name: '', optional: false, quantity: '' }])
  }

  const onChangePujaData = (type: string, pujaCountIndex: number, e: any) => {
    if (type == 'name') {
      const alteredPujaData = pujaMaterialData.map((pujaData, i) => {
        if (i == pujaCountIndex) {

          return { ...pujaData, name: e.target.value }
        }

        return pujaData
      })
      setPujaMaterialData(alteredPujaData)
      setValue('puja_materials', alteredPujaData)

      return
    }
    if (type == 'optional') {
      const alteredPujaData = pujaMaterialData.map((pujaData, i) => {
        if (i == pujaCountIndex) {

          return { ...pujaData, optional: !pujaData.optional }
        }

        return pujaData
      })
      setPujaMaterialData(alteredPujaData)
      setValue('puja_materials', alteredPujaData)

      return
    }
    if (type == 'quantity') {
      const alteredPujaData = pujaMaterialData.map((pujaData, i) => {
        if (i == pujaCountIndex) {

          return { ...pujaData, quantity: e.target.value }
        }

        return pujaData
      })
      setPujaMaterialData(alteredPujaData)
      setValue('puja_materials', alteredPujaData)

      return
    }
  }

  const deletePujaData = (index: number) => {
    setPujaMaterialCount(oldCount => {
      return oldCount.filter(((old, i) => i !== index))
    })
    setPujaMaterialData(oldPujaData => {
      return oldPujaData.filter((old, i) => i !== index)
    })
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', marginTop: '1rem', alignItems: 'center' }}>
        <Typography className='fontClass'>{data.label}: </Typography>
        <Box sx={{ width: '40%', marginLeft: '1rem' }}>
          <BasicButton component='label' variant='contained' color='primary' onClick={increasePujaMaterialCount}>
            Add Puja Material
          </BasicButton>
        </Box>
      </Box>

      {
        pujaMaterialCount.map((pujaCount, pujaCountIndex) => (
          <Box key={pujaCountIndex} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <BasicTextField
              label={'Name'}
              type='text'
              placeholder={'Name'}
              value={pujaMaterialData[pujaCountIndex].name}
              onChange={(e) => onChangePujaData('name', pujaCountIndex, e)}
            />
            <FormControlLabel
              control={<Checkbox />}
              label={<Typography className='fontClass'>Optional</Typography>}
              checked={pujaMaterialData[pujaCountIndex].optional}
              onChange={(e) => onChangePujaData('optional', pujaCountIndex, e)}
              sx={{ marginLeft: 'inherit', paddingRight: '10px' }}
            />
            <BasicTextField
              label={'Quantity'}
              type='text'
              placeholder={'Quantity'}
              value={pujaMaterialData[pujaCountIndex].quantity}
              onChange={(e) => onChangePujaData('quantity', pujaCountIndex, e)}
            />
            <p onClick={() => deletePujaData(pujaCountIndex)}>x</p>
          </Box>
        ))
      }
    </Box>
  )
}

export default PujaMaterialInput