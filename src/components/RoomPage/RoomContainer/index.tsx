import styles from '@styles/components/RoomPage/Room.module.css'

import React from 'react'
import HeaderContainer from './HeaderContainer'
import BoardContainer from './BoardContainer'
import useJoinRoom from '../../../apiClient/useJoinRoom'
import Loader from '../../common/Loader'
import ErrorView from '../../common/ErrorView'
import SetUserNameModal from '../../common/SetUserNameModal'
import useOnUpdateRoom from '../../../apiClient/useOnUpdateRoom'
import RoomIssueContainer from './RoomIssueContainer'
import BoardControlsContainer from './BoardControlsContainer'
import useUser from '../../../shared/user/useUser'
import { useNotifications } from '../../common/NotificationsProvider'
import useOnUserJoinedToRoom from '@src/apiClient/useOnUserJoinedToRoom'
import useOnUserLeftRoom from '@src/apiClient/useOnUserLeftRoom'
import useOnUserKickedFromRoom from '@src/apiClient/useOnUserKickedFromRoom'
import useRedirect from '@src/shared/router/useRedirect'
import Room from '@src/types/Room'

const RoomContainer = ({
  id,
  askForName
}: {
  id: string
  askForName: boolean
}) => {
  const { id: currentUserId, name } = useUser()

  const redirect = useRedirect()

  const [wasNameSubmitted, setWasNameSubmitted] = React.useState<boolean>(
    !askForName && name != null
  )

  const [room, setRoom] = React.useState<Room>(null)

  const { status, error, execute: joinRoom } = useJoinRoom()

  const { addNotification } = useNotifications()

  useOnUserJoinedToRoom(
    room?.id,
    ({ name }) => addNotification('info', `${name} has joined to the room`),
    !!room?.id
  )

  useOnUserLeftRoom(
    room?.id,
    ({ name, isMaster }) =>
      addNotification(
        'info',
        `${name} ${isMaster ? '(master)' : ''} has left the room`
      ),
    !!room?.id
  )

  useOnUserKickedFromRoom(
    room?.id,
    ({ id, name, isMaster }) => {
      if (id === currentUserId) {
        redirect('/')
        addNotification('info', `You have been kicked out from the room`)
      } else {
        addNotification(
          'info',
          `${name} ${
            isMaster ? '(master)' : ''
          } has been kicked out from the room`
        )
      }
    },
    !!room?.id
  )

  useOnUpdateRoom(room?.id, room => setRoom(room), !!room?.id)

  React.useEffect(() => {
    if (wasNameSubmitted && name != null && !!id) {
      joinRoom(
        {
          roomId: id,
          userName: name
        },
        {
          onSuccess: data => {
            setRoom(data)
          }
        }
      )
    }
  }, [id, joinRoom, name, wasNameSubmitted])

  const handleSubmitName = () => {
    setWasNameSubmitted(true)
  }

  if (status === 'idle' || !wasNameSubmitted)
    return <SetUserNameModal onSubmit={handleSubmitName} open />

  if (status === 'loading')
    return (
      <div className={styles.root}>
        <Loader />
      </div>
    )

  if (status === 'error') return <ErrorView message={error} backUrl="/" />

  if (!room) return null

  // else status === 'success'
  return (
    <div className={styles.root}>
      <HeaderContainer room={room} />

      <RoomIssueContainer room={room} />

      <div className={styles.root__main}>
        <BoardContainer room={room} />
      </div>

      <BoardControlsContainer room={room} />
    </div>
  )
}

export default RoomContainer
