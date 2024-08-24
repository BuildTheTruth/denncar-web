'use client'

import { User } from '@/interfaces/user'
import { getKeys } from '@/utils/keys'
import styled from '@emotion/styled'
import { Box, TextField, Typography } from '@mui/material'
import { HTMLInputTypeAttribute } from 'react'
import { useForm } from 'react-hook-form'

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

type UserFieldValues = Pick<User, UserFieldName>

interface Props {
  defaultValues: UserFieldValues
}

export default function UserForm({ defaultValues }: Props) {
  const { register, handleSubmit } = useForm<UserFieldValues>({ defaultValues })

  return (
    <Container>
      <Box>
        <Typography variant="h4" margin={2}>
          마이 프로필
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 360 }}>
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
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`
