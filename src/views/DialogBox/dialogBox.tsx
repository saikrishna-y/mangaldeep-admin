import React, { useState } from 'react'

import Grid from '@mui/material/Grid'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import BasicTypography from 'src/ui/typography/typography'
import BasicTextField from 'src/ui/textField/textField'
import BasicButtons from 'src/ui/button/button'
import BasicSelect from 'src/ui/select/select'
import CheckboxLabels from 'src/ui/checkbox/checkbox'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 180,
  height: 180,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const DialogUi = () => {
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')

  return (
    <Box>
      <Grid item xs={12}>
        <BasicTextField label='Name' />
      </Grid>
      <Box sx={{ marginTop: 4.8, marginBottom: 3 }}>
        <Grid container spacing={5}>
          {/* <Grid container sx={{ border: '2px solid red', width: '100%' }} spacing={2}> */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <BasicButtons component='label' variant='contained'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </BasicButtons>
                <BasicButtons color='secondary' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </BasicButtons>
                <BasicTypography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </BasicTypography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ padding: 0 }}>
            <BasicTypography variant='h6'>Choose From Uploaded Images :</BasicTypography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ padding: 0 }}>
            <BasicSelect label='Select Image Module' />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ padding: 0 }}>
            <BasicSelect label='Select Locales' />
          </Grid>
          <Grid item xs={12} sx={{ padding: 0 }}>
            <CheckboxLabels label='Is Customized God' />
          </Grid>
          {/* </Grid> */}
        </Grid>
      </Box>
    </Box>
  )
}

export default DialogUi
