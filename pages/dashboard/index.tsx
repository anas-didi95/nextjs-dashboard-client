import React from "react"
import Navbar from "../../src/components/Navbar"
import AppLayout from "../../src/layouts/AppLayout"

const DashboardPage: React.FC<{}> = () => (
  <AppLayout title="Home" needAuth={true}>
    <section className="section">
      <article className="container">
        <p>Hello world</p>
      </article>
    </section>
  </AppLayout>
)

export default DashboardPage
