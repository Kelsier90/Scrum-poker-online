import React from 'react'
import Button from '../common/Button'
import SetUserNameModal from '../common/SetUserNameModal'
import useCreateRoom from '../../apiClient/useCreateRoom'
import useRedirect from '../../shared/router/useRedirect'
import { useNotifications } from '../common/NotificationsProvider'
import FullScreenLoader from '@src/components/common/FullScreenLoader'

const CreateRoomContainer = () => {
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const redirect = useRedirect()

  const { status, execute: createRoom } = useCreateRoom()

  const handleClick = () => {
    setOpenModal(true)
  }

  const { addNotification } = useNotifications()

  const handleSubmit = ({ user }: { user: string }) => {
    createRoom(
      { userName: user },
      {
        onSuccess: room => {
          setOpenModal(false)
          redirect(`/rooms/${room.id}?askForName=0`)
          addNotification('info', 'Room created')
        },
        onError: errorMessage => addNotification('error', errorMessage)
      }
    )
  }

  return (
    <>
      <Button size="lg" onClick={handleClick}>
        Create new Room
      </Button>

      <SetUserNameModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
      />

      <FullScreenLoader active={status === 'loading'} />
    </>
  )
}

export default CreateRoomContainer
