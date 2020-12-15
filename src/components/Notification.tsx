import React from "react"

const Notification: React.FC<{}> = () => (
  <div className="notification is-danger">
    <p className="is-size-4 has-text-weight-bold">title</p>
    <p className="mt-1">message</p>
  </div>
)

export default Notification
