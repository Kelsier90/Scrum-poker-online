import styles from '../styles/Home.module.css'

import Container from '../src/components/common/Container'
import CreateRoomContainer from '../src/components/HomePage/CreateRoomContainer'
import JoinRoomContainer from '../src/components/HomePage/JoinRoomContainer'

export default function Home() {
  return (
    <Container>
      <main className={styles.main}>
        <h1>Welcome to Scrum Poker Room</h1>

        <p className={styles.description}>
          You can start by creating a new room or joining to existing one
        </p>

        <CreateRoomContainer />

        <div className={styles.divider}>
          <span className={styles.divider__content}>or</span>
        </div>

        <JoinRoomContainer />
      </main>
    </Container>
  )
}
