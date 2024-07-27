'use client'

import FileUploadButton from '@/components/FileUploadButton'
import { CarPropName } from '@/constants/car'
import { CAR_IMAGE_URL_SPLITTER } from '@/constants/splitters'
import { CarParams } from '@/interfaces/car'
import { uploadFileToStorage } from '@/libs/firebase/storage'
import { useCars } from '@/queries/useCars'
import { getKeys } from '@/utils/keys'
import styled from '@emotion/styled'
import { Box, Button, Card, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { HTMLInputTypeAttribute, useState } from 'react'
import { useForm } from 'react-hook-form'

interface CarTextFieldProp {
  label: string
  endAdornment?: string
  type?: HTMLInputTypeAttribute
}

const TEXT_FILED_PROPS_BY_CAR_PROP: {
  [key in CarPropName]: CarTextFieldProp
} = {
  carNo: { label: '차번호' },
  model: { label: '모델명' },
  manufacturer: { label: '제조사' },
  launch: { label: '연식' },
  price: { label: '가격', endAdornment: '만원' },
  mileage: { label: '주행거리', endAdornment: 'km' },
  color: { label: '색상' },
  region: { label: '지역' }
}

export default function NewCarPage() {
  const router = useRouter()
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const { register, handleSubmit } = useForm<CarParams>()
  const { createCarMutation } = useCars()

  const handleCancel = () => {
    router.back()
  }

  const handleCarImagesSelect = async (files: File[]) => {
    setImageFiles(files)
  }

  const onSubmit = async (values: CarParams) => {
    const { carNo } = values
    const urls = await Promise.all(
      imageFiles.map((file) => uploadFileToStorage({ carNo, path: 'images/cars', file }))
    )
    const imageUrl = urls.join(CAR_IMAGE_URL_SPLITTER)
    createCarMutation.mutate({ ...values, imageUrl })
  }

  return (
    <Container component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6">차량 정보</Typography>
        <Grid container spacing={1} columns={3}>
          {getKeys(TEXT_FILED_PROPS_BY_CAR_PROP).map((key) => (
            <Grid key={key} item xs={1}>
              <TextField
                {...register(key)}
                fullWidth
                margin="dense"
                label={TEXT_FILED_PROPS_BY_CAR_PROP[key].label}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {TEXT_FILED_PROPS_BY_CAR_PROP[key].endAdornment}
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          ))}
        </Grid>
        <Typography variant="h6" margin="8px 0">
          차량 사진
        </Typography>
        <ImagesBox>
          {imageFiles.map((imageFile, index) => (
            <ImageCard key={`car-image-${index}`}>
              <img src={URL.createObjectURL(imageFile)} />
            </ImageCard>
          ))}
          <ImageCard sx={{ width: '160px', height: '160px' }}>
            <FileUploadButton onSelect={handleCarImagesSelect} />
          </ImageCard>
        </ImagesBox>
      </Box>
      <ActionsBox>
        <Button onClick={handleCancel}>취소</Button>
        <Button variant="contained" color="primary" type="submit">
          등록
        </Button>
      </ActionsBox>
    </Container>
  )
}

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 16px;
  width: 100%;
  height: 100%;
`

const ImagesBox = styled(Box)`
  display: flex;
  margin: 8px 0;
`

const ImageCard = styled(Card)`
  display: flex;
  margin-right: 8px;
  img {
    width: 160px;
    height: 160px;
    object-fit: fill;
  }
`

const TextFieldsBox = styled(Box)`
  display: flex;
  flex-direction: column;
`

const ActionsBox = styled(Box)`
  display: flex;
  justify-content: end;
  margin: 8px 0;
`
