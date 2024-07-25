'use client'

import CarPost from '@/app/cars/components/CarPost'
import { useCars } from '@/queries/useCars'
import styled from '@emotion/styled'
import { Grid } from '@mui/material'

export default function CarPostList() {
  const { cars } = useCars()

  return (
    <Container>
      <Grid container spacing={2} padding={2}>
        {cars.map((car) => (
          <Grid item xs key={car.id}>
            <CarPost car={car} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`
