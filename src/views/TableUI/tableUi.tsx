import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Box from '@mui/material/Box'
import { Skeleton } from '@mui/material'
import BasicButton from 'src/ui/button/button'
import CustomTable from 'src/ui/table/table'
import BasicTypography from 'src/ui/typography/typography'
import { client } from '../../utlis/axios'
import { useQuery } from 'react-query'
import { toast } from '../../utlis/toaster'
import Input from '@mui/material/Input';
import * as XLSX from 'xlsx'

interface RowTypes {
  id: number
  artist_name?: string
  description?: string
  display_order?: number
  duration?: string
  image_url?: string
  is_active?: boolean
  is_android?: boolean
  is_ios?: boolean
  locales?: []
  name?: string
  url?: string
}

interface Column {
  id: string
  name: string
}

interface TableProps {
  addButtonText?: string
  tableHeaderText?: string
  uploadExcel?: string
  onClick?: any
  columns?: Column[]
  rows?: { data: RowTypes[] }
  deleteIcon?: boolean
  details?: string
  isModule?: boolean
  CommentDetails?: { label: string; id: string }[]
  isLoading?: boolean;
  isEdit?: boolean
}

const fetchJSONTemplate = async () => {
  return await client.get('/api/template')
}

const TableUI = ({
  isModule,
  tableHeaderText,
  addButtonText,
  onClick,
  uploadExcel,
  columns,
  rows,
  deleteIcon,
  details,
  CommentDetails,
  isLoading,
  isEdit = true
}: TableProps) => {

  const { isLoading: templateLoading, refetch } = useQuery('JSONTemplate', fetchJSONTemplate)

  const onAddButtonClick = async () => {
    try {
      await refetch().then(response => {
        if (onClick) {
          onClick()
        }

        return response.data
      })
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  const handleFileUpload = (e: any) => {
    const reader = new FileReader()
    reader.readAsBinaryString(e.target.files[0])
    reader.onload = (load: any) => {
      const data = load.target.result
      const workbook = XLSX.read(data, { type: 'binary' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const parsedData = XLSX.utils.sheet_to_json(sheet)
      console.log('handleFileUpload => parsedData =>', parsedData.map((pData: any) => {
        return { ...pData, locales: JSON.parse(pData.locales.replace('{', '[').replace('}', ']')) }
      }))
      callAddGeetaQuote(parsedData.map((pData: any) => {
        return { ...pData, locales: JSON.parse(pData.locales.replace('{', '[').replace('}', ']')) }
      }))
    }
  }

  const callAddGeetaQuote = async (geetaQuotes: {}[]) => {
    await client.post('add', { geetaQuotes })
  }

  return (
    <Box sx={{ paddingTop: '1.5rem' }}>
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              {isLoading ? (
                <BasicTypography variant='h5' color='primary'>
                  <Skeleton variant='rounded' width='200px' height='30px' animation='wave' />
                </BasicTypography>
              ) : (
                <BasicTypography variant='h5' color='primary'>
                  {tableHeaderText}
                </BasicTypography>
              )}
              {uploadExcel || addButtonText ? (
                ''
              ) : (
                <BasicTypography variant='body2'>add any helper text</BasicTypography>
              )}
            </Box>
            {isLoading ? (
              <BasicTypography variant='h5' color='primary'>
                <Skeleton variant='rounded' width='250px' height='40px' animation='wave' />
              </BasicTypography>
            ) : addButtonText ? (
              <Box>
                <BasicButton variant='contained' color='primary' onClick={onAddButtonClick}>
                  {templateLoading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CircularProgress size={25} color={'warning'} /> {addButtonText}
                    </Box>
                  ) : (
                    addButtonText
                  )}
                </BasicButton>
              </Box>
            ) : uploadExcel ? (
              <Box>
                {/* <BasicButton variant='contained' color='primary'>
                  {uploadExcel}
                </BasicButton> */}
                <Input type="file" typeof='.xlsx .xls' onChange={handleFileUpload} />
              </Box>
            ) : (
              ''
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Box sx={{ paddingTop: '1.5rem' }}>
            <CustomTable
              columns={columns && columns}
              rows={typeof rows?.data === 'string' ? rows?.data && JSON.parse(rows?.data) : rows?.data}
              deleteIcon={deleteIcon}
              details={details}
              isModule={isModule}
              isLoading={isLoading}
              CommentDetails={CommentDetails}
              isEdit={isEdit}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TableUI
