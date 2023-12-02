import React from 'react'

import { Card, CardContent, CardHeader } from '@mui/material'
import Grid from '@material-ui/core/Grid'
import Box from '@mui/material/Box'

import ModalUi from 'src/ui/ModalUI/modalUi'

const ChangePasswordUi = () => {
  return (
    <Box sx={{ paddingTop: '1.5rem' }}>
      <Card>
        <CardHeader title='Change Password' titleTypographyProps={{ variant: 'h6', color: 'primary' }} />
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <ModalUi isUserManagement={true} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>

    //     <Card sx={{ marginTop: '1.8rem' }}>
    //       <CardHeader title='Change Your Password' titleTypographyProps={{ variant: 'h6', color: 'primary' }} />
    //       <Divider sx={{ margin: 0 }} />
    //       <form onSubmit={e => e.preventDefault()}>
    //         <CardContent>
    //           <Grid container spacing={5} sx={{ marginTop: 4.8, marginBottom: 4.8 }}>
    //             <Grid item xs={12} sm={6}>
    //               <BasicTextField
    //                 fullWidth
    //                 type='password'
    //                 label='Current Password'
    //                 placeholder='Current Password'

    //                 // helperText='You can use letters, numbers & periods'
    //               />
    //             </Grid>
    //             <Grid item xs={12} sm={6}>
    //               <BasicTextField
    //                 fullWidth
    //                 type='password'
    //                 label='New Password'
    //                 placeholder='New Password'

    //                 // helperText='You can use letters, numbers & periods'
    //               />
    //             </Grid>
    //             <Grid item xs={12} sm={6}>
    //               <BasicTextField
    //                 fullWidth
    //                 type='password'
    //                 label='Confirm Password'
    //                 placeholder='Confirm Password'

    //                 // helperText='You can use letters, numbers & periods'
    //               />
    //             </Grid>
    //           </Grid>
    //         </CardContent>
    //       </form>
    //       <Divider sx={{ margin: 0 }} />
    //       <CardActions>
    //         <Grid item xs={3}>
    //           <BasicButton size='large' color='primary' variant='contained'>
    //             Change Password
    //           </BasicButton>
    //         </Grid>
    //         {/* <BasicButton size='large' color='secondary' variant='outlined'>
    //   Cancel
    // </BasicButton> */}
    //       </CardActions>
    //     </Card>
  )
}

export default ChangePasswordUi
