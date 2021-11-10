import React from 'react'
import Notification from './types/Notification'

interface NotificationsContextValue {
  notifications: Notification[]
  addNotification: (
    severity: 'info' | 'success' | 'error',
    text: string
  ) => number
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

  const removeNotification = React.useCallback(
    id =>
      setNotifications(currentNotifications =>
        [...currentNotifications].filter(n => n.id !== id)
      ),
    []
  )

  const addNotification = React.useCallback(
    (severity, text, fixed = false): number => {
      const id = Date.now()
      setNotifications(currentNotifications => [
        ...currentNotifications,
        {
          id,
          severity,
          text
        }
      ])

      if (!fixed) {
        timeoutsRef.current.push(
          setTimeout(() => {
            removeNotification(id)
          }, 5000)
        )
      }

      return id
    },
    [removeNotification]
  )

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export default NotificationsProvider
