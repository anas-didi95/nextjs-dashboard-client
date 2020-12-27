import React, { createContext, ReactNode, useState } from "react"

type TDataType = "is-success" | "is-danger" | ""
interface INotificationContext {
  clear: () => void
  hasMessage: () => boolean
  getValue: () => string[]
  setErrorMessage: (title: string, message: string) => void
  setSaveMessage: (title: string, message: string, type: TDataType) => void
  checkSaveMessage: () => void
}
const NotificationContext = createContext<INotificationContext>({
  clear: () => {},
  hasMessage: () => false,
  getValue: () => [],
  setErrorMessage: () => {},
  setSaveMessage: () => {},
  checkSaveMessage: () => {},
})

const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  type TData = {
    title: string
    message: string
    type: TDataType
  }
  const [data, setData] = useState<TData>({
    title: "",
    message: "",
    type: "",
  })
  const [save, setSave] = useState<TData>({
    title: "",
    message: "",
    type: "",
  })

  const clear = () => setData({ title: "", message: "", type: "" })
  const hasMessage = () => !!data.title && !!data.message && !!data.type
  const getValue = () => [data.title, data.message, data.type]
  const setErrorMessage = (title: string, message: string) =>
    setData({ title, message, type: "is-danger" })
  const setSaveMessage = (title: string, message: string, type: TDataType) =>
    setSave({ title, message, type })

  const checkSaveMessage = () => {
    const { title, message, type } = save

    if (!!title && !!message && !!type) {
      setData({ title, message, type })
    }

    setSave({ title: "", message: "", type: "" })
  }

  return (
    <NotificationContext.Provider
      value={{
        clear,
        hasMessage,
        getValue,
        setErrorMessage,
        setSaveMessage,
        checkSaveMessage,
      }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
export { NotificationProvider }
