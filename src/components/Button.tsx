import React from "react"

interface IButton {
  label: string
  type: "button" | "submit"
  color?: "is-primary"
  testId?: string
}
const Button: React.FC<IButton> = ({ label, type, color, testId }) => (
  <button
    type={type}
    className={`button ${!!color ? color : ""}`}
    data-testid={testId}>
    {label}
  </button>
)

export default Button
