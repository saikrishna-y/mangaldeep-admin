import * as React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    dialogBox: {
      padding: '1px'
    },
    dialogTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      aligntItems: 'center'
    },
    dialogContent: {
      overflowX: 'hidden',
      maxHeight: '600px',
      overflowY: 'auto'
    },
    closeIcon: {}
  })
)

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogTitle-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(5)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(4)
  }
}))

interface customizedDialogsProps {
  open: boolean
  onClose: () => void
  children?: React.ReactNode
  dialogFirstBtnText?: string
  dialogSecondBtnText?: string
  width?: any
  onSave?: () => void
}

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

// function BootstrapDialogTitle(props: DialogTitleProps) {
//   const { children, onClose, ...other } = props

//   return (
//     <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//       {children}
//       {onClose ? (
//         <IconButton
//           aria-label='close'
//           onClick={onClose}
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: theme => theme.palette.grey[500]
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   )
// }

const CustomizedDialogs = ({
  open,
  onClose,
  onSave,
  children,
  dialogFirstBtnText,
  dialogSecondBtnText
}: customizedDialogsProps) => {
  const classes = useStyles()

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby='customized-dialog-title'
      open={open}
      sx={{
        '& .MuiDialog-paper': {
          minWidth: '850px',

          maxHeight: '450px' // Set the maxHeight of the dialogBox
        }
      }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <Typography variant='h6' color='black' sx={{ fontWeight: 'bold' }} className='fontClass'>
          Save Details
        </Typography>
        <IconButton onClick={onClose} size='small'>
          <CloseIcon

          // fontSize='small'
          // sx={{ background: 'red', borderRadius: '20%', padding: '0px 2px', color: 'white' }}
          />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        {children}
      </DialogContent>
      <DialogActions sx={{ padding: '1rem !important' }}>
        <Button autoFocus onClick={onSave} size='medium' color='secondary' variant='outlined' className='fontClass'>
          {dialogFirstBtnText ? dialogFirstBtnText : 'Save'}
        </Button>
        <Button autoFocus onClick={onClose} size='medium' color='secondary' variant='outlined' className='fontClass'>
          {dialogSecondBtnText ? dialogSecondBtnText : 'Close'}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  )
}

export default CustomizedDialogs
