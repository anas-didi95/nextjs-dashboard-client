import React from "react"
import Breadcrumb from "../../src/components/Breadcrumb"
import Navbar from "../../src/components/Navbar"
import AppLayout from "../../src/layouts/AppLayout"

const DashboardPage: React.FC<{}> = () => (
  <AppLayout title="Home" needAuth={true}>
    <section className="section">
      <article className="container">
        <div className="columns is-centered">
          <div className="column is-9">
            <Breadcrumb paths={["Home"]} />
          </div>
        </div>
      </article>
    </section>
  </AppLayout>
)

export default DashboardPage
