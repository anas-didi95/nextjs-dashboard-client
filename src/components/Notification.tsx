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
          <div className="content is-small">
            <ul className="mt-2">
              <li>1</li>
              <li>1</li>
              <li>1</li>
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default Notification
