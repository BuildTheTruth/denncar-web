'use client'

import CarPost from '@/app/cars/components/CarPost'
import { useCars } from '@/queries/useCars'
import styled from '@emotion/styled'
import AddIcon from '@mui/icons-material/Add'
import { Box, Fab, Grid } from '@mui/material'

export default function CarPostList() {
  const { cars } = useCars()

  return (
    <Container>
      <Grid container spacing={2} padding={2} margin={0}>
        {cars.map((car) => (
          <Grid item xs key={car.id}>
            <CarPost car={car} />
          </Grid>
        ))}
      </Grid>
      <FabWrapper>
        <Fab sx={{ background: '#1c1c1c' }}>
          <AddIcon htmlColor="white" />
        </Fab>
      </FabWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const FabWrapper = styled(Box)`
  display: flex;
  position: absolute;
  right: 16px;
  bottom: 16px;
`
