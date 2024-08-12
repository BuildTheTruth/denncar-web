import styled from '@emotion/styled'
import Image, { ImageProps } from 'next/image'

interface Props {
  alt?: string
  height?: string
  src: string
}

export default function AutoImage({ alt = '', height = 'auto', ...props }: Props) {
  return <StyledImage alt={alt} sizes="100vw" width={0} height={0} _height={height} {...props} />
}

const StyledImage = styled(Image)<{ _height: string }>`
  width: 100%;
  height: ${({ _height }) => _height};
`
