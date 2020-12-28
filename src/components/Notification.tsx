import React from "react"
import { useNotificationContext } from "../utils/contexts/NotificationContext"

const Notification: React.FC<{}> = () => {
  const notificationContext = useNotificationContext()
  const [title, message, type] = notificationContext.getValue()

  return (
    <>
      {notificationContext.hasMessage() && (
        <div className={`notification ${type}`}>
          <p className="is-size-5 has-text-weight-semibold">{title}</p>
          <p className="mt-1">{message}</p>
        </div>
      )}
    </>
  )
}

export default Notification
