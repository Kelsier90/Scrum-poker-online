import styles from '@styles/components/RoomPage/BoardSlot.module.css'

import React from 'react'
import clsx from 'clsx'
import PokerCard from '../../common/PokerCard'
import Room, { RoomUser } from '@src/types/Room'
import useUser from '../../../shared/user/useUser'
import CrownSvg from '../../common/illustrations/CrownSvg'
import Menu from '@src/components/common/Menu'
import MenuItem from '@src/components/common/Menu/MenuItem'
import useCurrentUserFromRoom from '@src/hooks/useCurrentUserFromRoom'

interface BoardSlotProps {
  user: RoomUser
  room: Room
  onPromoteUser: () => void
  onDemoteUser: () => void
  onKickUser: () => void
}

const BoardSlot = ({
  user,
  room,
  onPromoteUser,
  onDemoteUser,
  onKickUser
}: BoardSlotProps) => {
  const { id: currentUserId } = useUser()

  const currentUser = useCurrentUserFromRoom(room)

  const userName: React.ReactElement = (
    <div className={styles.root__name}>
      {user.isMaster && (
        <CrownSvg
          width={30}
          height="100%"
          className={styles.root__name__master}
        />
      )}
      {user.name}
    </div>
  )

  return (
    <div
      key={user.id}
      className={clsx({
        [styles.root]: true,
        [styles['root--status-current-user']]: currentUserId === user.id
      })}
    >
      <PokerCard
        value={user.selectedCard}
        status={
          user.selectedCard
            ? 'displayed'
            : user.hasSelectedCard
            ? 'selected'
            : 'unselected'
        }
      />

      {currentUser?.isMaster && currentUserId !== user.id ? (
        <Menu title={userName}>
          {user.isMaster ? (
            <MenuItem onClick={onDemoteUser}>Demote</MenuItem>
          ) : (
            <MenuItem onClick={onPromoteUser}>Promote</MenuItem>
          )}
          <MenuItem onClick={onKickUser}>Kick out</MenuItem>
        </Menu>
      ) : (
        userName
      )}
    </div>
  )
}

export default BoardSlot
