import React, {
  createContext,
  ReactNode,
  Reducer,
  useContext,
  useReducer,
} from "react"
import { TResponseError } from "../types"

const initialState: TState = {
  message: "",
  code: "",
  traceId: "",
  messageType: "",
  errors: [],
  detail: "",
}

const NotificationContext = createContext<TContext>({
  state: initialState,
  setError: (error) => {},
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
          const { message, code, traceId, errors, detail } =
            action as TActionSetError
          return {
            message,
            errors,
            code,
            traceId,
            detail,
            messageType: "is-danger",
          }
        case "CLEAR":
          return initialState
      }
    },
    initialState
  )

  const setError = (error: TResponseError) => {
    const { code, errors, message, traceId } = error
    if (errors.length > 1) {
      dispatch({
        code,
        errors,
        message,
        traceId,
        type: "SET_ERROR",
        detail: "",
      })
    } else {
      dispatch({
        code,
        message,
        traceId,
        type: "SET_ERROR",
        errors: [],
        detail: errors[0],
      })
    }
  }
  const clear = () => dispatch({ type: "CLEAR" })
  const hasMessage = () => !!state.message && !!state.messageType

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
  setError: (error: TResponseError) => void
  clear: () => void
  hasMessage: () => boolean
}
type TType = "is-danger" | ""
type TState = {
  message: string
  code: string
  traceId: string
  messageType: TType
  errors: string[]
  detail: string
}
type TAction = TActionSetError | TActionClear
type TActionSetError = {
  type: "SET_ERROR"
  message: string
  code: string
  traceId: string
  errors: string[]
  detail: string
}
type TActionClear = {
  type: "CLEAR"
}
