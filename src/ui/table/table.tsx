import React, { useState, useEffect, useRef } from 'react'

import { useMutation, useQuery, useQueryClient } from 'react-query'

import { Skeleton, Typography } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Box from '@mui/material/Box'
import TablePagination from '@material-ui/core/TablePagination'
import IconButton from '@mui/material/IconButton'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import CircularProgress from '@mui/material/CircularProgress'

import { client } from 'src/utlis/axios'
import BasicButton from '../button/button'
import CustomizedDialogs from 'src/ui/dialog/dialog'
import FilterModal from 'src/ui/filterModal/filterModal'
import MastersModal from 'src/ui/editModal/mastersModal'
import FeedbackDetails from '../ModalUI/detailsModal'
import dayjs from 'dayjs'

interface Column {
  id: string;
  name: string
}

interface RowTypes {
  id: number;
  artist_name?: string;
  description?: string;
  display_order?: number;
  duration?: string;
  image_url?: string;
  is_active?: boolean;
  is_android?: boolean;
  is_ios?: boolean;
  locales?: [];
  name?: string;
  url?: string;
}
interface customTableProps {
  columns?: Column[]
  rows?: RowTypes[]
  deleteIcon?: boolean
  details?: string
  isModule?: boolean
  CommentDetails?: { label: string; id: string; }[]
  isLoading?: boolean;
  isEdit: boolean
}

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  editBg: {
    background: '#ECA11C',
    padding: '6px 18px',
    borderRadius: '25px',
    marginRight: '20px'
  },
  deleteBg: {
    background: '#7E7E7E',
    padding: '6px 18px',
    borderRadius: '25px',
    marginRight: '20px'
  },
  headerCell: {
    fontWeight: 'bold'
  }
})

const deleteApiEndPoint = (url: string) => {
  switch (url) {
    case url:
      return `/api${url}delete`
    default:
      return
  }
}

const getApiEndPoint = (url: string, id: number) => {
  switch (url) {
    case url:
      return `/api${url}?id=${id}`
    default:
      return
  }
}

const fetchJSONTemplate = async () => {
  return await client.get('/api/template')
}

const CustomTable = ({ isModule, columns, rows, deleteIcon, details, CommentDetails, isLoading, isEdit }: customTableProps) => {
  const classes = useStyles()
  const queryClient = useQueryClient()
  const formRef = useRef()
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [editId, setEditId] = useState<number>()
  const [detailsModal, setDetilsModal] = useState(false)
  const [url, setUrl] = useState('')

  const { data, refetch, isLoading: singleDataLoad } = useQuery(
    ['getSingleData', editId],
    async () => editId && (await getSingleDatas(url, editId)),
    {
      enabled: true
    }
  )

  const {
    isLoading: templateLoading,
    isSuccess,
    refetch: templateRefetch
  } = useQuery('JSONTemplate', fetchJSONTemplate, { enabled: false })

  useEffect(() => {
    if (window !== undefined) {
      setUrl(window.location.pathname)
    }
  }, [])

  const deleted = async (id: any) => {
    const endpoint = await deleteApiEndPoint(url)

    return await client.delete(`${endpoint}`, { data: { id } })
  }

  const getSingleDatas = async (url: string, id: number) => {
    const endpoint = await getApiEndPoint(url, id)

    return await client.get(`${endpoint}`)
  }

  const onEditClick = async (id: number) => {
    setEditId(id)
    refetch()
    await templateRefetch()
    if (isSuccess) {
      setOpen(true)
    }
  }

  useEffect(() => {
    if (editId) {
      refetch()
    }
  }, [editId])

  const onDetailsClick = (id: number) => {
    setEditId(id)
    setDetilsModal(true)
  }

  const deleteRow = useMutation(deleted, {
    onSuccess: () => {
      // Invalidate the query in the shared query cache
      queryClient.invalidateQueries('Deities')
      queryClient.invalidateQueries('Festivals')
      queryClient.invalidateQueries('Languages')
      queryClient.invalidateQueries('Locations')
      queryClient.invalidateQueries('TempleRaagas')
      queryClient.invalidateQueries('Countries')
      queryClient.invalidateQueries('Locales')
      queryClient.invalidateQueries('Artists')
      queryClient.invalidateQueries('Albums')
      queryClient.invalidateQueries('EditorialCategories')
      queryClient.invalidateQueries('SubCategories')
      queryClient.invalidateQueries('TempleLocatorKeywords')
      queryClient.invalidateQueries('Pandals')
      queryClient.invalidateQueries('FeedbackCategories')
      queryClient.invalidateQueries('PrasadCategory')
      queryClient.invalidateQueries('MangaldeepCategory')
      queryClient.invalidateQueries('DynamicHeader')
      queryClient.invalidateQueries('ModuleStatus')
      queryClient.invalidateQueries('ReleaseManagement')
      queryClient.invalidateQueries('LiveStreamings')

      // modules listing
      queryClient.invalidateQueries('DainikPanchang')
      queryClient.invalidateQueries('FestivalCalendar')
      queryClient.invalidateQueries('Mantras')
      queryClient.invalidateQueries('Shlokas')
      queryClient.invalidateQueries('Ashtothras')
      queryClient.invalidateQueries('Chalisas')
      queryClient.invalidateQueries('Kavachas')
      queryClient.invalidateQueries('TemplesOfIndia')
      queryClient.invalidateQueries('TempleArchitecture')
      queryClient.invalidateQueries('GeetaQuotesAudio')
      queryClient.invalidateQueries('Prasads')
      queryClient.invalidateQueries('Banners')
      queryClient.invalidateQueries('Events')
      queryClient.invalidateQueries('fetchDevotionalSongs')
      queryClient.invalidateQueries('fetchMostPlayedSongs')
      queryClient.invalidateQueries('fetchMangaldeepStore')
      queryClient.invalidateQueries('fetchPuja')
      queryClient.invalidateQueries('fetchSankalp')
      queryClient.invalidateQueries('fetchEditorials')
      queryClient.invalidateQueries('TrendingNow')
    }
  })

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value))
    setPage(0)
  }
  const sliceStart = page * rowsPerPage
  const sliceEnd = sliceStart + rowsPerPage
  const paginatedRows: any = rows?.length && rows?.slice(sliceStart, sliceEnd)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    setFilter(true)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setFilter(false)
  }

  const onClose = () => {
    setOpen(false)
    setDetilsModal(false)
  }

  const onSave = () => {
    document.getElementById('form')?.click()
    setOpen(false)
  }

  // Helper function to get nested values by path
  const getColumnValue = (row: RowTypes, path: string) => {
    const pathArr = path.split('.')
    let value: any = row
    for (let i = 0; i < pathArr.length; i++) {
      if (Array.isArray(value)) {
        value = value.map(item => item[pathArr[i]])
      } else {
        value = value?.[pathArr[i]]
      }
      if (value === undefined) {
        return ''
      }
    }
    if (Array.isArray(value)) {
      return value.join(', ')
    }

    return value
  }

  const getColumnValueViaColumnId = (row: RowTypes, columnId: string) => {
    if (columnId == 'date') return dayjs(getColumnValue(row, columnId)).format('YYYY-MM-DD HH:mm')
    if (columnId == 'editorial_date' || columnId == 'panchang_date' || columnId == 'festival_date') return dayjs(getColumnValue(row, columnId)).format('DD/MM/YYYY')
    if (columnId == 'short_description' || columnId == 'description_text' || columnId == 'mantra_content' || columnId == 'geeta_quote' || columnId == 'locales') {
      const shortDesc = getColumnValue(row, columnId)

      return `${shortDesc?.substring(0, 20)}...`
    }
    if (columnId == 'text') {
      const shortDesc = getColumnValue(row, columnId)

      return `${shortDesc.substring(0, 40)}...`
    }
    if (columnId == 'chapter_and_shloka') {

      return `${getColumnValue(row, 'chapter')} ${getColumnValue(row, 'quote_number')}`
    }

    return getColumnValue(row, columnId)
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              {columns?.map((column: any) => (
                <TableCell key={column.id} className={classes.headerCell}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {isLoading ? (
                      <Skeleton variant='rounded' width='150px' height='20px' animation='wave' />
                    ) : (
                      <Typography className={`fontClass ${classes.headerCell}`}>{column.name}</Typography>
                    )}
                    {isLoading ? (
                      <Skeleton variant='circular' width='30px' height='30px' animation='wave' />
                    ) : (
                      <>
                        <IconButton aria-label='close' key={column.name} onClick={handleClick}>
                          <FilterAltIcon
                            fontSize='small'
                            sx={{
                              cursore: 'pointer',
                              backgroundColor: 'none'
                            }}
                          />
                        </IconButton>
                      </>
                    )}
                  </Box>
                </TableCell>
              ))}
              <TableCell className={classes.headerCell}>
                {isLoading ? <Skeleton variant='rounded' width='150px' height='20px' animation='wave' /> : <Typography className={`fontClass ${classes.headerCell}`}>Actions</Typography>}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows?.length &&
              paginatedRows?.map((row: RowTypes) => (
                <TableRow key={row.id}>
                  {columns?.map((column: Column) => (
                    <TableCell key={column.id} className='fontClass'>
                      {isLoading ? (
                        <Skeleton variant='rounded' width='150px' height='20px' animation='wave' />
                      ) : (
                        getColumnValueViaColumnId(row, column.id)
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Box sx={{ display: 'flex' }}>
                      {isLoading ? (
                        <Skeleton
                          variant='rounded'
                          width='75px'
                          height='20px'
                          animation='wave'
                          style={{ marginRight: 5 }}
                        />
                      ) : details === 'details' ? (
                        <Box sx={{ marginRight: '10px' }}>
                          <BasicButton
                            variant='outlined'
                            color='primary'
                            size='small'
                            onClick={() => onDetailsClick(row.id)}
                          >
                            Details
                          </BasicButton>
                        </Box>
                      ) : (
                        isEdit &&
                        <Box sx={{ marginRight: '10px' }}>
                          <BasicButton
                            variant='outlined'
                            color='primary'
                            size='small'
                            onClick={() => onEditClick(row.id)}
                            typoClass='editButtonText'
                          >
                            {templateLoading ? (
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CircularProgress size={25} color={'warning'} /> {'Edit'}
                              </Box>
                            ) : (
                              'Edit'
                            )}
                          </BasicButton>
                        </Box>
                      )}
                      {isLoading ? (
                        <Skeleton variant='rounded' width='75px' height='20px' animation='wave' />
                      ) : deleteIcon === false ? (
                        ''
                      ) : (
                        <Box>
                          <BasicButton
                            variant='outlined'
                            color='secondary'
                            size='small'
                            onClick={() => deleteRow.mutate(row.id)}
                            typoClass='deleteButtonText'
                          >
                            Delete
                          </BasicButton>
                        </Box>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          count={rows?.length ? rows.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <FilterModal open={filter} anchorEl={anchorEl} handleClose={handleClose} />
      <Box>
        <CustomizedDialogs open={open} onClose={onClose} onSave={onSave}>
          {data && (
            <MastersModal
              isModule={isModule}
              singleData={typeof data?.data?.data === 'string' ? JSON.parse(data?.data?.data) : data?.data?.data}
              ref={formRef}
              loading={singleDataLoad}
            />
          )}
        </CustomizedDialogs>
      </Box>
      <Box>
        <CustomizedDialogs open={detailsModal} onClose={onClose} onSave={onSave}>
          {data && (
            <FeedbackDetails
              singleData={typeof data?.data?.data === 'string' ? JSON.parse(data?.data?.data) : data?.data?.data}
              CommentDetails={CommentDetails}
            />
          )}
        </CustomizedDialogs>
      </Box>
    </>
  )
}

export default CustomTable
