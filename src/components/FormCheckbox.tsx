import React from "react"

interface IFormCheckbox {
  register: any
  value: string
}
const FormCheckbox: React.FC<IFormCheckbox> = ({ register, value }) => (
  <label className="checkbox" style={{ marginRight: "1rem" }}>
    <input {...register} type="checkbox" value={value} />
    <span style={{ marginLeft: "0.3rem" }}>{value}</span>
  </label>
)

export default FormCheckbox
