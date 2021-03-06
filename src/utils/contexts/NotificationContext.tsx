import React, { createContext, ReactNode, useContext, useState } from "react"

type TDataType = "is-success" | "is-danger" | ""
type TData = {
  title: string
  message: string
  type: TDataType
  errorList: string[]
}
interface INotificationContext {
  clear: () => void
  hasMessage: () => boolean
  getValue: () => TData
  setErrorMessage: (title: string, message: string, errorList: string[]) => void
  setSaveMessage: (
    title: string,
    message: string,
    type: TDataType,
    errorList: string[]
  ) => void
  checkSaveMessage: () => void
}
const NotificationContext = createContext<INotificationContext>({
  clear: () => {},
  hasMessage: () => false,
  getValue: () => ({ errorList: [], message: "", title: "", type: "" }),
  setErrorMessage: () => {},
  setSaveMessage: () => {},
  checkSaveMessage: () => {},
})

const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<TData>({
    title: "",
    message: "",
    type: "",
    errorList: [],
  })
  const [save, setSave] = useState<TData>({
    title: "",
    message: "",
    type: "",
    errorList: [],
  })

  const clear = () =>
    setData({ title: "", message: "", type: "", errorList: [] })

  const hasMessage = () => !!data.title && !!data.message && !!data.type

  const getValue = () => ({ ...data })

  const setErrorMessage = (
    title: string,
    message: string,
    errorList: string[]
  ) => setData({ title, message, type: "is-danger", errorList })

  const setSaveMessage = (
    title: string,
    message: string,
    type: TDataType,
    errorList: string[]
  ) => setSave({ title, message, type, errorList })

  const checkSaveMessage = () => {
    const { title, message, type, errorList } = save

    if (!!title && !!message && !!type) {
      setData({ title, message, type, errorList })
    }

    setSave({ title: "", message: "", type: "", errorList: [] })
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
const useNotificationContext = () => useContext(NotificationContext)

export { NotificationProvider, useNotificationContext }
