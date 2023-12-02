import React from 'react'
import Typography from '@mui/material/Typography'

interface BasicTypographyPorps {
  variant?: any
  component?: any
  children: React.ReactNode
  paragraph?: boolean
  sx?: any
  align?: 'center' | 'inherit' | 'justify' | 'left' | 'right'
  color?: string
  onClick?: () => void
}

const BasicTypography = ({
  variant,
  component,
  children,
  paragraph,
  sx,
  align,
  color,
  onClick
}: BasicTypographyPorps) => {
  return (
    <Typography
      variant={variant}
      component={component}
      paragraph={paragraph}
      sx={sx}
      align={align}
      color={color}
      onClick={onClick}
      className='fontClass'
    >
      {children}
    </Typography>
  )
}

export default BasicTypography
