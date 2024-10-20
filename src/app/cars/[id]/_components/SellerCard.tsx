'use client'

import { User } from '@/interfaces/user'
import styled from '@emotion/styled'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import { Avatar, Box, Card, Typography } from '@mui/material'
import Image from 'next/image'

interface Props {
  author: User
}

export default function SellerCard({ author }: Props) {
  return (
    <Container>
      <Card sx={{ paddingX: 2 }}>
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
              <KakaoIcon width={24} height={24} alt="kakao-icon" src="/kakaotalk.svg" />{' '}
              {author.kakaoId}
            </UserInfoColumn>
          </Box>
        </Box>
      </Card>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  margin: 16px 0;
`

const UserInfoColumn = styled(Typography)`
  display: flex;
  align-items: center;
  padding: 2px 0;
`

const KakaoIcon = styled(Image)`
  margin-right: 8px;
`
