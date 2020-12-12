import React from "react"

interface IFormInput {
  type: "text" | "password"
  label: string
  error?: string
}

const FormInput: React.FC<IFormInput> = ({ type, label, error }) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <input
        className={`input ${!!error ? "is-danger" : "is-link"}`}
        type={type}
      />
    </div>
    {!!error && <p className="help is-danger">{error}</p>}
  </div>
)

export default FormInput