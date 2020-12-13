import React from "react"

interface IFormInput {
  register: any
  name: string
  type: "text" | "password"
  label: string
  error?: string
}

const FormInput: React.FC<IFormInput> = ({ name, register, type, label, error }) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <input
        className={`input ${!!error ? "is-danger" : "is-link"}`}
        type={type}
        name={name}
        ref={register}
      />
    </div>
    {!!error && <p className="help is-danger">{error}</p>}
  </div>
)

export default FormInput
