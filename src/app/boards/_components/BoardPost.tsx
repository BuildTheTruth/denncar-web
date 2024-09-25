'use client'

import AutoImage from '@/components/AutoImage'
import { IMAGE_URL_TOKENIZER } from '@/constants/tokenizers'
import { Board } from '@/interfaces/board'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'

interface Props {
  board: Board
}

export default function BoardPost({ board }: Props) {
  const imageUrls = board.imageUrl.split(IMAGE_URL_TOKENIZER)

  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="recipe" src={board.authorPhotoUrl} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={board.title}
        subheader={dayjs(board.createdAt).format('YYYY.MM.DD')}
      />
      <AutoImage src={imageUrls[0]} height="240px" />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {board.description}
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions> */}
    </Card>
  )
}
