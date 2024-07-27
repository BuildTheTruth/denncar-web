'use client'

import styled from '@emotion/styled'
import { IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { MouseEvent, ReactNode, useState } from 'react'

interface Props {
  items: { id: string; label: string; onClick: () => void }[]
  icon: ReactNode
  onShow?: (e: MouseEvent<HTMLButtonElement>) => void
  onClose?: () => void
  onBeforeOpen?: () => boolean
}

function MenuButton({ items, icon, onShow, onClose, onBeforeOpen }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleClose = () => {
    setAnchorEl(null)
    onClose?.()
  }

  const handleShow = (e: MouseEvent<HTMLButtonElement>) => {
    const isOpen = onBeforeOpen?.() ?? true
    if (!isOpen) return
    setAnchorEl(e.currentTarget)
    onShow?.(e)
    e.stopPropagation()
  }

  return (
    <Container>
      <IconButton onClick={handleShow}>{icon}</IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()}
      >
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
