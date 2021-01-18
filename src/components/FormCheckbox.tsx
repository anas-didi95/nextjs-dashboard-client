import React from "react"

interface IFormCheckbox {
  value: string
}
const FormCheckBox: React.FC<IFormCheckbox> = ({ value }) => (
  <label className="checkbox" style={{ marginRight: "1rem" }}>
    <input type="checkbox" />
    <span style={{ marginLeft: "0.3rem" }}>{value}</span>
  </label>
)

export default FormCheckBox
