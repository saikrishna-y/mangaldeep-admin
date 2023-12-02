import React from 'react'

import AddUserUi from 'src/views/userManagement/addUser'

const AddUser = () => {
  return (
    <AddUserUi />

    // {/* <CardContent>
    //   <Grid container spacing={5}>
    //     <Grid item xs={12}>
    //       <Typography variant='body2' sx={{ fontWeight: 600 }}>
    //         1. Account Details
    //       </Typography>
    //     </Grid>
    //     <Grid item xs={12} sm={6}>
    //       <TextField fullWidth label='Username' placeholder='carterLeonard' />
    //     </Grid>
    //     <Grid item xs={12} sm={6}>
    //       <TextField fullWidth type='email' label='Email' placeholder='carterleonard@gmail.com' />
    //     </Grid>
    //     <Grid item xs={12} sm={6}>
    //       <FormControl fullWidth>
    //         <InputLabel htmlFor='form-layouts-separator-password'>Password</InputLabel>
    //         <OutlinedInput
    //           label='Password'
    //           value={values.password}
    //           id='form-layouts-separator-password'
    //           onChange={handlePasswordChange('password')}
    //           type={values.showPassword ? 'text' : 'password'}
    //           endAdornment={
    //             <InputAdornment position='end'>
    //               <IconButton
    //                 edge='end'
    //                 onClick={handleClickShowPassword}
    //                 onMouseDown={handleMouseDownPassword}
    //                 aria-label='toggle password visibility'
    //               >
    //                 {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
    //               </IconButton>
    //             </InputAdornment>
    //           }
    //         />
    //       </FormControl>
    //     </Grid>
    //     <Grid item xs={12} sm={6}>
    //       <FormControl fullWidth>
    //         <InputLabel htmlFor='form-layouts-separator-password-2'>Confirm Password</InputLabel>
    //         <OutlinedInput
    //           value={values.password2}
    //           label='Confirm Password'
    //           id='form-layouts-separator-password-2'
    //           onChange={handleConfirmChange('password2')}
    //           type={values.showPassword2 ? 'text' : 'password'}
    //           endAdornment={
    //             <InputAdornment position='end'>
    //               <IconButton
    //                 edge='end'
    //                 aria-label='toggle password visibility'
    //                 onClick={handleClickShowConfirmPassword}
    //                 onMouseDown={handleMouseDownConfirmPassword}
    //               >
    //                 {values.showPassword2 ? <EyeOutline /> : <EyeOffOutline />}
    //               </IconButton>
    //             </InputAdornment>
    //           }
    //         />
    //       </FormControl>
    //     </Grid>
    //     <Grid item xs={12}>
    //       <Divider sx={{ marginBottom: 0 }} />
    //     </Grid>
    //     <Grid item xs={12}>
    //       <Typography variant='body2' sx={{ fontWeight: 600 }}>
    //         2. Personal Info
    //       </Typography>
    //     </Grid>
    //     <Grid item xs={12} sm={6}>
    //       <TextField fullWidth label='First Name' placeholder='Leonard' />
    //     </Grid>
    //     <Grid item xs={12} sm={6}>
    //       <TextField fullWidth label='Last Name' placeholder='Carter' />
    //     </Grid>
    //     <Grid item xs={12} sm={6}>
    //       <FormControl fullWidth>
    //         <InputLabel id='form-layouts-separator-select-label'>Country</InputLabel>
    //         <Select
    //           label='Country'
    //           defaultValue=''
    //           id='form-layouts-separator-select'
    //           labelId='form-layouts-separator-select-label'
    //         >
    //           <MenuItem value='UK'>UK</MenuItem>
    //           <MenuItem value='USA'>USA</MenuItem>
    //           <MenuItem value='Australia'>Australia</MenuItem>
    //           <MenuItem value='Germany'>Germany</MenuItem>
    //         </Select>
    //       </FormControl>
    //     </Grid>
    //     <Grid item xs={12} sm={6}>
    //       <FormControl fullWidth>
    //         <InputLabel id='form-layouts-separator-multiple-select-label'>Language</InputLabel>
    //         <Select
    //           multiple
    //           value={language}
    //           onChange={handleSelectChange}
    //           id='form-layouts-separator-multiple-select'
    //           labelId='form-layouts-separator-multiple-select-label'
    //           input={<OutlinedInput label='Language' id='select-multiple-language' />}
    //         >
    //           <MenuItem value='English'>English</MenuItem>
    //           <MenuItem value='French'>French</MenuItem>
    //           <MenuItem value='Spanish'>Spanish</MenuItem>
    //           <MenuItem value='Portuguese'>Portuguese</MenuItem>
    //           <MenuItem value='Italian'>Italian</MenuItem>
    //           <MenuItem value='German'>German</MenuItem>
    //           <MenuItem value='Arabic'>Arabic</MenuItem>
    //         </Select>
    //       </FormControl>
    //     </Grid>
    //     <Grid item xs={12} sm={6}>
    //       <DatePicker
    //         selected={date}
    //         showYearDropdown
    //         showMonthDropdown
    //         placeholderText='MM-DD-YYYY'
    //         customInput={<CustomInput />}
    //         id='form-layouts-separator-date'
    //         onChange={(date: Date) => setDate(date)}
    //       />
    //     </Grid>
    //     <Grid item xs={12} sm={6}>
    //       <TextField fullWidth label='Phone No.' placeholder='+1-123-456-8790' />
    //     </Grid>
    //   </Grid>
    // </CardContent> */}
  )
}

export default AddUser
