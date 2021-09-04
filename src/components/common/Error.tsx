import React from 'react'

import styles from '@styles/components/common/Error.module.css'
import Button from './Button'
import useRedirect from '../../shared/router/useRedirect'

interface ErrorProps {
  message: string
  backUrl?: string
}

const Error = ({ message, backUrl }: ErrorProps) => {
  const redirect = useRedirect()

  function handleClick() {
    redirect(backUrl)
  }

  return (
    <div className={styles.root}>
      <div className={styles.root__content}>
        <p className={styles.root__content__message}>{message}</p>
        {backUrl ? (
          <Button color="primary" size="lg" onClick={handleClick}>
            Go back
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default Error
