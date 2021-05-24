import React from 'react'
import Button from '../common/Button'
import TypeNameModal from './TypeNameModal'
import useUser from '../../Utils/user/useUser'

const CreateRoomContainer = () => {
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const [, setUser] = useUser()

  const handleClick = () => {
    setOpenModal(true)
  }

  const handleSubmit = ({ user }: { user: string }) => {
    setUser(user)

    setOpenModal(false)
  }

  return (
    <>
      <Button size="lg" onClick={handleClick}>
        Create new Room
      </Button>

      <TypeNameModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default CreateRoomContainer
