import styles from '@styles/Home.module.css'

import CreateRoomContainer from '@src/components/HomePage/CreateRoomContainer'
import JoinRoomContainer from '@src/components/HomePage/JoinRoomContainer'
import GithubSvg from '@src/components/common/illustrations/GithubSvg'
import ThemeSelector from '@src/components/common/ThemeSelector'

export default function Home() {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <ThemeSelector />
        <a
          href="https://github.com/Kelsier90/Scrum-poker-online"
          target="_blank"
          rel="noreferrer"
          title="Github repository"
        >
          <GithubSvg className={styles.header__icon} />
        </a>
      </header>

      <main className={styles.main}>
        <div>
          <h1>Welcome to Scrum Poker Room</h1>

          <p className={styles.description}>
            You can start by creating a new room or joining to existing one
          </p>

          <CreateRoomContainer />

          <div className={styles.divider}>
            <span className={styles.divider__content}>or</span>
          </div>

          <JoinRoomContainer />
        </div>
      </main>
    </div>
  )
}
