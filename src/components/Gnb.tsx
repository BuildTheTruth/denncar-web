'use client'

import { useLoggedInUserStore } from '@/stores/loggedInUser'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { Avatar, Box, Button, IconButton, Menu, MenuItem } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MouseEvent, useEffect, useMemo, useState } from 'react'

const pages = [
  { id: 'boards', label: '자유게시판' },
  { id: 'car-stories', label: '내차스토리' },
  { id: 'used-cars', label: '중고차매매' }
]

function Gnb() {
  const router = useRouter()
  const [anchorProfileMenu, setAnchorProfileMenu] = useState<HTMLElement | null>(null)
  const { loggedInUser, onSubscribeAuthorization, signOut, signIn } = useLoggedInUserStore()

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorProfileMenu(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setAnchorProfileMenu(null)
  }

  const handleAccountSelect = async () => {
    if (!loggedInUser) {
      await signIn()
    }
    router.push('/account')
  }

  const profileMenuItems = useMemo(
    () => [
      { id: 'account', label: '계정', onClick: handleAccountSelect },
      { id: 'logout', label: '로그아웃', onClick: signOut }
    ],
    [loggedInUser]
  )

  useEffect(() => {
    onSubscribeAuthorization()
  }, [])

  return (
    <AppBar position="static" sx={{ background: '#1c1c1c' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
                sx={{ color: 'white', mx: 1 }}
                onClick={() => router.push(`/${page.id}`)}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: 'flex' }}>
            <IconButton onClick={handleProfileMenuOpen}>
              {loggedInUser?.photoURL ? (
                <Avatar sx={{ width: 36, height: 36 }} src={loggedInUser.photoURL} />
              ) : (
                <AccountCircleOutlinedIcon fontSize="large" sx={{ color: 'white' }} />
              )}
            </IconButton>
            <Menu
              anchorEl={anchorProfileMenu}
              open={Boolean(anchorProfileMenu)}
              onClose={handleProfileMenuClose}
            >
              {profileMenuItems.map((item) => (
                <MenuItem
                  key={item.id}
                  onClick={() => {
                    item.onClick()
                    handleProfileMenuClose()
                  }}
                >
                  <Typography>{item.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Gnb
