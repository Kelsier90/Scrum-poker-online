import styles from '@styles/components/RoomPage/Room.module.css'

import React from 'react'
import HeaderContainer from './HeaderContainer'
import BoardContainer from './BoardContainer'
import Room from '@src/types/Room'
import useJoinRoom from '../../../apiClient/useJoinRoom'
import Loader from '../../common/Loader'
import Error from '../../common/Error'
import SetUserNameModal from '../../common/SetUserNameModal'
import useOnUpdateRoom from '../../../apiClient/useOnUpdateRoom'
import RoomIssueContainer from './RoomIssueContainer'
import BoardControlsContainer from './BoardControlsContainer'
import useUser from '../../../shared/user/useUser'
import { useNotifications } from '../../common/NotificationsProvider'
import useOnError from '@src/apiClient/useOnError'
import useOnUserJoinedToRoom from '@src/apiClient/useOnUserJoinedToRoom'
import useOnUserLeftRoom from '@src/apiClient/useOnUserLeftRoom'
import useOnUserKickedFromRoom from '@src/apiClient/useOnUserKickedFromRoom'
import useRedirect from '@src/shared/router/useRedirect'

const RoomContainer = ({
  id,
  askForName
}: {
  id: string
  askForName: boolean
}) => {
  const { id: currentUserId, name } = useUser()

  const redirect = useRedirect()

  const [status, setStatus] = React.useState<
    'loading' | 'error' | 'success' | 'setName'
  >(askForName || !name ? 'setName' : 'loading')

  const [wasNameSubmitted, setWasNameSubmitted] = React.useState<boolean>(
    !askForName && name != null
  )

  const [error, setError] = React.useState<string>(null)

  const [room, setRoom] = React.useState<Room>(null)

  const joinRoom = useJoinRoom()

  const { addNotification } = useNotifications()

  useOnUserJoinedToRoom(({ name }) =>
    addNotification('info', `${name} has joined to the room`)
  )

  useOnUserLeftRoom(({ name, isMaster }) =>
    addNotification(
      'info',
      `${name} ${isMaster ? '(master)' : ''} has left the room`
    )
  )

  useOnUserKickedFromRoom(({ id, name, isMaster }) => {
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
  })

  useOnError(message => addNotification('error', message))

  useOnUpdateRoom(room => setRoom(room))

  React.useEffect(() => {
    if (wasNameSubmitted && name != null) {
      joinRoom(
        {
          id,
          userName: name
        },
        data => {
          setRoom(data)
          setError(null)
          setStatus('success')
        },
        e => {
          setRoom(null)
          setError(e)
          setStatus('error')
        }
      )
    }
  }, [id, joinRoom, name, wasNameSubmitted])

  const handleSubmitName = () => {
    setWasNameSubmitted(true)
  }

  if (status === 'setName')
    return <SetUserNameModal onSubmit={handleSubmitName} open />

  if (status === 'loading') return <Loader />

  if (status === 'error') return <Error message={error} backUrl="/" />

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
