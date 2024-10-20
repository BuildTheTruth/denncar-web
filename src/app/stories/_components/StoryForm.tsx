import { Story, StoryParams } from '@/interfaces/story'
import styled from '@emotion/styled'
import { Box, Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'

import ToastUIEditor from '@/components/ToastUIEditor'
import { WithId } from '@/interfaces/base'
import { User } from '@/interfaces/user'
import { uploadFileToStorage } from '@/libs/firebase/storage'
import { extractFirstImageUrl } from '@/utils/image'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { v6 as uuid } from 'uuid'

interface Props {
  defaultValues?: Story
  author: User
  submitButtonName: string
  onSubmit: (values: WithId<StoryParams>) => void
}

export default function StoryForm({ onSubmit, author, defaultValues, submitButtonName }: Props) {
  const { register, handleSubmit, setValue } = useForm<StoryParams>({ defaultValues })
  const router = useRouter()
  const imageFileByUrl = useMemo<{ [url: string]: File }>(() => ({}), [])

  const interceptSubmit = async (story: StoryParams) => {
    const storyId = defaultValues?.id ?? uuid()
    const localImageUrls = Object.keys(imageFileByUrl)
    let description = story.description

    if (localImageUrls.length > 0) {
      const promisedUploadedUrls = localImageUrls.map((url) =>
        uploadFileToStorage({
          id: storyId,
          path: `images/stories`,
          file: imageFileByUrl[url]
        })
      )
      const uploadedUrls = await Promise.all(promisedUploadedUrls)

      for (let i = 0; i < localImageUrls.length; i++) {
        description = description.replace(localImageUrls[i], uploadedUrls[i])
      }
    }

    onSubmit({
      ...story,
      id: storyId,
      description,
      thumnailUrl: extractFirstImageUrl(description) ?? '',
      authorId: author.id,
      authorPhotoUrl: author.photoURL ?? ''
    })
  }

  const handleEditorChange = (value: string) => {
    setValue('description', value)
  }

  const handleCancel = () => {
    router.back()
  }

  const handleImageInsert = (url: string, file: File) => {
    imageFileByUrl[url] = file
  }

  return (
    <Container onSubmit={handleSubmit(interceptSubmit)}>
      <TextField {...register('title')} label="제목" fullWidth sx={{ marginBottom: 2 }} />
      <ToastUIEditor
        initialValue={defaultValues?.description}
        onChange={handleEditorChange}
        onImageInsert={handleImageInsert}
      />
      <ActionsBox>
        <Button onClick={handleCancel}>취소</Button>
        <Button variant="contained" color="primary" type="submit">
          {submitButtonName}
        </Button>
      </ActionsBox>
    </Container>
  )
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  margin: 16px;
  width: 100%;
`

const ActionsBox = styled(Box)`
  display: flex;
  justify-content: end;
  margin: 8px 0;
`
