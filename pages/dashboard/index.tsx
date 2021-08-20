import Link from "next/link"
import React from "react"
import AppLayout from "../../src/layouts/AppLayout"
import DashboardLayout from "../../src/layouts/DashboardLayout"

const HomePage: React.FC<{}> = () => (
  <AppLayout title="Home" needAuth>
    <DashboardLayout breadcrumbs={["Home"]}>
      <div>This is home <Link href="/dashboard/test">Navigate</Link></div>
    </DashboardLayout>
  </AppLayout>
)

export default HomePage
