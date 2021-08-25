import React from "react"

interface ITag {
  value: string
  color: "is-success" | "is-warning" | "is-danger"
}
const Tag: React.FC<ITag> = ({ value, color }) => (
  <span className={`tag is-medium is-rounded ${color}`}>{value}</span>
)

export default Tag
