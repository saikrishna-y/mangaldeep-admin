import React from 'react'
import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

interface filterModalProps {
  open: boolean
  handleClose: () => void
  anchorEl: any
}

const FilterModal = ({ open, handleClose, anchorEl }: filterModalProps) => {
  const [age, setAge] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string)
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
    >
      <Box sx={{ minWidth: 150, height: 230, padding: 4 }}>
        {/* <Box>
          <Typography sx={{ p: 2 }}>Type</Typography>
        </Box> */}
        <Box sx={{ pt: 1, pb: 5 }}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Type</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={age}
              label='Type'
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* <Box>
          <Typography sx={{ p: 2 }}>Value</Typography>
        </Box> */}
        <Box sx={{ pt: 1, pb: 5 }}>
          <TextField id='outlined-basic' label='Value' variant='outlined' />
        </Box>
        <Box sx={{ pt: 1, pb: 2 }}>
          <Button variant='contained' color='primary' sx={{ width: '100%' }}>
            Apply
          </Button>
        </Box>
      </Box>
    </Popover>
  )
}

export default FilterModal
