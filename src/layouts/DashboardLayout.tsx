import React, { ReactNode } from "react"
import Breadcrumb from "../components/Breadcrumb"

interface IDashboardLayout {
  children: ReactNode
  breadcrumbs: string[]
}
const DashboardLayout: React.FC<IDashboardLayout> = ({ children, breadcrumbs }) => (
  <section className="section">
    <article className="container">
      <div className="columns is-centered">
        <div className="column is-9">
          <Breadcrumb breadcrumbs={breadcrumbs} />
          <br />
          {children}
        </div>
      </div>
    </article>
  </section>
)

export default DashboardLayout
