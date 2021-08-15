import React, {
  createContext,
  ReactNode,
  Reducer,
  useContext,
  useReducer,
} from "react"

const initialState: TState = {
  message: "",
  title: "",
  code: "",
  traceId: "",
  messageType: "",
  errors: [],
}

const NotificationContext = createContext<TContext>({
  state: initialState,
  setError: (
    title: string,
    message: string,
    code: string,
    traceId: string,
    errors: string[]
  ) => {},
  clear: () => {},
  hasMessage: () => false,
})

const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer<Reducer<TState, TAction>>(
    (state: TState, action: TAction) => {
      const { type } = action
      switch (type) {
        case "SET_ERROR":
          const { title, message, code, traceId, errors } =
            action as TActionSetError
          return {
            title,
            message,
            errors,
            code,
            traceId,
            messageType: "is-danger",
          }
        case "CLEAR":
          return initialState
      }
    },
    initialState
  )

  const setError = (
    title: string,
    message: string,
    code: string,
    traceId: string,
    errors: string[]
  ) => dispatch({ type: "SET_ERROR", title, message, code, traceId, errors })
  const clear = () => dispatch({ type: "CLEAR" })
  const hasMessage = () =>
    !!state.title && !!state.message && !!state.messageType

  return (
    <NotificationContext.Provider
      value={{ state, setError, clear, hasMessage }}>
      {children}
    </NotificationContext.Provider>
  )
}

const useNotificationContext = () => useContext(NotificationContext)

export { NotificationProvider, useNotificationContext }

type TContext = {
  state: TState
  setError: (
    title: string,
    message: string,
    code: string,
    traceId: string,
    errors: string[]
  ) => void
  clear: () => void
  hasMessage: () => boolean
}
type TType = "is-danger" | ""
type TState = {
  title: string
  message: string
  code: string
  traceId: string
  messageType: TType
  errors: string[]
}
type TAction = TActionSetError | TActionClear
type TActionSetError = {
  type: "SET_ERROR"
  title: string
  message: string
  code: string
  traceId: string
  errors: string[]
}
type TActionClear = {
  type: "CLEAR"
}
