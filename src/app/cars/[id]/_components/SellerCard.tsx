'use client'

import { User } from '@/interfaces/user'
import styled from '@emotion/styled'
import { Avatar, Box, Typography } from '@mui/material'
import { HTMLInputTypeAttribute } from 'react'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import Image from 'next/image'

interface UserTextFieldProps {
  label: string
  type?: HTMLInputTypeAttribute
}

const FIELD_NAMES = ['name', 'phoneNumber', 'email', 'kakaoId'] as const

type UserFieldName = (typeof FIELD_NAMES)[number]

interface Props {
  author: User
}

export default function SellerCard({ author }: Props) {
  return (
    <Container>
      <Box my={1}>
        <Typography variant="h6">판매자 정보</Typography>
      </Box>
      <Box my={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: 'flex' }}>
          <Avatar sx={{ width: 72, height: 72, marginX: 2 }} src={author.photoURL} />
        </Box>
        <Box display="flex" flexDirection="column" marginX={2}>
          <Typography fontWeight={600}>{author.name}</Typography>
          <UserInfoColumn>
            <EmailIcon sx={{ mr: 1 }} /> {author.email}
          </UserInfoColumn>
          <UserInfoColumn>
            <PhoneIcon sx={{ mr: 1 }} /> {author.phoneNumber}
          </UserInfoColumn>
          <UserInfoColumn>
            <KakaoIcon width={24} height={24} alt="kakao-icon" src="/kakaotalk.svg" />{' '}
            {author.kakaoId}
          </UserInfoColumn>
        </Box>
      </Box>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0;
  width: 100%;
`

const UserInfoColumn = styled(Typography)`
  display: flex;
  align-items: center;
  padding: 2px 0;
`

const KakaoIcon = styled(Image)`
  margin-right: 8px;
`
