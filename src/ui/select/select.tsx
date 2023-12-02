import * as React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Grid from '@mui/material/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Noop } from 'react-hook-form'
import { client } from 'src/utlis/axios'

type FieldError = any
interface selectProps {
  sx?: any
  value?: string
  label: string
  onChange?: (event: any) => void
  onBlur?: Noop
  name?: string
  error?: string | undefined | FieldError
  data?: { label: string; value: number }[]
  setMostPlayedSongsData?: any
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const useStyles = makeStyles({
  menuItem: {
    display: 'flex',
    padding: '7px',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  inputLabel: {
    top: '-9px',
    '&.Mui-focused': {
      top: '0'
    }
  }
})

const BasicSelect = ({ label, sx, value, onChange, name, data, error, setMostPlayedSongsData }: selectProps) => {
  const classes = useStyles()

  React.useEffect(() => {
    if (label == 'Select Locales' && value) onChangeForMostPlayedSongs()
  }, [value])

  const onChangeForMostPlayedSongs = async () => {
    const mostPlayedSongsData = await client.post('/api/modules/devotionalSong/mostPlayedSong/getSongs', {
      locale_id: value
    })
    console.log('onChangeForMostPlayedSongs => mostPlayedSongsData =>', mostPlayedSongsData)
    setMostPlayedSongsData((prevData: object) => {
      return { ...prevData, data: mostPlayedSongsData.data.data, locales: mostPlayedSongsData.data.locales }
    })
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12}>
        <FormControl sx={{ mt: 2, minWidth: 300, width: '100%' }}>
          <InputLabel className={classes.inputLabel} id='demo-multiple-name-label'>
            {label}
          </InputLabel>
          <Select
            labelId='demo-multiple-name-label'
            id='demo-multiple-name'
            value={value ? value : ''}
            name={name}
            onChange={onChange}
            input={<OutlinedInput label={label} className='fontClass' sx={{ display: 'block' }} />}
            MenuProps={MenuProps}
            sx={sx}
          >
            {data &&
              data?.map((item, index) => (
                <MenuItem value={item?.value} key={index} className={classes.menuItem}>
                  {item?.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Grid>
    </Grid>
  )
}

export default BasicSelect
