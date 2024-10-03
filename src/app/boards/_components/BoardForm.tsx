import { BoardParams } from '@/interfaces/board'
import styled from '@emotion/styled'
import { Box, Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'

import { useLoggedInUserStore } from '@/stores/loggedInUser'
import Loading from '@/components/Loading'
import ToastUIEditor from '@/components/ToastUIEditor'
import { useRouter } from 'next/navigation'
import { extractFirstImageUrl } from '@/utils/image'
import { User } from '@/interfaces/user'

interface Props {
  defaultValues?: BoardParams
  author: User
  submitButtonName: string
  onSubmit: (values: BoardParams) => void
}

export default function BoardForm({ onSubmit, author, defaultValues, submitButtonName }: Props) {
  const { register, handleSubmit, setValue } = useForm<BoardParams>({ defaultValues })
  const { firebaseUser } = useLoggedInUserStore()
  const router = useRouter()

  if (!firebaseUser) {
    return <Loading />
  }

  const interceptSubmit = async (board: BoardParams) => {
    onSubmit({
      ...board,
      thumnailUrl: extractFirstImageUrl(board.description) ?? '',
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

  return (
    <Container component="form" onSubmit={handleSubmit(interceptSubmit)}>
      <TextField {...register('title')} label="제목" fullWidth sx={{ marginBottom: 2 }} />
      <ToastUIEditor
        initialValue={defaultValues?.description}
        authorId={firebaseUser.uid}
        storageImagePath="images/boards"
        onChange={handleEditorChange}
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

const Container = styled(Box)`
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
