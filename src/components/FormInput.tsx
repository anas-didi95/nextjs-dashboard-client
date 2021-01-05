import React from "react"
import { useLoadingContext } from "../utils/contexts/LoadingContext"

interface IFormInput {
  register: any
  name: string
  type: "text" | "password" | "email"
  label: string
  error?: string
}

const FormInput: React.FC<IFormInput> = ({
  name,
  register,
  type,
  label,
  error,
}) => {
  const loadingContext = useLoadingContext()

  return (
    <div className="field">
      <label className="label">{label}</label>
      <div
        className={`control ${loadingContext.isLoading() ? "is-loading" : ""}`}>
        <input
          className={`input ${!!error ? "is-danger" : "is-hovered"}`}
          type={type}
          name={name}
          ref={register}
          readOnly={loadingContext.isLoading()}
        />
      </div>
      {!!error && <p className="help is-danger">{error}</p>}
    </div>
  )
}

export default FormInput
