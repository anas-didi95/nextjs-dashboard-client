import React from "react"

interface IBreadcrumb {
  paths: string[]
}
const Breadcrumb: React.FC<IBreadcrumb> = ({ paths }) => (
  <nav className="breadcrumb is-medium" aria-label="breadcrumbs">
    <ul>
      <li></li>
      {paths.map((path, i) => (
        <li key={path} className={`${(i + 1) === paths.length ? "is-active" : ""}`}><a href="#">{path}</a></li>
      ))}
    </ul>
  </nav>
)

export default Breadcrumb
