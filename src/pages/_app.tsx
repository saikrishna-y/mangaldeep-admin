// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// import type { NextPage } from 'next'
// import type { AppProps } from 'next/app'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// import type { EmotionCache } from '@emotion/cache'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'
import '../../styles/fonts.css'
import '../../styles/sideNav.css'

// React Query
import React from 'react'

// import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { Toaster } from '../utlis/toaster'

// ** Extend App Props with Emotion
// type ExtendedAppProps = AppProps & {
//   Component: NextPage
//   emotionCache: EmotionCache
// }
const CacheProviderFixed = CacheProvider as any
const SettingsConsumerFixed = SettingsConsumer as any
const ReactQueryDevtoolsFixed = ReactQueryDevtools as any
const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const MyApp = (props: any) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const queryClient = new QueryClient()

  // Variables
  const getLayout = Component.getLayout ?? ((page: any) => <UserLayout>{page}</UserLayout>)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CacheProviderFixed value={emotionCache}>
        <Head>
          <title>{`${themeConfig.templateName} - Mangaldeep Puja Admin Portal`}</title>
          <meta
            name='description'
            content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
          />
          <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>

        {/* Provide the client to your App */}
        <QueryClientProvider client={queryClient}>
          <SettingsProvider>
            <SettingsConsumerFixed>
              {({ settings }: any) => {
                return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
              }}
            </SettingsConsumerFixed>
          </SettingsProvider>
          <ReactQueryDevtoolsFixed initialIsOpen={false} position={'bottom-right'} />
          <Toaster />
        </QueryClientProvider>
      </CacheProviderFixed>
      {/* <Component {...pageProps} /> */}
    </LocalizationProvider>
  )
}

export default MyApp
