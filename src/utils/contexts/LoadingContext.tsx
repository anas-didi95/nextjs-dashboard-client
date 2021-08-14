import React, { createContext, ReactNode, useContext, useState } from "react"

const LoadingContext = createContext<TContext>({
  isLoading: () => false,
  run: async (callback) => { },
})

const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const isLoading = () => loading
  const run = async (callback: () => Promise<void>) => {
    setLoading(true)
    await callback()
    setLoading(false)
  }

  return (
    <LoadingContext.Provider value={{ isLoading, run }}>
      {children}
    </LoadingContext.Provider>
  )
}

const useLoadingContext = () => useContext(LoadingContext)

export { LoadingProvider, useLoadingContext }

type TContext = {
  isLoading: () => boolean
  run: (callback: () => Promise<void>) => Promise<void>
}
