import React from "react"
import { useNotificationContext } from "../utils/contexts/NotificationContext"

const Notification: React.FC<{}> = () => {
  const notification = useNotificationContext()
  const { title, message, messageType, errors } = notification.state

  return (
    <>
      {notification.hasMessage() && (
        <div
          className={`notification ${messageType}`}
          data-testid="notification">
          <p className="is-size-5 has-text-weight-semibold">{title}</p>
          <p className="mt-1">{message}</p>
          {errors.length > 0 && (
            <div className="content is-small">
              <ul className="mt-1">
                {errors.map((error, i) => (
                  <li key={`error${i}`}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Notification
