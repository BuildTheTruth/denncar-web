'use client'

import CarPost from '@/app/cars/_components/CarPost'
import useToast from '@/hooks/useToast'
import { useCars } from '@/queries/useCars'
import { useLoggedInUserStore } from '@/stores/loggedInUser'
import styled from '@emotion/styled'
import AddIcon from '@mui/icons-material/Add'
import { Box, Fab, Grid } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function CarPostList() {
  const router = useRouter()
  const toast = useToast()
  const { cars } = useCars()
  const { loggedInUser } = useLoggedInUserStore()

  const handleCarPostCreate = () => {
    if (!loggedInUser) {
      toast.error('로그인을 해주세요.')
      return
    }
    router.push(`/cars/new`)
  }

  return (
    <Container>
      <Grid
        sx={{ height: '100%', overflowY: 'auto' }}
        container
        padding={2}
        spacing={2}
        columns={{ xs: 1, sm: 4, md: 8 }}
      >
        {cars.map((car) => (
          <Grid xs={1} sm={2} md={2} item key={car.id}>
            <CarPost car={car} />
          </Grid>
        ))}
      </Grid>
      <FabWrapper>
        <Fab onClick={handleCarPostCreate} sx={{ background: '#1c1c1c' }}>
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
