import React from 'react'
import Modal from '../common/Modal'
import Input from '../common/Input'
import Button from '../common/Button'
import Form from '../common/Form'
import useUser from '../../Utils/user/useUser'

interface TypeNameModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

const TypeNameModal = ({ open, onClose, onSubmit }: TypeNameModalProps) => {
  const [user] = useUser()
  const userInputRef = React.useRef<HTMLInputElement>()

  React.useEffect(() => {
    if (open) {
      userInputRef.current.select()
    }
  }, [open])

  return (
    <Modal title="Type your name" open={open} onClose={onClose}>
      <Form onSubmit={onSubmit}>
        <Input
          ref={userInputRef}
          name="user"
          placeholder="Your name"
          defaultValue={user}
          required
        />
        <Button type="submit">Continue</Button>
      </Form>
    </Modal>
  )
}

export default TypeNameModal
