import styles from '../../../styles/components/RoomPage/Board.module.css'

import React from 'react'
import PokerCard from '../common/PokerCard'
import clsx from 'clsx'

const BoardContainer = () => {
  return (
    <div className={styles.board}>
      <div
        className={clsx(
          styles.board__slot,
          styles['board__slot--status-current-user']
        )}
      >
        <PokerCard value="1" active />

        <div className={styles.board__slot__name}>
          <img
            src="/img/crown.svg"
            width={30}
            height="auto"
            alt="Master"
            title="Master"
          />
          Jane Doe
        </div>
      </div>

      <div className={styles.board__slot}>
        <PokerCard value="2" active />

        <div className={styles.board__slot__name}>
          <div>John Doe</div>
        </div>
      </div>
    </div>
  )
}

export default BoardContainer
