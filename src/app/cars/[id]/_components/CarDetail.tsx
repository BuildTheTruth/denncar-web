'use client'

import SellerCard from '@/app/cars/[id]/_components/SellerCard'
import AutoImage from '@/components/AutoImage'
import PhotoViewer from '@/components/PhotoViewer'
import { IMAGE_URL_TOKENIZER } from '@/constants/tokenizers'
import { useCar } from '@/libs/tanstack/queries/cars'
import { useLoggedInUserStore } from '@/stores/loggedInUser'
import styled from '@emotion/styled'
import DeleteIcon from '@mui/icons-material/Delete'
import SettingsIcon from '@mui/icons-material/Settings'
import { Box, Divider, Fab, Typography } from '@mui/material'
import { notFound, useRouter } from 'next/navigation'
import { useState } from 'react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface Props {
  carId: string
}

export default function CarDetail({ carId }: Props) {
  const { car, author } = useCar(carId)
  const router = useRouter()

  if (!car || !author) {
    return notFound()
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(-1)
  const { firebaseUser } = useLoggedInUserStore()
  const imageUrls = car.imageUrl.split(IMAGE_URL_TOKENIZER)
  const isCreator = firebaseUser?.uid === car.authorId

  const handleEditClick = () => {
    router.push(`/cars/${carId}/edit`)
  }

  const handleDeleteClick = () => {
    router.push(`/cars/${carId}/delete`)
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', m: 1, alignItems: 'center', flexDirection: 'column' }}>
        <CarInfoWrapper>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
          <PriceWrapper>
            <Typography variant="h6" color="red">
              {car.price}만원
            </Typography>
          </PriceWrapper>
        </CarInfoWrapper>
        <SwiperWrapper>
          <Swiper
            spaceBetween={30}
            loop={imageUrls.length > 1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {imageUrls.map((imageUrl, index) => (
              <SwiperSlide key={imageUrl}>
                <AutoImage src={imageUrl} priority onClick={() => setCurrentImageIndex(index)} />
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperWrapper>
        <SellerCard author={author} />
      </Box>
      {isCreator && (
        <FabWrapper>
          <Fab sx={{ background: '#1c1c1c', marginRight: 1 }} onClick={handleEditClick}>
            <SettingsIcon htmlColor="white" />
          </Fab>
          <Fab color="error" onClick={handleDeleteClick}>
            <DeleteIcon htmlColor="white" />
          </Fab>
        </FabWrapper>
      )}
      {currentImageIndex > -1 && (
        <PhotoViewer
          startIndex={currentImageIndex}
          srcs={imageUrls}
          onClose={() => setCurrentImageIndex(-1)}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const CarInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 16px 0;
  @media (max-width: 720px) {
    flex-direction: column;
  }
`
const PriceWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: end;
  align-items: center;
  @media (max-width: 720px) {
    margin-top: 8px;
    justify-content: start;
  }
`

const DotDivider = styled(Divider)`
  margin: 4px 8px;
  border: 1px solid black;
`

const SwiperWrapper = styled.div`
  margin: 8px 0;
  height: 600px;
  width: 720px;
  @media (max-width: 720px) {
    width: 90vw;
    height: 50vh;
  }

  @media (max-width: 320px) {
    width: 320px;
    height: 320px;
  }
`

const FabWrapper = styled(Box)`
  display: flex;
  position: fixed;
  right: 16px;
  bottom: 16px;
`
