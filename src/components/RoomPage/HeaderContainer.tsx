import styles from '../../../styles/components/RoomPage/Header.module.css'

import React from 'react'
import Button from '../common/Button'
import useRedirect from '../../Utils/router/useRedirect'
import { copyTextToClipBoard } from '../../Utils/clipboard'
import { APP_BASE_URL } from '../../Utils/browserEnv'

interface HeaderContainerProps {
  id: string
}

const HeaderContainer = ({ id }: HeaderContainerProps) => {
  const redirect = useRedirect()
  const [urlWasCopied, setUrlWasCopied] = React.useState<boolean>(false)
  const timeoutRef = React.useRef<NodeJS.Timeout>()

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current)
      }
    }
  }, [])

  const handleClickCopy = () => {
    copyTextToClipBoard(`${APP_BASE_URL}/rooms/${id}`).then(() => {
      setUrlWasCopied(true)
      timeoutRef.current = setTimeout(() => {
        setUrlWasCopied(false)
      }, 5000)
    })
  }

  const handleClickExit = () => {
    redirect('/')
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>Room {id}</h1>

      <Button
        size="sm"
        color={urlWasCopied ? 'success' : 'primary'}
        className={styles.header__button}
        onClick={handleClickCopy}
      >
        {urlWasCopied ? 'URL copied' : 'Copy URL'}
      </Button>

      <Button
        size="sm"
        color="secondary"
        className={styles.header__button}
        onClick={handleClickExit}
      >
        Exit
      </Button>
    </header>
  )
}

export default HeaderContainer
