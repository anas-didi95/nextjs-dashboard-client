import React, { useContext } from "react"
import LoadingContext from "../utils/contexts/LoadingContext"

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
}) => {
  const loadingContext = useContext(LoadingContext)

  return (
    <button
      type={type}
      className={`button ${!!color && color} ${isOutlined && "is-outlined"} ${isInverted && "is-inverted"
        } ${loadingContext.isLoading() && "is-loading"}`}
      onClick={onClick}>
      {label}
    </button>
  )
}

export default Button
