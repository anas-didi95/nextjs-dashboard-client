import React from "react"

interface IFormInput {
  label: string
  type: "text" | "password"
  testidLabel?: string
}
const FormInput: React.FC<IFormInput> = ({ label, type, testidLabel }) => (
  <div className="field">
    <label className="label" data-testid={testidLabel}>
      {label}
    </label>
    <div className="control">
      <input className="input" type={type} />
    </div>
    <p className="help">This is a help text</p>
  </div>
)

export default FormInput
