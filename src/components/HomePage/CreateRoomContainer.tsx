import React from 'react'
import Button from '../common/Button'
import SetUserNameModal from '../common/SetUserNameModal'
import useCreateRoom from '../../apiClient/useCreateRoom'
import useRedirect from '../../shared/router/useRedirect'
import { useNotifications } from '../common/NotificationsProvider'

const CreateRoomContainer = () => {
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const redirect = useRedirect()

  const createRoom = useCreateRoom()

  const handleClick = () => {
    setOpenModal(true)
  }

  const { addNotification } = useNotifications()

  const handleSubmit = ({ user }: { user: string }) => {
    createRoom({ userName: user }, data => {
      redirect(`/rooms/${data.id}?askForName=0`)
      addNotification('info', 'Room created')
    })

    setOpenModal(false)
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
    </>
  )
}

export default CreateRoomContainer
