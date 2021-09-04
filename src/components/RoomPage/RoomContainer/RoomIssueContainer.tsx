import styles from '@styles/components/RoomPage/RoomIssue.module.css'

import React from 'react'
import Room from '../../../types/Room'
import Button from '../../common/Button'
import Modal from '../../common/Modal'
import Form from '../../common/Form'
import Row from '../../common/Row'
import Input from '../../common/Input'
import useSetRoomIssue from '../../../apiClient/useSetRoomIssue'
import clsx from 'clsx'
import useCurrentUserFromRoom from '../../../hooks/useCurrentUserFromRoom'

interface RoomIssueContainerProps {
  room: Room
}

const RoomIssueContainer = ({ room }: RoomIssueContainerProps) => {
  const [openEditIssueModal, setOpenEditIssueModal] = React.useState(false)
  const [runAnimation, setRunAnimation] = React.useState(false)

  const currentUser = useCurrentUserFromRoom(room)

  const setRoomIssue = useSetRoomIssue()

  React.useEffect(() => {
    let timeout

    if (room.issue) {
      setRunAnimation(false)
      timeout = setTimeout(() => {
        setRunAnimation(true)
      }, 10)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [room.issue])

  const handleSubmitIssue = ({ issue }: { issue: string }) => {
    setRoomIssue({
      roomId: room.id,
      issue
    })

    setOpenEditIssueModal(false)
  }

  return (
    <>
      <div className={styles.root}>
        <div className={styles.root__content}>
          <h2
            className={clsx(styles.root__content__text, {
              [styles['root__content__text--animated']]: runAnimation
            })}
            title={room.issue || 'Not specified'}
          >
            Voting:{' '}
            <span
              className={clsx(styles.root__content__text__issue, {
                [styles['root__content__text__issue--empty']]: !room.issue
              })}
            >
              {room.issue || 'Not specified'}
            </span>
          </h2>

          {currentUser?.isMaster && (
            <Button
              color="primary"
              size="md"
              applyMargin={false}
              onClick={() => setOpenEditIssueModal(true)}
            >
              Edit
            </Button>
          )}
        </div>
      </div>

      {openEditIssueModal && (
        <Modal
          title="Edit issue"
          open={openEditIssueModal}
          onClose={() => setOpenEditIssueModal(false)}
        >
          <Form onSubmit={handleSubmitIssue}>
            <Row>
              <Input
                name="issue"
                defaultValue={room.issue}
                autoFocus
                maxLength={100}
              />
              <Button type="submit">Save</Button>
            </Row>
          </Form>
        </Modal>
      )}
    </>
  )
}

export default RoomIssueContainer
