// ** React Imports
import { ReactNode } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'
import Image from 'next/image'

// ** React Query Imports
import { useQuery, useMutation, useQueryClient } from 'react-query'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import { makeStyles } from '@material-ui/core/styles'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// axios
import { client } from '../../utlis/axios'

const useStyles = makeStyles({
  logo: {
    width: 80,
    height: 80,
    objectFit: 'contain',
    border: '1px solid red'
  }
})

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const verifyOtp = async (data: any) => {
  console.log('otp data', await data)
  await client.post('/api/verifyOtp', data)
}

const Otp = () => {
  const classes = useStyles()
  const queryClient = useQueryClient()
  const router = useRouter()
  const mangaldeepLogo = '/images/logos/mangaldeep-logo.png'
  const mangaldeepNamaste = '/images/logos/mangaldeep-namasthe.png'

  const { data } = useQuery('LoginData', () => {
    queryClient.getQueryData('LoginData')
  })

  console.log('lgoin data', data)

  // ** Hook
  const { mutate } = useMutation(verifyOtp, {
    onSuccess: () => {
      router.push('/home')
    }
  })

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('button clicked')
    e.preventDefault()
    mutate({ otp: 123456, user_id: 5 })
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ marginRight: '10px' }}>
              <Image src={mangaldeepNamaste} alt='mangaldeep logo' width={80} height={80} className={classes.logo} />
            </Box>
            <Box sx={{ width: 80, height: 80, objectFit: 'contain' }}>
              <Image src={mangaldeepLogo} alt='mangaldeep logo' width={80} height={80} className={classes.logo} />
            </Box>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Verify the Authorization Code
            </Typography>
            <Typography variant='body2'>Sent to 8919113963</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={onSubmitHandler}>
            <Box sx={{ mb: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ width: '50px' }}>
                <TextField id='standard-basic' variant='standard' size='small' />
              </Box>
              <Box sx={{ width: '50px' }}>
                <TextField id='standard-basic' variant='standard' size='small' />
              </Box>
              <Box sx={{ width: '50px' }}>
                <TextField id='standard-basic' variant='standard' size='small' />
              </Box>
              <Box sx={{ width: '50px' }}>
                <TextField id='standard-basic' variant='standard' size='small' />
              </Box>
              <Box sx={{ width: '50px' }}>
                <TextField id='standard-basic' variant='standard' size='small' />
              </Box>
              <Box sx={{ width: '50px' }}>
                <TextField id='standard-basic' variant='standard' size='small' />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button fullWidth size='small' variant='contained' sx={{ marginBottom: 7, marginRight: 2 }} type='submit'>
                Submit
              </Button>
              <Button fullWidth size='small' variant='contained' sx={{ marginBottom: 7 }}>
                Resend Otp
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

Otp.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Otp
