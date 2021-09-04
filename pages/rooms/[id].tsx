import React from 'react'
import RoomContainer from '@src/components/RoomPage/RoomContainer'
import useURLParams from '@src/shared/router/useURLParams'

const Room = () => {
  const { id, askForName = 1 } = useURLParams()

  return (
    <RoomContainer
      id={id as string}
      askForName={!!parseInt(askForName as string)}
    />
  )
}

export default Room
