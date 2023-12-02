// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import SideNav from './sideNav'

interface Props {
  children: ReactNode
}

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    layoutVerticalNav: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
        marginRight: '1.25rem',
        height: '100%'

        // overflow: 'auto'
      }
    },
    layoutContentWrapper: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100%-${drawerWidth}px)`,
        marginLeft: 'auto',
        marginRight: 'auto',
        flex: 1,
        padding: '0 1rem'
      }
    },
    contentHeader: {
      padding: '0rem 2rem'
    },
    childrenpd: {
      padding: '0rem 2rem'
    }
  })
)

const UserLayout = ({ children }: Props) => {
  const classes = useStyles()
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // Render nothing until the component is mounted
  }

  // ** Hooks

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/components/use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */

  return (
    <Box sx={{ display: 'flex' }}>
      <Box className={classes.layoutVerticalNav}>
        <SideNav />
      </Box>
      <Box className={classes.layoutContentWrapper}>
        <Box className={classes.contentHeader}></Box>
        <Box className={classes.childrenpd}>{children}</Box>
      </Box>
    </Box>
  )
}

export default UserLayout
