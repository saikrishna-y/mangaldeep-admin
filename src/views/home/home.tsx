import React from 'react'
import { Card, CardHeader, CardContent } from '@mui/material'
import { Grid } from '@mui/material'

import BasicTypography from 'src/ui/typography/typography'

import { useQuery } from 'react-query'

import { client } from 'src/utlis/axios'

const fetchSession = async () => {
  return await client.get('/api/init')
}

const HomeUi = () => {
  const { data } = useQuery('Session', fetchSession)
  console.log('data in home page', data)

  return (
    <Card sx={{ paddingTop: 5, paddingBottom: 10, marginTop: '1.8rem' }}>
      <CardHeader
        title='Home'
        titleTypographyProps={{
          component: 'h2',
          style: {
            // color: 'black',
            fontSize: '3rem',
            fontWeight: '600'
          }
        }}
      />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item>
            <BasicTypography variant='p'>
              As part of ITC's business strategy of creating multiple drivers of growth in the FMCG sector, the Company
              commenced marketing Agarbattis (Incense Sticks) sourced from small-scale and cottage units in 2003. This
              Business leverages the core strengths of ITC in nation-wide distribution and marketing, brand building,
              supply chain management, manufacture of high quality paperboards and the creation of innovative packaging
              solutions to offer Indian consumers high quality Agarbattis. With its participation in the business, ITC
              aims to enhance the competitiveness of the small-scale and cottage units through its complementary R&D
              based product development and strengths in trade marketing and distribution.
            </BasicTypography>
          </Grid>
          <Grid item>
            <BasicTypography variant='p'>
              The Business continues to work on various exciting new offerings to the consumers and is planning to
              launch them in the near future.
            </BasicTypography>
          </Grid>
          <Grid item>
            <BasicTypography variant='p'>
              In line with ITC's Triple Bottom Line philosophy of every business contributing to the nation's economic,
              environmental and social capital, Mangaldeep agarbattis are manufactured by small scale and cottage units,
              providing livelihood opportunities for more than 14,000 people. Mangaldeep Agarbatti is manufactured at
              various centres & 5 of the manufacturing units are ISO 9000 certified. Mangaldeep ASHA (Assistance in
              Social Habilitation through Agarbattis) is an ITC initiative to improve the quality of raw agarbatti
              production and provide better livelihood for women rollers. ITC has also extended support to NGOs in
              states and like Bihar, Tripura, Tamil Nadu, who are setting up agarbatti units, training village women in
              rolling agarbattis and employing them in these units. ITC has signed a MoU with ORMAS (Orissa Rural
              Development & Marketing Society), an autonomous body under the Pachayat Raj in Odisha. This initiative
              provides technical training to rural women & provides employment opportunities to over 4000 rural women.
            </BasicTypography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default HomeUi
