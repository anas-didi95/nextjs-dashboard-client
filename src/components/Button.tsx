import React from "react"

interface IButton {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  type: "button" | "submit"
  label: string
  color?: "is-light" | "is-primary" | "is-danger"
  isOutlined?: boolean
  isInverted?: boolean
}

const Button: React.FC<IButton> = ({
  type,
  color,
  isOutlined,
  isInverted,
  label,
  onClick,
}) => (
    <button
      type={type}
      className={`button ${!!color && color} ${isOutlined && "is-outlined"} ${isInverted && "is-inverted"
        }`}
      onClick={onClick}>
      {label}
    </button>
  )

export default Button
