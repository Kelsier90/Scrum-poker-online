import React from 'react'
import Button from '../common/Button'
import TypeNameModal from './TypeNameModal'
import useUser from '../../Utils/user/useUser'
import Input from '../common/Input'
import Form from '../common/Form'
import useRedirect from '../../Utils/router/useRedirect'

const JoinRoomContainer = () => {
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const [roomId, setRoomId] = React.useState<string>('')
  const [, setUser] = useUser()

  const redirect = useRedirect()

  const handleSubmitRoomId = ({ roomId }: { roomId: string }) => {
    setRoomId(roomId)
    setOpenModal(true)
  }

  const handleSubmit = ({ user }: { user: string }) => {
    setUser(user)

    setOpenModal(false)

    redirect(`rooms/${roomId}`)
  }

  return (
    <>
      <Form onSubmit={handleSubmitRoomId}>
        <Input
          name="roomId"
          placeholder="Room ID"
          size="lg"
          autoFocus
          required
        />
        <Button size="lg" type="submit">
          Join
        </Button>
      </Form>

      <TypeNameModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default JoinRoomContainer
