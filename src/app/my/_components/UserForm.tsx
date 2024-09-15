import FileUploadButton from '@/components/FileUploadButton'
import { User, UserParams } from '@/interfaces/user'
import { uploadFileToStorage } from '@/libs/firebase/storage'
import { useUser } from '@/queries/useUsers'
import { getKeys } from '@/utils/keys'
import styled from '@emotion/styled'
import { Avatar, Box, Button, TextField, Typography } from '@mui/material'
import { HTMLInputTypeAttribute, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

interface UserTextFieldProps {
  label: string
  type?: HTMLInputTypeAttribute
}

const FIELD_NAMES = ['name', 'phoneNumber', 'email', 'kakaoId'] as const

type UserFieldName = (typeof FIELD_NAMES)[number]

const TEXT_FIELD_PROPS_BY_FIELD_NAME: { [key in UserFieldName]: UserTextFieldProps } = {
  name: { label: '이름' },
  phoneNumber: { label: '전화번호' },
  email: { label: '이메일', type: 'email' },
  kakaoId: { label: '카카오 ID' }
}

interface Props {
  defaultValues: User
  onSubmit: (params: UserParams) => void
}

export default function UserForm({ defaultValues, onSubmit }: Props) {
  const { register, handleSubmit, control } = useForm<UserParams>({ defaultValues })
  const photoURL = useWatch({ control, name: 'photoURL' })
  const [photoFile, setPhotoFile] = useState<File | null>(null)

  const handleProfioeImage = ([file]: File[]) => {
    setPhotoFile(file)
  }

  const interceptSubmit = async (user: UserParams) => {
    let newPhotoURL = user.photoURL

    if (photoFile) {
      newPhotoURL = await uploadFileToStorage({
        id: defaultValues.id,
        path: 'images/users',
        file: photoFile
      })
    }

    onSubmit({ ...user, photoURL: newPhotoURL })
  }

  return (
    <Container component="form" onSubmit={handleSubmit(interceptSubmit)}>
      <Box sx={{ minWidth: '360px' }}>
        <Box height={80}>
          <Typography variant="h4" marginY={2}>
            마이 프로필
          </Typography>
        </Box>
        <ProfileImageBox>
          <FileUploadButton onClick={handleProfioeImage}>
            <Avatar
              sx={{ width: 72, height: 72 }}
              src={photoFile ? URL.createObjectURL(photoFile) : photoURL}
            />
          </FileUploadButton>
        </ProfileImageBox>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {getKeys(TEXT_FIELD_PROPS_BY_FIELD_NAME).map((key) => (
            <TextField
              fullWidth
              key={key}
              margin="normal"
              {...TEXT_FIELD_PROPS_BY_FIELD_NAME[key]}
              {...register(key)}
            />
          ))}
        </Box>
        <ActionsBox>
          <Button variant="contained" color="primary" type="submit">
            수정
          </Button>
        </ActionsBox>
      </Box>
    </Container>
  )
}

const Container = styled(Box)`
  display: flex;
  min-width: 100%;
  flex-direction: column;
  align-items: center;
`

const ProfileImageBox = styled(Box)`
  display: flex;
  justify-content: center;
  margin: 16px 0;
`

const ActionsBox = styled(Box)`
  display: flex;
  justify-content: end;
  margin: 8px 0;
`
