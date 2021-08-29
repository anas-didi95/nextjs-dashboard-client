import React from "react"
import { useLoadingContext } from "../utils/contexts/LoadingContext"

interface IButton {
  label: string
  type: "button" | "submit"
  onClick: React.MouseEventHandler<HTMLButtonElement>
  color?: "is-primary" | "is-light" | "is-danger" | "is-success"
  isOutlined?: boolean
  isInverted?: boolean
  testId?: string
}
const Button: React.FC<IButton> = ({
  label,
  type,
  onClick,
  color,
  isOutlined,
  isInverted,
  testId,
}) => {
  const loadingContext = useLoadingContext()

  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${!!color ? color : ""} ${
        loadingContext.isLoading() ? "is-loading" : ""
      } ${isOutlined ? "is-outlined" : ""} ${isInverted ? "is-inverted" : ""}`}
      data-testid={testId}>
      {label}
    </button>
  )
}

export default Button
