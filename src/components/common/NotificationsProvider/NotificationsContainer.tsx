import styles from '@styles/components/common/Notifications.module.css'

import React from 'react'
import clsx from 'clsx'
import { useNotifications } from './index'

const severityClassMap = {
  info: styles['root__box--severity-info'],
  success: styles['root__box--severity-success'],
  error: styles['root__box--severity-alert']
}

const NotificationsContainer = () => {
  const { notifications, removeNotification } = useNotifications()

  return (
    <div className={styles.root}>
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={clsx(
            styles.root__box,
            severityClassMap[notification.severity]
          )}
        >
          <div className={styles.root__box__text}>{notification.text}</div>
          <span
            className={styles.root__box__close}
            onClick={() => removeNotification(notification.id)}
          >
            &times;
          </span>
        </div>
      ))}
    </div>
  )
}

export default NotificationsContainer
