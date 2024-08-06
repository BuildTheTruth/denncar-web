'use client'

import { CAR_IMAGE_URL_SPLITTER } from '@/constants/splitters'
import { useCar } from '@/queries/useCars'
import styled from '@emotion/styled'
import SettingsIcon from '@mui/icons-material/Settings'
import { Box, Divider, Fab, Typography } from '@mui/material'
import { notFound, useRouter } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import DeleteIcon from '@mui/icons-material/Delete'

import { Autoplay, Navigation, Pagination } from 'swiper/modules'

import { useLoggedInUserStore } from '@/stores/loggedInUser'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Props {
  carId: string
}

export default function CarDetail({ carId }: Props) {
  const { car, deleteCarMutation } = useCar(carId)
  const router = useRouter()

  if (!car) {
    return notFound()
  }

  const { loggedInUser } = useLoggedInUserStore()
  const imageUrls = car.imageUrl.split(CAR_IMAGE_URL_SPLITTER)
  const isCreator = loggedInUser?.uid === car.createdBy

  const handleEditingClick = () => {
    router.push(`/cars/${carId}/editing`)
  }

  const handleDeleteClick = () => {
    deleteCarMutation.mutate()
  }

  return (
    <Container>
      <CarInfoWrapper>
        <Box sx={{ display: 'flex', m: 1 }}>
          <Box>
            <Typography fontWeight={600} variant="h5">
              {car.model}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Typography fontWeight={500}>{car.mileage} km</Typography>
              <DotDivider />
              <Typography color="gray" fontWeight={500}>
                {car.launch.slice(0, 4)}년 {car.launch.slice(4)}월{' '}
              </Typography>
              <DotDivider />
              <Typography>{car.color}</Typography>
              <DotDivider />
              <Typography>{car.no}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flex: 1, justifyContent: 'end', alignItems: 'center' }}>
            <Typography variant="h6" color="red">
              {car.price}만원
            </Typography>
          </Box>
        </Box>
        <SwiperWrapper>
          <Swiper
            spaceBetween={30}
            loop={imageUrls.length > 1}
            pagination={{
              clickable: true
            }}
            autoplay={{ delay: 3000 }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {imageUrls.map((imageUrl) => (
              <SwiperSlide key={imageUrl}>
                <img src={imageUrl} />
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperWrapper>
      </CarInfoWrapper>
      {isCreator && (
        <FabWrapper>
          <Fab sx={{ background: '#1c1c1c', marginRight: 1 }} onClick={handleEditingClick}>
            <SettingsIcon htmlColor="white" />
          </Fab>
          <Fab color="error" onClick={handleDeleteClick}>
            <DeleteIcon htmlColor="white" />
          </Fab>
        </FabWrapper>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const CarInfoWrapper = styled.div`
  margin: 16px 0;
`

const DotDivider = styled(Divider)`
  margin: 4px 8px;
  border: 1px solid black;
`

const SwiperWrapper = styled.div`
  margin: 24px 0;
  height: 600px;
  width: 720px;
`

const FabWrapper = styled(Box)`
  display: flex;
  position: absolute;
  right: 16px;
  bottom: 16px;
`
