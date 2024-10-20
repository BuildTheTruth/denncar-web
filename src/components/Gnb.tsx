'use client'

import MenuButton from '@/components/MenuButton'
import { useUser } from '@/libs/tanstack/queries/users'
import { useLoggedInUserStore } from '@/stores/loggedInUser'
import styled from '@emotion/styled'
import { Avatar, Box, Button } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useCallback, useEffect, useState } from 'react'

const pages = [
  { id: 'boards', label: '자유게시판' },
  { id: 'stories', label: '내차스토리' },
  { id: 'cars', label: '중고차매매' }
]

interface Props {
  children: ReactNode
}

function Gnb({ children }: Props) {
  const router = useRouter()
  const { firebaseUser, onSubscribeAuthorization, signOut, signIn } = useLoggedInUserStore()
  const { user } = useUser(firebaseUser?.uid)
  const pathname = usePathname()

  const isCurrentPage = useCallback(
    (pageId: string) => new RegExp(`^/${pageId}`).test(pathname),
    [pathname]
  )

  const handleProfileMenuOpen = () => {
    if (!firebaseUser) {
      signIn()
      return false
    }
    return true
  }

  const handleMyPageClick = () => {
    router.push('/my')
  }

  const handleLogout = async () => {
    await signOut()
    router.replace('/')
  }

  const profileMenuItems = [
    { id: 'my', label: '마이페이지', onClick: handleMyPageClick },
    { id: 'logout', label: '로그아웃', onClick: handleLogout }
  ]

  useEffect(() => {
    onSubscribeAuthorization()
  }, [])

  return (
    <Container>
      <AppBar position="static" sx={{ background: '#1c1c1c' }}>
        <Toolbar>
          <Box
            display="flex"
            alignItems="center"
            component="a"
            href="/"
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              mr: 2
            }}
          >
            <Image src="/logo.svg" alt="Denncar Logo" width={50} height={50} priority />
            <Typography mx={2} variant="h6" noWrap>
              덴카
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                sx={{
                  color: 'white',
                  mx: 1,
                  borderBottom: isCurrentPage(page.id) ? '1px solid white' : ''
                }}
                onClick={() => router.push(`/${page.id}`)}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: 'flex' }}>
            <MenuButton
              icon={<Avatar sx={{ width: 36, height: 36 }} src={user?.photoURL ?? ''} />}
              onBeforeOpen={handleProfileMenuOpen}
              items={profileMenuItems}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Main>{children}</Main>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Main = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
`

export default Gnb
