'use client'

import AutoImage from '@/components/AutoImage'
import { IMAGE_URL_TOKENIZER } from '@/constants/tokenizers'
import { Story } from '@/interfaces/story'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

interface Props {
  story: Story
}

export default function StoryPost({ story }: Props) {
  const router = useRouter()
  const imageUrls = story.thumnailUrl.split(IMAGE_URL_TOKENIZER)

  const handleCardClick = () => {
    router.push(`/stories/${story.id}`)
  }

  return (
    <Card onClick={handleCardClick}>
      <AutoImage src={imageUrls[0]} height="240px" priority />
      <CardHeader
        avatar={<Avatar aria-label="recipe" src={story.authorPhotoUrl} />}
        titleTypographyProps={{ fontWeight: 600, fontSize: 16, noWrap: true }}
        title={story.title}
        subheader={dayjs(story.createdAt).format('YYYY.MM.DD')}
      />
    </Card>
  )
}
