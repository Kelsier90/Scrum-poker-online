import styles from '@styles/components/RoomPage/Header.module.css'

import React from 'react'
import Button from '../../common/Button'
import QRCodeSvg from '../../common/illustrations/QRCodeSvg'
import useRedirect from '../../../shared/router/useRedirect'
import { copyTextToClipBoard } from '@src/utils/clipboard'
import useLeaveRoom from '../../../apiClient/useLeaveRoom'
import Room from '../../../types/Room'
import RoomQRModal from './RoomQRModal'
import CopySvg from '../../common/illustrations/CopySvg'
import { useNotifications } from '../../common/NotificationsProvider'
import ThemeSelector from '@src/components/common/ThemeSelector'

interface HeaderContainerProps {
  room: Room
}

const HeaderContainer = ({ room }: HeaderContainerProps) => {
  const redirect = useRedirect()
  const [urlWasCopied, setUrlWasCopied] = React.useState<boolean>(false)
  const [openQRModal, setOpenQRModal] = React.useState<boolean>(false)
  const timeoutRef = React.useRef<NodeJS.Timeout>()
  const { execute: leaveRoom } = useLeaveRoom()

  const roomUrl = `${location.host}/rooms/${room.id}`

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current)
      }
    }
  }, [])

  const handleClickCopyUrl = () => {
    copyTextToClipBoard(roomUrl).then(() => {
      setUrlWasCopied(true)
      timeoutRef.current = setTimeout(() => {
        setUrlWasCopied(false)
      }, 5000)
    })
  }

  const { addNotification } = useNotifications()

  const handleClickCopyId = () => {
    copyTextToClipBoard(room.id).then(() => {
      addNotification('success', 'Room ID copied to clipboard')
    })
  }

  const handleClickExit = () => {
    leaveRoom(
      {
        roomId: room.id
      },
      {
        onSuccess: () => redirect('/'),
        onError: error => addNotification('error', error)
      }
    )
  }

  return (
    <>
      <header className={styles.root}>
        <div>
          <div className={styles.root__content}>
            <h1 className={styles.root__content__title}>
              Room{' '}
              <span
                className={styles.root__content__title__id}
                onClick={handleClickCopyId}
              >
                {room.id}
                <CopySvg className={styles.root__content__title__id__copy} />
              </span>
            </h1>
            <p className={styles.root__info}>
              {room.users.length} connected user{room.users.length > 1 && 's'}
            </p>
          </div>

          <Button
            size="sm"
            color={urlWasCopied ? 'success' : 'secondary'}
            className={styles.root__button}
            onClick={handleClickCopyUrl}
          >
            {urlWasCopied ? 'URL copied' : 'Copy URL'}
          </Button>

          <QRCodeSvg
            className={styles.root__qr}
            onClick={() => setOpenQRModal(true)}
          />
        </div>

        <div>
          <ThemeSelector />

          <Button
            size="sm"
            color="primary"
            className={styles.root__button}
            onClick={handleClickExit}
          >
            Exit
          </Button>
        </div>
      </header>

      <RoomQRModal
        open={openQRModal}
        url={roomUrl}
        onClose={() => setOpenQRModal(false)}
      />
    </>
  )
}

export default HeaderContainer
