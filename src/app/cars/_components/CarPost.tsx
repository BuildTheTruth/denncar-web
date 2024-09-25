'use client'

import AutoImage from '@/components/AutoImage'
import { IMAGE_URL_TOKENIZER } from '@/constants/tokenizers'
import { Car } from '@/interfaces/car'
import { Box, Divider } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'

const getPresentLaunch = (launch: string) =>
  launch.length > 4 ? `${launch.slice(0, 4)}/${launch.slice(4)}` : launch

interface Props {
  car: Car
}

export default function CarPost({ car }: Props) {
  const router = useRouter()
  const imageUrls = car.imageUrl.split(IMAGE_URL_TOKENIZER)

  const handleCardClick = () => {
    router.push(`/cars/${car.id}`)
  }

  return (
    <Card onClick={handleCardClick}>
      <CardHeader
        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        title={car.model}
        subheader={
          <Box display="flex">
            <Typography fontWeight={600}>{getPresentLaunch(car.launch)}</Typography>
            <Divider orientation="vertical" sx={{ margin: '0 4px', opacity: 0 }} />
            <Typography>{car.mileage.toLocaleString()}km</Typography>
          </Box>
        }
      />
      <AutoImage src={imageUrls[0]} height="320px" />
      <CardContent sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Typography fontSize={24} fontWeight={600}>
          {car.price.toLocaleString()} 만원
        </Typography>
      </CardContent>
    </Card>
  )
}
