import React from 'react'
import NextImage from 'next/image'

interface ImageProps {
  src: string
  alt: string
  title?: string
  width?: string | number
  height?: string | number
}

const Image = ({ src, alt, title, width, height }: ImageProps) => {
  return (
    <NextImage
      src={src}
      alt={alt}
      title={title}
      width={width}
      height={height}
    />
  )
}

export default Image
