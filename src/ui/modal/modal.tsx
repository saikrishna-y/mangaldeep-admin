import React, { useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'

const ModalFixed = Modal as any

interface basicModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  sx?: any
}

// function rand() {
//   return Math.round(Math.random() * 20) - 10
// }

function getModalStyle() {
  const top = 45
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      maxWidth: 950,
      maxHeight: 750,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      border: 'none'
    }
  })
)

const BasicModal = ({ open, onClose, children, sx }: basicModalProps) => {
  const classes = useStyles()

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle)

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {children}
    </div>
  )

  return (
    <ModalFixed
      open={open}
      onClose={onClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      sx={sx}
    >
      {body}
    </ModalFixed>
  )
}

export default BasicModal
