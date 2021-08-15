import React from "react"
import { useNotificationContext } from "../utils/contexts/NotificationContext"

const Notification: React.FC<{}> = () => {
  const notification = useNotificationContext()
  const { title, message, messageType, errors, code, traceId } =
    notification.state

  return (
    <>
      {notification.hasMessage() && (
        <div
          className={`notification ${messageType}`}
          data-testid="notification">
          <p className="is-size-5 has-text-weight-semibold">
            {!!code && code + ": "}
            {title}
          </p>
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
          {!!traceId && (
            <p className="content is-small mt-4">Trace ID: {traceId}</p>
          )}
        </div>
      )}
    </>
  )
}

export default Notification
