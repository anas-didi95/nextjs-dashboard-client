import React from "react"

interface ITag {
  color?: "is-success" | "is-warning"
  value: string
}
const Tag: React.FC<ITag> = ({ color, value }) => (
  <span className={`tag is-rounded has-text-weight-semibold ${!!color ? color : ""}`}>
    {value}
  </span>
)

export default Tag
