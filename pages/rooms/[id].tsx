import styles from '../../styles/Room.module.css'

import React from 'react'
import useURLParams from '../../src/Utils/router/useURLParams'
import Container from '../../src/components/common/Container'
import HeaderContainer from '../../src/components/RoomPage/HeaderContainer'
import BoardContainer from '../../src/components/RoomPage/BoardContainer'

const Room = () => {
  const { id } = useURLParams()

  return (
    <Container>
      <HeaderContainer id={id as string} />
      <main className={styles.main}>
        <BoardContainer />
      </main>
    </Container>
  )
}

export default Room
