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
  messageType: "",
  errors: [],
}

const NotificationContext = createContext<TContext>({
  state: initialState,
  setError: (title: string, message: string, errors: string[]) => {},
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
          const { title, message, errors } = action
          return { title, message, errors, messageType: "is-danger" }
      }
    },
    initialState
  )

  const setError = (title: string, message: string, errors: string[]) =>
    dispatch({ type: "SET_ERROR", errors, message, title })
  const hasMessage = () =>
    !!state.title && !!state.message && !!state.messageType

  return (
    <NotificationContext.Provider value={{ state, setError, hasMessage }}>
      {children}
    </NotificationContext.Provider>
  )
}

const useNotificationContext = () => useContext(NotificationContext)

export { NotificationProvider, useNotificationContext }

type TContext = {
  state: TState
  setError: (title: string, message: string, errors: string[]) => void
  hasMessage: () => boolean
}
type TType = "is-danger" | ""
type TState = {
  title: string
  message: string
  messageType: TType
  errors: string[]
}
type TAction = {
  type: "SET_ERROR"
  title: string
  message: string
  errors: string[]
}
