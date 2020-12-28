import React, { createContext, ReactNode, useContext, useState } from "react"

interface ILoadingContext {
  isLoading: () => boolean
  onLoading: () => void
  offLoading: () => void
}
const LoadingContext = createContext<ILoadingContext>({
  isLoading: () => false,
  onLoading: () => { },
  offLoading: () => { },
})

const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const isLoading = () => loading
  const onLoading = () => setLoading(true)
  const offLoading = () => setLoading(false)

  return (
    <LoadingContext.Provider value={{ isLoading, onLoading, offLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}
const useLoadingContext = () => useContext(LoadingContext)

export { LoadingProvider, useLoadingContext }
