import { useState } from 'react'
import Lightbox from 'react-image-lightbox'

interface Props {
  startIndex: number
  srcs: string[]
  onClose: () => void
}

export default function PhotoViewer({ startIndex, srcs, onClose }: Props) {
  const [index, setIndex] = useState(startIndex)

  return (
    <Lightbox
      mainSrc={srcs[index]}
      nextSrc={srcs[(index + 1) % srcs.length]}
      prevSrc={srcs[(index - 1) % srcs.length]}
      onMovePrevRequest={() => setIndex((index + srcs.length - 1) % srcs.length)}
      onMoveNextRequest={() => setIndex((index + srcs.length + 1) % srcs.length)}
      onCloseRequest={onClose}
    />
  )
}
