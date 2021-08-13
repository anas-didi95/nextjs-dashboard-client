import React from "react"
import { useLoadingContext } from "../utils/contexts/LoadingContext"

interface IButton {
  label: string
  type: "button" | "submit"
  color?: "is-primary"
  testId?: string
}
const Button: React.FC<IButton> = ({ label, type, color, testId }) => {
  const loadingContext = useLoadingContext()

  return (
    <button
      type={type}
      className={`button ${!!color ? color : ""} ${
        loadingContext.isLoading() ? "is-loading" : ""
      }`}
      data-testid={testId}>
      {label}
    </button>
  )
}

export default Button
