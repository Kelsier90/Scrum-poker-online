import React from 'react'
import Row from '../common/Row'
import Button from '../common/Button'
import Input from '../common/Input'
import Form from '../common/Form'
import useRedirect from '../../shared/router/useRedirect'

const JoinRoomContainer = () => {
  const redirect = useRedirect()

  const handleSubmitRoomId = ({ roomId }: { roomId: string }) => {
    redirect(`rooms/${roomId}`)
  }

  return (
    <>
      <Form onSubmit={handleSubmitRoomId}>
        <Row justifyContent="center">
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
        </Row>
      </Form>
    </>
  )
}

export default JoinRoomContainer
