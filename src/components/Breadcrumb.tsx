import React from "react"

interface IBreadcrumb {
  breadcrumbs: string[]
}
const Breadcrumb: React.FC<IBreadcrumb> = ({ breadcrumbs }) => (
  <nav className="breadcrumb is-medium" aria-label="breadcrumbs">
    <ul>
      <li></li>
      {breadcrumbs.map((breadcrumb, i) => (
        <li
          key={breadcrumb}
          className={`${i + 1 === breadcrumbs.length ? "is-active" : ""}`}>
          <a href="#">{breadcrumb}</a>
        </li>
      ))}
    </ul>
  </nav>
)

export default Breadcrumb
