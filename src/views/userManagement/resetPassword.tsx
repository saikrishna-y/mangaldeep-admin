import React from 'react'

import { Card, CardContent, CardHeader, Divider, Grid, CardActions } from '@mui/material'

import BasicTextField from 'src/ui/textField/textField'
import BasicButton from 'src/ui/button/button'

const ResetPasswordUi = () => {
  return (
    <Card sx={{ marginTop: '1.8rem' }}>
      <CardHeader title='Reset Password' titleTypographyProps={{ variant: 'h6', color: 'primary' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5} sx={{ marginTop: 4.8, marginBottom: 4.8 }}>
            <Grid item xs={6}>
              <BasicTextField
                fullWidth
                type='email'
                label='Email'
                placeholder='Email'

                // helperText='You can use letters, numbers & periods'
              />
            </Grid>
            <Grid item xs={6}>
              <BasicTextField
                fullWidth
                type='password'
                label='Password'
                placeholder='Password'

                // helperText='You can use letters, numbers & periods'
              />
            </Grid>
            <Grid item xs={6}>
              <BasicTextField
                fullWidth
                type='assword'
                label='Confirm Password'
                placeholder='Confirm Password'

                // helperText='You can use letters, numbers & periods'
              />
            </Grid>
          </Grid>
        </CardContent>
      </form>
      <Divider sx={{ margin: 0 }} />
      <CardActions>
        <Grid item xs={3}>
          <BasicButton
            size='large'
            color='primary'
            variant='contained'

            // sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'red' } }}
          >
            Reset
          </BasicButton>
        </Grid>
      </CardActions>
    </Card>
  )
}

export default ResetPasswordUi
