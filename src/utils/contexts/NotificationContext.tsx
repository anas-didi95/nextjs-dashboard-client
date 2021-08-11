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
  setMessage: (state: TState) => {},
  hasMessage: () => false,
})

const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer<Reducer<TState, TAction>>(
    (state: TState, action: TAction) => {
      const { type } = action
      switch (type) {
        case "SET_MESSAGE":
          return { ...action }
      }
    },
    initialState
  )

  const setMessage = (state: TState) =>
    dispatch({ ...state, type: "SET_MESSAGE" })
  const hasMessage = () =>
    !!state.title && !!state.message && !!state.messageType

  return (
    <NotificationContext.Provider value={{ state, setMessage, hasMessage }}>
      {children}
    </NotificationContext.Provider>
  )
}

const useNotificationContext = () => useContext(NotificationContext)

export { NotificationProvider, useNotificationContext }

type TContext = {
  state: TState
  setMessage: (state: TState) => void
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
  type: "SET_MESSAGE"
  title: string
  message: string
  messageType: TType
  errors: string[]
}
