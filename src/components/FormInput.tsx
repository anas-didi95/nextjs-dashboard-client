import React from "react"

interface IFormInput {
  register: any
  label: string
  type: "text" | "password"
  error?: string
  testidLabel?: string
  testidInput?: string
  testidError?: string
}
const FormInput: React.FC<IFormInput> = ({
  register,
  label,
  type,
  error,
  testidLabel,
  testidInput,
  testidError,
}) => (
  <div className="field">
    <label className="label" data-testid={testidLabel}>
      {label}
    </label>
    <div className="control">
      <input
        {...register}
        className={`input is-hovered ${!!error ? "is-danger" : ""}`}
        type={type}
        data-testid={testidInput}
      />
    </div>
    {!!error && (
      <p className="help is-danger" data-testid={testidError}>
        {error}
      </p>
    )}
  </div>
)

export default FormInput
