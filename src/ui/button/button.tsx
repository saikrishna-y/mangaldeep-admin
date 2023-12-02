import * as React from 'react'
import { Button } from '@material-ui/core'
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'

interface BasicButtonProps {
  variant?: 'contained' | 'outlined' | 'text' | undefined
  className?: any
  fullWidth?: boolean
  color?: 'inherit' | 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  children?: React.ReactNode

  // onClick?: Function | undefined
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined
  component?: any
  onSubmit?: any
  typoClass?: string;
}

const BasicButton = ({
  variant,
  onClick,
  className,
  color,
  size,
  children,
  component,
  type,
  onSubmit,
  typoClass = 'buttonText'
}: BasicButtonProps) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12}>
        <Button
          variant={variant}
          onClick={onClick}
          className={className}
          fullWidth
          color={color}
          size={size}
          type={type}
          component={component}
          onSubmit={onSubmit}
        >
          <Typography className={typoClass}>{children}</Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

export default BasicButton
