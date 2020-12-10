import React, { ReactNode } from "react"

interface IAppLayout {
  children: ReactNode
}

const AppLayout: React.FC<IAppLayout> = ({ children }) => <>{children}</>

export default AppLayout
