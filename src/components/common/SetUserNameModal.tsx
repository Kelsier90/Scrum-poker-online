import React from 'react'
import Modal from './Modal'
import Row from './Row'
import Input from './Input'
import Button from './Button'
import Form from './Form'
import useUser from '../../shared/user/useUser'

interface TypeNameModalProps {
  open: boolean
  onClose?: () => void
  onSubmit?: (data: any) => void
}

const SetUserNameModal = ({ open, onClose, onSubmit }: TypeNameModalProps) => {
  const { name, setName } = useUser()
  const userInputRef = React.useRef<HTMLInputElement>()

  React.useEffect(() => {
    if (open) {
      userInputRef.current.select()
    }
  }, [open])

  const handleSubmit = (data: { user: string }) => {
    setName(data.user)
    if (onSubmit) onSubmit(data)
  }

  return (
    <Modal title="Type your name" open={open} onClose={onClose}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Input
            ref={userInputRef}
            name="user"
            placeholder="Your name"
            defaultValue={name || ''}
            required
          />
          <Button type="submit">Continue</Button>
        </Row>
      </Form>
    </Modal>
  )
}

export default SetUserNameModal
