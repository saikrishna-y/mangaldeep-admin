import React, { useState } from 'react'
import { Typography, Box } from '@mui/material';
import BasicButton from '../button/button';
import BasicTextField from '../textField/textField';

interface QuotesDetailProps {
  register: any;
  data: {
    isAdd: boolean
    label
    :
    "Description"
    name
    :
    "description"
    type
    :
    "quoteDetails"
  };
  setValue: any
}

const QuoteDetail = ({ data, setValue }: QuotesDetailProps) => {
  const [quotesDetailCount, setquotesDetailCount] = useState<number[]>([])
  const [QuotesData, setQuotesData] = useState<{ name: string }[]>([])

  const increaseQuotesCount = () => {
    setquotesDetailCount(prevCount => [...prevCount, prevCount.length + 1])
    setQuotesData(prevData => [...prevData, { name: '' }])
  }

  const deleteQuotesData = (index: number) => {
    setquotesDetailCount(oldCount => {
      return oldCount.filter(((old, i) => i !== index))
    })
    setQuotesData(oldData => {
      return oldData.filter((old, i) => i !== index)
    })
  }

  const onChangeQuotesData = (quoteCountIndex: number, e: any) => {
    const alteredQuotesData = QuotesData.map((quoteData, i) => {
      if (i == quoteCountIndex) {

        return { name: e.target.value }
      }

      return quoteData
    })
    setQuotesData(alteredQuotesData)
    setValue(data.name, alteredQuotesData.map((data, index) => {
      return { order: index + 1, name: data.name }
    }))

  }

  return (
    <Box sx={{ marginTop: '1rem' }}>
      <Box>
        <Box sx={{ display: 'flex', marginTop: '1rem', alignItems: 'center' }}>
          <Typography className='fontClass'>Description: </Typography>
          <Box sx={{ width: '40%', marginLeft: '1rem' }}>
            <BasicButton component='label' variant='contained' color='primary' onClick={increaseQuotesCount}>
              Add Description
            </BasicButton>
          </Box>
        </Box>
        {
          quotesDetailCount.map((quoteCount, quoteIndex) => (
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }} key={quoteIndex}>
              <Box sx={{ width: '5%' }}>
                <Typography className='fontClass'>{quoteIndex + 1}</Typography>
              </Box>
              <Box sx={{ width: '75%' }}>
                <BasicTextField
                  label={'Description'}
                  type='text'
                  placeholder={'Description'}
                  fullWidth
                  value={QuotesData[quoteIndex].name}
                  onChange={(e) => onChangeQuotesData(quoteIndex, e)}
                />
              </Box>
              <Box sx={{ width: '10%' }}>
                <p onClick={() => deleteQuotesData(quoteIndex)}>x</p>
              </Box>
            </Box>
          ))
        }
      </Box>
    </Box>
  )
}

export default QuoteDetail