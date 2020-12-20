import React, { ReactNode } from "react"

interface ILabelValue {
  label: string
  children: ReactNode
}
const LabelValue: React.FC<ILabelValue> = ({ label, children }) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className="control">{children}</div>
  </div>
)

export default LabelValue
