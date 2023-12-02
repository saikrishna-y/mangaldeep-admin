import React, { ReactNode, useEffect, useState } from 'react'

import Image from 'next/image'

import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'

import BlankLayout from 'src/@core/layouts/BlankLayout'
import { auto } from '@popperjs/core'

import { Typography } from '@mui/material'

const drawerWidth = 350

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: auto,
        marginRight: auto,
        padding: '2rem',
        flexgrow: 1
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none'
      }
    },
    toolbar: theme.mixins.toolbar,

    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    listItem: {
      cursor: 'pointer',
      padding: 0,
      fontSize: '1rem',
      '&:hover': {
        color: '#7B68EE',
        backgroundColor: 'rgb(241, 237, 248)',
        borderRadius: '0px 100px 100px 0px'
      }
    },
    listItemSelected: {
      borderRadius: '0px 100px 100px 0px',
      backgroundColor: 'rgba(58, 53, 65, 0.04)'
    },
    listItemLabel: {
      paddingLeft: theme.spacing(1),
      fontWeight: 400,
      fontFamily: "'Montserrat', sans-serif;",
      padding: 0,
      margin: 0
    },
    nested: {
      paddingLeft: theme.spacing(3),
      marginTop: '0.375rem'
    },
    nestedFirst: {
      paddingLeft: theme.spacing(3),
      marginTop: '0.375rem'
    },
    nestedSecond: {
      paddingLeft: theme.spacing(3),
      marginTop: '0.375rem'
    },
    animated: {
      transition: 'height 0.1s ease-in-out'
    },
    card: {
      padding: '1rem'
    },
    addButton: {
      background: '#DC3C48',
      padding: '6px 18px',
      borderRadius: '30px',
      color: 'white'
    },
    selected: {
      borderRadius: '12px',
      color: '#764ABC',
      backgroundColor: 'rgb(241, 237, 248)',
      paddingTop: '6px',
      paddingBottom: '6px',
      marginTop: '0.375rem',
      paddingLeft: theme.spacing(4),
      transition: 'background-color 0.1s ease-in-out 0s;',
      fontWeight: 400,
      fontFamily: "'Montserrat', sans-serif;",
      fontSize: '0.85rem'
    },
    unselected: {
      borderRadius: '12px',
      color: '#222224',
      paddingTop: '6px',
      marginTop: '0.375rem',
      paddingLeft: theme.spacing(4),
      fontSize: '0.85rem',
      transition: 'background-color 0.1s ease-in-out 0s;',
      fontWeight: 400,
      fontFamily: "'Montserrat', sans-serif;"
    },
    drawerPaper: {
      borderRight: '0px solid',
      backgroundColor: '#F4F5FA'
    },
    navHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '64px'
    },
    homelistlabel: {
      paddingTop: 'inherit',
      paddingBottom: 'inherit',
      marginTop: 'inherit'
    },
    menuCat: {
      width: '100%',
      lineHeight: 'normal',
      textTransform: 'uppercase',
      marginTop: '1rem',
      marginBottom: '0.5rem',
      color: '#222224',
      fontWeight: 'bold',
      marginLeft: '1rem',
      fontSize: '0.75rem'
    },
    dropdown: {
      width: '100%',
      lineHeight: 'normal',
      textTransform: 'uppercase',
      color: '#222224',
      fontFamily: "'Montserrat', sans-serif;",
      marginLeft: '1rem',
      fontSize: '0.75rem'
    },

    imagDiv: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    iconv1: {
      width: '30%'
    },
    iconv2: {
      width: '70%'
    },
    homeBtn: {
      textAlign: 'center',
      color: '#222224',
      fontFamily: "'Montserrat', sans-serif;",
      paddingTop: '0.2rem',
      paddingBottom: '0.2rem',
      borderRadius: '12px',
      '&:hover': {
        color: '#7B68EE',
        backgroundColor: 'rgb(241, 237, 248)',
        borderRadius: '0px 100px 100px 0px',
        cursor: 'pointer',
        transition: 'ease-in-out 0.3s;'
      }
    },
    selectedHomeBtn: {
      textAlign: 'center',
      fontFamily: "'Montserrat', sans-serif;",
      paddingTop: '0.2rem',
      paddingBottom: '0.2rem',
      borderRadius: '12px',
      color: '#7B68EE',
      backgroundColor: 'rgb(241, 237, 248)',
      cursor: 'pointer'
    },
    dropdownBtn: {
      textAlign: 'center',
      color: '#222224',
      fontFamily: "'Montserrat', sans-serif;",
      paddingTop: '0.2rem',
      paddingBottom: '0.2rem',
      borderRadius: '12px',
      '&:hover': {
        color: '#7B68EE',
        backgroundColor: 'rgb(241, 237, 248)',
        borderRadius: '0px 100px 100px 0px',
        cursor: 'pointer',
        transition: 'ease-in-out 0.3s;'
      }
    },
    dropdownv1: {
      display: 'flex',
      justifyContent: 'space-between',
      '&:hover': {
        color: '#7B68EE',
        backgroundColor: 'rgb(241, 237, 248)',
        borderRadius: '0px 100px 100px 0px',
        cursor: 'pointer',
        transition: 'ease-in-out 0.3s;'
      },
      alignItems: 'center'
    },
    selectedDropdownv1: {
      display: 'flex',
      justifyContent: 'space-between',
      color: '#7B68EE',
      backgroundColor: 'rgb(241, 237, 248)',
      borderRadius: '0px 100px 100px 0px',
      cursor: 'pointer',
      transition: 'ease-in-out 0.3s;',
      alignItems: 'center'
    },
    dropdownText: {
      textAlign: 'center',
      color: '#222224',
      fontFamily: "'Montserrat', sans-serif;",
      paddingTop: '0.2rem',
      paddingBottom: '0.2rem',
      borderRadius: '12px',
      paddingLeft: '25px'
    },
    selectedDropdownText: {
      textAlign: 'center',
      color: '#7B68EE',
      fontFamily: "'Montserrat', sans-serif;",
      paddingTop: '0.2rem',
      paddingBottom: '0.2rem',
      borderRadius: '12px',
      paddingLeft: '25px'
    },
    listItemv1: {
      color: '#222224',
      fontFamily: "'Montserrat', sans-serif;",
      paddingTop: '0.2rem',
      paddingBottom: '0.2rem',
      borderRadius: '12px',
      paddingLeft: '40px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: 500,
      '&:hover': {
        color: '#7B68EE',
        backgroundColor: 'rgb(241, 237, 248)',
        borderRadius: '0px 100px 100px 0px',
        cursor: 'pointer',
        transition: 'ease-in-out 0.3s;'
      }
    },
    selectedListItemv1: {
      fontFamily: "'Montserrat', sans-serif;",
      paddingTop: '0.2rem',
      paddingBottom: '0.2rem',
      paddingLeft: '40px',
      fontSize: '0.9rem',
      fontWeight: 500,
      color: '#7B68EE',
      backgroundColor: 'rgb(241, 237, 248)',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'ease-in-out 0.3s;'
    },
    listItemv2: {
      color: '#222224',
      fontFamily: "'Montserrat', sans-serif;",
      paddingTop: '0.2rem',
      paddingBottom: '0.2rem',
      borderRadius: '12px',
      paddingLeft: '60px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: 'normal',
      '&:hover': {
        color: '#7B68EE',
        backgroundColor: 'rgb(241, 237, 248)',
        borderRadius: '0px 100px 100px 0px',
        cursor: 'pointer',
        transition: 'ease-in-out 0.3s;'
      }
    },
    selectedListItemv2: {
      fontFamily: "'Montserrat', sans-serif;",
      paddingTop: '0.2rem',
      paddingBottom: '0.2rem',
      paddingLeft: '60px',
      fontSize: '0.9rem',
      fontWeight: 'normal',
      color: '#7B68EE',
      backgroundColor: 'rgb(241, 237, 248)',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'ease-in-out 0.3s;'
    }
  })
)

const userManagementList = [
  {
    name: 'Add User',
    id: 'addUser'
  },
  {
    name: 'Change Password',
    id: 'changePassword'
  },
  {
    name: 'Reset Password',
    id: 'resetPassword'
  },
  {
    name: 'All Users',
    id: 'allUsers'
  },
  {
    name: 'Device Details',
    id: 'deviceDetails'
  },
  {
    name: 'Add User Group',
    id: 'addUserGroup'
  }
]

const mastersList = [
  {
    id: 'Deities',
    name: 'Deities',
    key: 'deities'
  },
  {
    id: 'Festivals',
    name: 'Festivals',
    key: 'festivals'
  },
  {
    id: 'Locations',
    name: 'Locations',
    key: 'locations'
  },
  {
    id: 'Languages',
    name: 'Languages',
    key: 'languages'
  },
  {
    id: 'Countries',
    name: 'Countries',
    key: 'countries'
  },
  {
    id: 'Locales',
    name: 'Locales',
    key: 'locales'
  },
  {
    id: 'Devotional Songs',
    name: 'Devotional Songs',
    key: 'devotionalSongs',
    subName: [
      {
        name: 'Artists',
        key: 'artists'
      },
      {
        name: 'Albums',
        key: 'albums'
      }
    ]
  },
  {
    id: 'Editorial',
    name: 'Editorial',
    key: 'editorials',
    subName: [
      {
        name: 'Editorial Categories',
        key: 'category'
      },
      {
        name: 'Sub Categories',
        key: 'subCategory'
      }
    ]
  },
  {
    id: 'Feedback Category',
    name: 'Feedback Category',
    key: 'feedbackCategory'
  },
  {
    id: 'Prasad Category',
    name: 'Prasad Category',
    key: 'prasadCategory'
  },
  {
    id: 'Mangaldeep Icon',
    name: 'Mangaldeep Icon',
    key: 'icon'
  },
]

const modulesList = [
  {
    id: 'Devotional Song',
    name: 'Devotional Song',
    key: 'devotionalSong',
    subName: [
      {
        name: 'Devotional Songs',
        key: 'devotionalSongs'
      },
      {
        name: 'Most Played Song',
        key: 'mostPlayedSong'
      }
    ]
  },
  {
    id: 'Buy Mangaldeep Store',
    name: 'Buy Mangaldeep Store',
    key: 'buyMangaldeepStore'
  },
  {
    id: 'Puja',
    name: 'Puja',
    key: 'puja',
    subName: [
      {
        name: 'Pujas',
        key: 'pujas'
      },
      {
        name: 'Sankalps',
        key: 'sankalps'
      }
    ]
  },
  {
    id: 'Panchang',
    name: 'Panchang',
    key: 'panchang',
    subName: [
      {
        name: 'Dainik Panchang',
        key: 'dainikPanchang'
      },
      {
        name: 'Festival Calendar',
        key: 'festivalCalendar'
      },
      {
        name: 'Panchang File Upload',
        key: 'panchangFileUpload'
      }
    ]
  },
  {
    id: 'Mantras',
    name: 'Mantras',
    key: 'mantras',
    subName: [
      {
        name: 'Mantras',
        key: 'mantras'
      },
      {
        name: 'Shlokas',
        key: 'shlokas'
      },
      {
        name: 'Ashtothras',
        key: 'ashtothras'
      },
      {
        name: 'Chalisas',
        key: 'chalisas'
      },
      {
        name: 'Kavachas',
        key: 'kavachas'
      }
    ]
  },
  {
    id: 'Geeta Quotes',
    name: 'Geeta Quotes',
    key: 'geetaQuotes',
    subName: [
      {
        name: 'Geeta Quotes',
        key: 'geetaQuotes'
      },
      {
        name: 'Geeta Quote Audio',
        key: 'geetaQuoteAudio'
      }
    ]
  },

  // {
  //   id: 'Mangaldeep Quiz',
  //   name: 'Mangaldeep Quiz',
  //   key: 'mangaldeepQuiz'
  // },
  {
    id: 'Carousels',
    name: 'Carousels',
    key: 'carousels',
    subName: [
      {
        name: 'Temple Raaga',
        key: 'templeRaaga'
      },
      {
        name: 'Live Streaming',
        key: 'liveStreaming'
      },
      {
        name: 'Mangaldeep Geet',
        key: 'mangaldeepGeet'
      },
      {
        name: 'Dynamic Banner',
        key: 'dynamicBanner'
      },
      {
        name: 'Events',
        key: 'events'
      },
      {
        name: 'Carousel Grouping',
        key: 'carouselGrouping',
        subName: [
          {
            name: 'Carousel Grouping',
            key: 'carouselGrouping'
          },
          {
            name: 'Carousel Grouping Modules',
            key: 'carouselGroupingModules'
          }
        ]
      }
    ]
  },
  {
    id: 'Editorials',
    name: 'Editorialss',
    key: 'editorials',
    subName: [
      {
        name: 'Editorials',
        key: 'editorials'
      }
    ]
  },
  {
    id: 'Temple Connect',
    name: 'Temple Connect',
    key: 'templeConnect',
    subName: [
      {
        name: 'Temples of India',
        key: 'templesOfIndia'
      },
      {
        name: 'Temple Architecture',
        key: 'templeArchitecture'
      }
    ]
  },

  // {
  //   id: 'Approvals',
  //   name: 'Approvals',
  //   key: 'approvals',
  //   subName: [
  //     {
  //       name: 'Editorial Comments',
  //       key: 'editorialComments'
  //     }
  //   ]
  // },
  {
    id: 'Prasads',
    name: 'Prasads',
    key: 'prasads'
  },
  {
    id: 'Notify Users',
    name: 'Notify Users',
    key: 'notifyUsers',
    subName: [
      {
        name: 'Push Notification',
        key: 'pushNotification'
      },
      {
        name: 'Notification Messages',
        key: 'notificationMessages'
      }
    ]
  },
  {
    id: 'Feedbacks',
    name: 'Feedbacks',
    key: 'feedbacks'
  },
  {
    id: 'Banners',
    name: 'Banners',
    key: 'banners'
  },
  {
    id: 'Trending Now',
    name: 'Trending Now',
    key: 'trendingNow'
  },
  {
    id: 'About',
    name: 'About',
    key: 'about'
  },
  {
    id: 'Quotes',
    name: 'Quotes',
    key: 'quotes'
  }
]

const SideNav = () => {
  const classes = useStyles()
  const router = useRouter()
  const mangaldeepLogo = '/images/logos/mangaldeep-logo.png'
  const mangaldeepNamaste = '/images/logos/mangaldeep-namasthe.png'
  const [selectedItem, setSelectedItem] = useState('')
  const [isMasterOpen, setIsMasterOpen] = useState(false)

  const [isModuleOpen, setIsModuleOpen] = useState(false)
  const [listItem, setListItem] = useState('')
  const [clicked, setClicked] = useState(false)
  const [isUserMangamentOpen, setIsUserManagementOpen] = useState(false)
  const [nestedListItem, setNestedListItem] = useState()

  useEffect(() => {
    if (!selectedItem) {
      handleSelectedListItem('Home')
      router.push('/home')
    }
  }, [selectedItem])

  const handleClick = () => {
    setIsMasterOpen(!isMasterOpen)
    setListItem('')
  }
  const toggleCollapse = (data: any) => {
    if (listItem === data) {
      setListItem('')
    } else {
      setListItem(data)
    }
  }

  const handleNestedClick = (data: any, subdata: any) => {
    setClicked(!clicked)
    router.push(`/masters/${data}/${subdata}`)
  }

  const handleModulesNestedClick = (data: any) => {
    setNestedListItem(data)
  }

  const handleUserManagementClick = () => {
    setIsUserManagementOpen(!isUserMangamentOpen)
  }

  const handleSelectedListItem = (name: string) => {
    setSelectedItem(name)
  }

  const handleClicked = () => {
    setIsModuleOpen(!isModuleOpen)
  }

  return (
    <>
      <Box className={'fontClass'}>
        <div className={classes.imagDiv}>
          <div className={classes.iconv1}>
            <Image src={mangaldeepNamaste} alt='mangaldeep logo' width={50} height={49} />
          </div>
          <div className={classes.iconv2}>
            <Image src={mangaldeepLogo} alt='mangaldeep logo' width={129} height={24} />
          </div>
        </div>

        <div
          onClick={() => {
            handleSelectedListItem('Home')
            router.push('/home')
          }}
        >
          <Typography
            variant='body1'
            className={selectedItem == 'Home' ? `${classes.selectedHomeBtn} fontClass` : `${classes.homeBtn} fontClass`}
          >
            Home
          </Typography>
        </div>

        {/* LOGIN */}
        <div
          onClick={() => {
            handleSelectedListItem('Login')
            router.push('/login')
          }}
        >
          <Typography
            variant='body1'
            className={
              selectedItem == 'Login' ? `${classes.selectedHomeBtn} fontClass` : `${classes.homeBtn} fontClass`
            }
          >
            Login
          </Typography>
        </div>

        <div>
          <Typography variant='body1' className={`${classes.menuCat} menuCat`}>
            USER MANAGEMENT
          </Typography>
          <div
            onClick={() => {
              handleUserManagementClick()
              handleSelectedListItem('usermanagement')
            }}
            className={
              isUserMangamentOpen
                ? `${classes.selectedDropdownv1} selectedDropdownv1`
                : `${classes.dropdownv1} dropdownv1`
            }
          >
            <Typography
              variant='body1'
              className={
                isUserMangamentOpen
                  ? `${classes.selectedDropdownText} selectedDropdownText`
                  : `${classes.dropdownText} dropdownText`
              }
            >
              User Management
            </Typography>
            {isUserMangamentOpen ? (
              <ExpandLess style={{ color: isUserMangamentOpen ? '#7B68EE' : '#222224', marginRight: '10px' }} />
            ) : (
              <ExpandMore style={{ color: isUserMangamentOpen ? '#222224' : '#7B68EE', marginRight: '10px' }} />
            )}
          </div>

          <Collapse in={isUserMangamentOpen} timeout='auto' unmountOnExit className={classes.animated}>
            {userManagementList?.map((users, index) => (
              <div
                key={index}
                onClick={() => {
                  handleSelectedListItem(users.name)
                  router.push(`/userManagement/${users.id}`)
                }}
              >
                <Typography
                  variant='body1'
                  className={
                    selectedItem == users.name
                      ? `${classes.selectedListItemv1} selectedListItemv1`
                      : `${classes.listItemv1} listItemv1`
                  }
                >
                  {users.name}
                </Typography>
              </div>
            ))}
          </Collapse>
        </div>

        {/* MASTERS */}
        <div>
          <Typography variant='body1' className={`${classes.menuCat} menuCat`}>
            MASTERS
          </Typography>
          <div
            onClick={() => {
              handleClick()
              handleSelectedListItem('masters')
            }}
            className={
              isMasterOpen ? `${classes.selectedDropdownv1} selectedDropdownv1` : `${classes.dropdownv1} dropdownv1`
            }
          >
            <Typography
              variant='body1'
              className={
                isMasterOpen
                  ? `${classes.selectedDropdownText} selectedDropdownText`
                  : `${classes.dropdownText} dropdownText`
              }
            >
              Masters
            </Typography>
            {isMasterOpen ? (
              <ExpandLess style={{ color: isMasterOpen ? '#7B68EE' : '#222224', marginRight: '10px' }} />
            ) : (
              <ExpandMore style={{ color: isMasterOpen ? '#222224' : '#7B68EE', marginRight: '10px' }} />
            )}
          </div>

          <Collapse in={isMasterOpen} timeout='auto' unmountOnExit className={classes.animated}>
            {mastersList?.map((master, index) => (
              <>
                <div
                  key={index}
                  onClick={() => {
                    if (master.subName) {
                      toggleCollapse(master.name)
                    } else {
                      router.push(`/masters/${master.key}`)
                    }
                  }}
                  className={
                    listItem === master.name
                      ? `${classes.selectedDropdownv1} selectedDropdownv1`
                      : `${classes.dropdownv1} dropdownv1`
                  }
                >
                  <Typography
                    variant='body1'
                    className={
                      listItem === master.name
                        ? `${classes.selectedListItemv1} selectedListItemv1`
                        : `${classes.listItemv1} listItemv1`
                    }
                  >
                    {master.name}
                  </Typography>
                  {master.subName && (listItem === master.name ? <ExpandLess /> : <ExpandMore />)}
                </div>
                <Collapse in={master.subName && listItem === master.name} timeout='auto' unmountOnExit>
                  {master?.subName?.map((name, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        handleSelectedListItem(name.name)
                        handleNestedClick(master.key, name.key)
                      }}
                    >
                      <Typography
                        variant='body1'
                        className={
                          selectedItem === name.name
                            ? `${classes.selectedListItemv2} selectedListItemv2`
                            : `${classes.listItemv2} listItemv2`
                        }
                      >
                        {name.name}
                      </Typography>
                    </div>
                  ))}
                </Collapse>
              </>
            ))}
          </Collapse>
        </div>

        {/* MODULES */}
        <div>
          <Typography variant='body1' className={`${classes.menuCat} menuCat`}>
            MODULES
          </Typography>
          <div
            onClick={() => {
              handleClicked()
              handleSelectedListItem('modules')
            }}
            className={
              isModuleOpen ? `${classes.selectedDropdownv1} selectedDropdownv1` : `${classes.dropdownv1} dropdownv1`
            }
          >
            <Typography
              variant='body1'
              className={
                isModuleOpen
                  ? `${classes.selectedDropdownText} selectedDropdownText`
                  : `${classes.dropdownText} dropdownText`
              }
            >
              Modules
            </Typography>
            {isModuleOpen ? (
              <ExpandLess style={{ color: isModuleOpen ? '#7B68EE' : '#222224', marginRight: '10px' }} />
            ) : (
              <ExpandMore style={{ color: isModuleOpen ? '#222224' : '#7B68EE', marginRight: '10px' }} />
            )}
          </div>

          <Collapse in={isModuleOpen} timeout='auto' unmountOnExit className={classes.animated}>
            {modulesList?.map((module, index) => (
              <>
                <div
                  key={index}
                  onClick={() => {
                    if (module.subName) {
                      toggleCollapse(module.name)
                    } else {
                      router.push(`/modules/${module.key}`)
                    }
                  }}
                  className={
                    module.subName && listItem === module.name
                      ? `${classes.selectedDropdownv1} selectedDropdownv1`
                      : `${classes.dropdownv1} dropdownv1`
                  }
                >
                  <Typography
                    variant='body1'
                    className={
                      module.subName && listItem === module.name
                        ? `${classes.selectedListItemv1} selectedListItemv1`
                        : `${classes.listItemv1} listItemv1`
                    }
                  >
                    {module.name}
                  </Typography>
                  {module.subName && (listItem === module.name ? <ExpandLess /> : <ExpandMore />)}
                </div>
                <Collapse in={module.subName && listItem === module.name} timeout='auto' unmountOnExit>
                  {module?.subName?.map(name => (
                    <>
                      <div
                        onClick={() => {
                          handleModulesNestedClick(name.name)
                          name.subName ? '' : router.push(`/modules/${module.key}/${name.key}`)
                        }}
                        className={
                          nestedListItem === name.name
                            ? `${classes.selectedDropdownv1} selectedDropdownv1`
                            : `${classes.dropdownv1} dropdownv1`
                        }
                      >
                        <Typography
                          variant='body1'
                          className={
                            nestedListItem === name.name
                              ? `${classes.selectedListItemv2} selectedListItemv2`
                              : `${classes.listItemv2} listItemv2`
                          }
                        >
                          {name.name}
                        </Typography>
                        {name.subName && (nestedListItem === name.name ? <ExpandLess /> : <ExpandMore />)}
                      </div>
                      <Collapse in={name.subName && nestedListItem === name.name} timeout='auto' unmountOnExit>
                        {name?.subName?.map(item => (
                          <>
                            <div
                              onClick={() => {
                                handleSelectedListItem(item.name)
                                router.push(`/modules/${module.key}/${name.key}/${item.key}`)
                              }}
                              className={
                                selectedItem === item.name
                                  ? `${classes.selectedDropdownv1} selectedDropdownv1`
                                  : `${classes.dropdownv1} dropdownv1`
                              }
                            >
                              <Typography
                                variant='body1'
                                className={
                                  selectedItem === item.name
                                    ? `${classes.selectedListItemv1} selectedListItemv1`
                                    : `${classes.listItemv2} listItemv2`
                                }
                              >
                                {item.name}
                              </Typography>
                            </div>
                          </>
                        ))}
                      </Collapse>
                    </>
                  ))}
                </Collapse>
              </>
            ))}
          </Collapse>
        </div>
      </Box>
    </>
  )
}

SideNav.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default SideNav
