import AutoImage from '@/components/AutoImage'
import FileUploadButton from '@/components/FileUploadButton'
import { CarPropName } from '@/constants/car'
import { IMAGE_URL_TOKENIZER } from '@/constants/tokenizers'
import { CarParams } from '@/interfaces/car'
import { deleteFileInStorage, uploadFileToStorage } from '@/libs/firebase/storage'
import { useLoggedInUserStore } from '@/stores/loggedInUser'
import { extractImagePath } from '@/utils/image'
import { getKeys } from '@/utils/keys'
import styled from '@emotion/styled'
import { Box, Button, Card, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { HTMLInputTypeAttribute, useState } from 'react'
import { useForm } from 'react-hook-form'
import AddIcon from '@mui/icons-material/Add'

interface CarTextFieldProp {
  label: string
  endAdornment?: string
  type?: HTMLInputTypeAttribute
}

const TEXT_FILED_PROPS_BY_CAR_PROP: {
  [key in CarPropName]: CarTextFieldProp
} = {
  no: { label: '차번호' },
  model: { label: '모델명' },
  manufacturer: { label: '제조사' },
  launch: { label: '연식' },
  price: { label: '가격', endAdornment: '만원' },
  mileage: { label: '주행거리', endAdornment: 'km' },
  color: { label: '색상' },
  region: { label: '지역' }
}

interface Props {
  onSubmit: (values: CarParams) => void
  defaultValues?: CarParams
  submitButtonName: string
}

export default function CarForm({ defaultValues, onSubmit, submitButtonName }: Props) {
  const originImageUrls = defaultValues?.imageUrl?.split(IMAGE_URL_TOKENIZER) ?? []
  const router = useRouter()
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState(originImageUrls)
  const { register, handleSubmit } = useForm<CarParams>({ defaultValues })
  const { firebaseUser } = useLoggedInUserStore()

  const handleCancel = () => {
    router.back()
  }

  const handleImageFilesSelect = async (files: File[]) => {
    setImageFiles(imageFiles.concat(files))
  }

  const handleImageFileClick = (index: number) => () => {
    const files = imageFiles.slice()
    files.splice(index, 1)
    setImageFiles(files)
  }

  const handleImageUrlClick = (index: number) => () => {
    const urls = imageUrls.slice()
    urls.splice(index, 1)
    setImageUrls(urls)
  }

  const interceptSubmit = async (car: CarParams) => {
    if (!firebaseUser) return

    if (originImageUrls.length > 0) {
      const removedImageUrls = originImageUrls.filter((url) => !imageUrls.includes(url))
      removedImageUrls.forEach((url) => {
        const path = extractImagePath(url)
        deleteFileInStorage(path)
      })
    }

    const urls = await Promise.all(
      imageFiles.map((file) => uploadFileToStorage({ id: car.no, path: 'images/cars', file }))
    )

    const imageUrl = imageUrls.concat(urls).join(IMAGE_URL_TOKENIZER)
    const authorId = firebaseUser.uid

    onSubmit({ ...car, imageUrl, authorId })
  }

  return (
    <Container onSubmit={handleSubmit(interceptSubmit)}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6">차량 정보</Typography>
        <Grid container spacing={1} columns={3}>
          {getKeys(TEXT_FILED_PROPS_BY_CAR_PROP).map((key) => (
            <Grid key={key} item xs={1}>
              <TextField
                {...register(key, { required: true })}
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
          {imageUrls.map((imageUrl, index) => (
            <ImageCard key={`car-image-url-${index}`} onClick={handleImageUrlClick(index)}>
              <AutoImage src={imageUrl} />
            </ImageCard>
          ))}
          {imageFiles.map((imageFile, index) => (
            <ImageCard key={`car-image-file-${index}`} onClick={handleImageFileClick(index)}>
              <AutoImage src={URL.createObjectURL(imageFile)} />
            </ImageCard>
          ))}
          <ImageCard>
            <FileUploadButton onClick={handleImageFilesSelect} multiple>
              <AddIcon htmlColor="black" />
            </FileUploadButton>
          </ImageCard>
        </ImagesBox>
      </Box>
      <ActionsBox>
        <Button onClick={handleCancel}>취소</Button>
        <Button variant="contained" color="primary" type="submit">
          {submitButtonName}
        </Button>
      </ActionsBox>
    </Container>
  )
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  margin: 16px;
`

const ImagesBox = styled(Box)`
  display: flex;
  overflow: auto;
  margin: 8px 0;
`

const ImageCard = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  width: 160px;
  height: 160px;
`

const ActionsBox = styled(Box)`
  display: flex;
  justify-content: end;
  margin: 8px 0;
`
