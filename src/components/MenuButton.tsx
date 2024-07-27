'use client'

import styled from '@emotion/styled'
import { IconButton, Menu, MenuItem, SxProps, Typography } from '@mui/material'
import { MouseEvent, ReactNode, useState } from 'react'

interface Props {
  sx?: SxProps
  items: { id: string; label: string; onClick: () => void }[]
  icon: ReactNode
  onShow?: () => void
  onClose?: () => void
  onBeforeOpen?: () => boolean
}

function MenuButton({ sx, items, icon, onShow, onClose, onBeforeOpen }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleClose = () => {
    setAnchorEl(null)
    onClose?.()
  }

  const handleOpen = (e: MouseEvent<HTMLElement>) => {
    const isOpen = onBeforeOpen?.() ?? true
    if (!isOpen) return
    setAnchorEl(e.currentTarget)
    onShow?.()
  }

  return (
    <Container>
      <IconButton onClick={handleOpen}>{icon}</IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {items.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => {
              item.onClick()
              handleClose()
            }}
          >
            <Typography>{item.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Container>
  )
}

const Container = styled.div``

export default MenuButton
