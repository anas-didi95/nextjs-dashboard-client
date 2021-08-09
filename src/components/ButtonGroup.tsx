import React, { ReactNode } from "react"

interface IButtonGroup {
  children: ReactNode
  align?: "is-centered" | "is-right"
}
const ButtonGroup: React.FC<IButtonGroup> = ({ children, align }) => (
  <div className={`buttons ${!!align ? align : ""}`}>{children}</div>
)

export default ButtonGroup
