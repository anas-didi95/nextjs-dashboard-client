import React from "react"

interface IFormCheckbox {
  value: string
  name: string
  register: any
}
const FormCheckBox: React.FC<IFormCheckbox> = ({ value, name, register }) => (
  <label className="checkbox" style={{ marginRight: "1rem" }}>
    <input type="checkbox" name={name} ref={register} value={value} />
    <span style={{ marginLeft: "0.3rem" }}>{value}</span>
  </label>
)

export default FormCheckBox
