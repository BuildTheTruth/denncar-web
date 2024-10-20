'use client'

import CarPost from '@/app/cars/_components/CarPost'
import useToast from '@/hooks/useToast'
import { useCars } from '@/libs/tanstack/queries/cars'
import { useLoggedInUserStore } from '@/stores/loggedInUser'
import styled from '@emotion/styled'
import AddIcon from '@mui/icons-material/Add'
import { Box, Fab } from '@mui/material'
import { useRouter } from 'next/navigation'
import Grid from '@mui/material/Grid2'

export default function CarPostList() {
  const router = useRouter()
  const toast = useToast()
  const { cars } = useCars()
  const { firebaseUser } = useLoggedInUserStore()

  const handleCarPostCreate = () => {
    if (!firebaseUser) {
      toast.error('로그인을 해주세요.')
      return
    }
    router.push(`/cars/new`)
  }

  return (
    <Container>
      <Grid
        container
        padding={2}
        spacing={2}
        sx={{ width: '100%' }}
        columns={{ xs: 2, sm: 4, md: 8, lg: 10, xl: 12, xxl: 16 }}
      >
        {cars.map((car) => (
          <Grid key={car.id} size={2}>
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
  position: fixed;
  right: 16px;
  bottom: 16px;
`
