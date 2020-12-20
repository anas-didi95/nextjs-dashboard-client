import React from "react"
import Breadcrumb from "../../src/components/Breadcrumb"
import Card from "../../src/components/Card"
import Navbar from "../../src/components/Navbar"
import AppLayout from "../../src/layouts/AppLayout"
import DashboardLayout from "../../src/layouts/DashboardLayout"

const DashboardPage: React.FC<{}> = () => (
  <AppLayout title="Home" needAuth={true}>
    <DashboardLayout breadcrumbs={["Home"]}>
      <Card title="Title">
        <p>Hello world</p>
      </Card>
    </DashboardLayout>
  </AppLayout>
)

export default DashboardPage
