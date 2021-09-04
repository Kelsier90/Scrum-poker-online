import React from 'react'
import Notification from './types/Notification'

interface NotificationsContextValue {
  notifications: Notification[]
  addNotification: (
    severity: 'info' | 'success' | 'error',
    text: string
  ) => void
  removeNotification: (id: number) => void
}

const NotificationsContext =
  React.createContext<NotificationsContextValue>(undefined)

export const useNotifications = () => React.useContext(NotificationsContext)

const NotificationsProvider = ({ children }: { children: unknown }) => {
  const [notifications, setNotifications] = React.useState<Notification[]>([])
  const timeoutsRef = React.useRef([])

  React.useEffect(() => {
    return () => {
      for (const to of timeoutsRef.current) {
        clearTimeout(to)
      }
    }
  }, [])

  const removeNotification = id =>
    setNotifications(currentNotifications =>
      [...currentNotifications].filter(n => n.id !== id)
    )

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        addNotification: (severity, text) => {
          const id = Date.now()
          setNotifications(currentNotifications => [
            ...currentNotifications,
            {
              id,
              severity,
              text
            }
          ])

          timeoutsRef.current.push(
            setTimeout(() => {
              removeNotification(id)
            }, 5000)
          )
        },
        removeNotification
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export default NotificationsProvider
