import React from "react"
import { useNotificationContext } from "../utils/contexts/NotificationContext"

const Notification: React.FC<{}> = () => {
  const notificationContext = useNotificationContext()
  const { errorList, message, title, type } = notificationContext.getValue()

  return (
    <>
      {notificationContext.hasMessage() && (
        <div className={`notification ${type}`}>
          <p className="is-size-5 has-text-weight-semibold">{title}</p>
          <p className="mt-1">{message}</p>
          {!!errorList && errorList.length > 0 && (
            <div className="content is-small">
              <ul className="mt-1">
                {errorList.map((error, i) => (
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
