import React, { ReactNode } from "react"

interface IBox {
  children: ReactNode
}

const Box: React.FC<IBox> = ({ children }) => (
  <div className="box">{children}</div>
)

export default Box
