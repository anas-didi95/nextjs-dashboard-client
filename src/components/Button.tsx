import React from "react"

interface IButton {
  type: "button" | "submit"
  label: string
  color?: "is-light" | "is-primary"
  isOutlined?: boolean
  isInverted?: boolean
}

const Button: React.FC<IButton> = ({
  type,
  color,
  isOutlined,
  isInverted,
  label,
}) => (
  <button
    type={type}
    className={`button ${!!color && color} ${isOutlined && "is-outlined"} ${
      isInverted && "is-inverted"
    }`}>
    {label}
  </button>
)

export default Button
