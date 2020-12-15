import React, { createContext, ReactNode, useState } from "react"

interface INotificationContext {
  clear: () => void
  hasMessage: () => boolean
  setErrorMessage: (title: string, message: string) => void
}
const NotificationContext = createContext<INotificationContext>({ clear: () => { }, hasMessage: () => false, setErrorMessage: () => { } })

const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  type TData = {
    title: string
    message: string
    type?: "is-danger"
  }
  const [data, setData] = useState<TData>()

  const clear = () => setData({ title: "", message: "", type: null })
  const hasMessage = () => !!data.title && !!data.message && !!data.type
  const setErrorMessage = (title: string, message: string) => setData({ title, message, type: "is-danger" })

  return <NotificationContext.Provider value={{ clear, hasMessage, setErrorMessage }}>{children}</NotificationContext.Provider>
}

export default NotificationContext
export { NotificationProvider }
