'use client'

import { Avatar, Box, Button, IconButton } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import Link from 'next/link'

const pages = [
  {
    id: 'boards',
    label: '자유게시판'
  },
  {
    id: 'car-stories',
    label: '내차스토리'
  },
  {
    id: 'used-cars',
    label: '중고차매매'
  }
]

function Gnb() {
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
              <Link href={page.id} key={page.id}>
                <Button sx={{ color: 'white', mx: 1 }}>{page.label}</Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton>
              <AccountCircleOutlinedIcon fontSize="large" sx={{ color: 'white' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Gnb
