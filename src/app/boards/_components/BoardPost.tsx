'use client'

import AutoImage from '@/components/AutoImage'
import { IMAGE_URL_TOKENIZER } from '@/constants/tokenizers'
import { Board } from '@/interfaces/board'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

interface Props {
  board: Board
}

export default function BoardPost({ board }: Props) {
  const router = useRouter()
  const imageUrls = board.thumnailUrl.split(IMAGE_URL_TOKENIZER)

  const handleCardClick = () => {
    router.push(`/boards/${board.id}`)
  }

  return (
    <Card onClick={handleCardClick}>
      <AutoImage src={imageUrls[0]} height="240px" priority />
      <CardHeader
        avatar={<Avatar aria-label="recipe" src={board.authorPhotoUrl} />}
        titleTypographyProps={{ fontWeight: 600, fontSize: 16, noWrap: true }}
        title={board.title}
        subheader={dayjs(board.createdAt).format('YYYY.MM.DD')}
      />
    </Card>
  )
}
