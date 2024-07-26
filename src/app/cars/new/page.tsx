'use client'

import { CarPropName } from '@/constants/fields'
import { getKeys } from '@/utils/keys'
import styled from '@emotion/styled'
import { Box, Button, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'

const INPUT_LABEL_BY_CAR_FIELD: { [key in CarPropName]: string } = {
  model: '모델명',
  manufacturer: '제조사',
  price: '가격',
  color: '색상',
  mileage: '주행거리',
  launch: '연식'
}

export default function NewCarPage() {
  const router = useRouter()

  const handleCancel = () => {
    router.back()
  }

  return (
    <Container component="form">
      <TextFieldsBox>
        {getKeys(INPUT_LABEL_BY_CAR_FIELD).map((key) => (
          <TextField key={key} margin="normal" label={INPUT_LABEL_BY_CAR_FIELD[key]} />
        ))}
      </TextFieldsBox>
      <ActionsBox>
        <Button onClick={handleCancel}>취소</Button>
        <Button variant="contained" color="primary">
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
`

const TextFieldsBox = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const ActionsBox = styled(Box)`
  display: flex;
  justify-content: end;
`
