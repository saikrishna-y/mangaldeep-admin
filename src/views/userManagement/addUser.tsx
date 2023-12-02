import React from 'react'
import { Card, CardContent, CardHeader } from '@mui/material'
import Grid from '@material-ui/core/Grid'
import Box from '@mui/material/Box'

import ModalUi from 'src/ui/ModalUI/modalUi'

const AddUserUi = () => {
  return (
    <Box sx={{ paddingTop: '1.5rem' }}>
      <Card>
        <CardHeader title='Add User' titleTypographyProps={{ variant: 'h6', color: 'primary' }} />
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <ModalUi isUserManagement={true} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>

    // <Card sx={{ marginTop: '1.8rem' }}>
    //   <CardHeader title='Add User' titleTypographyProps={{ variant: 'h6', color: 'primary' }} />
    //   <Divider sx={{ margin: 0 }} />
    //   <form onSubmit={e => e.preventDefault()}>
    //     <CardContent>
    //       <Grid container spacing={5}>
    //         <Grid item xs={6} sm={6}>
    //           <BasicTextField fullWidth label='First Name' placeholder='First Name' />
    //         </Grid>
    //         <Grid item xs={12} sm={6}>
    //           <BasicTextField
    //             fullWidth
    //             type='text'
    //             label='Last Name'
    //             placeholder='Last Name'
    //             helperText='You can use letters, numbers & periods'
    //           />
    //         </Grid>
    //         <Grid item xs={12} sm={6}>
    //           <BasicTextField
    //             fullWidth
    //             type='email'
    //             label='Email'
    //             placeholder='carterleonard@gmail.com'
    //             helperText='You can use letters, numbers & periods'
    //           />
    //         </Grid>
    //         <Grid item xs={12} sm={6}>
    //           <BasicTextField
    //             fullWidth
    //             type='password'
    //             label='Password'
    //             placeholder='Password'
    //             helperText='You can use letters, numbers & periods'
    //           />
    //         </Grid>
    //         <Grid item xs={12} sm={6}>
    //           <BasicTextField
    //             fullWidth
    //             type='password'
    //             label='Confirm Password'
    //             placeholder='Confirm Password'
    //             helperText='You can use letters, numbers & periods'
    //           />
    //         </Grid>
    //       </Grid>
    //     </CardContent>
    //     <Divider sx={{ margin: 0 }} />
    //     <CardActions>
    //       <Grid item xs={3}>
    //         <BasicButton size='large' color='primary' variant='contained'>
    //           Register
    //         </BasicButton>
    //       </Grid>
    //       {/* <BasicButton size='large' color='secondary' variant='outlined'>
    //       Cancel
    //     </BasicButton> */}
    //     </CardActions>
    //   </form>
    // </Card>
  )
}

export default AddUserUi
