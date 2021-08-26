import React from "react"
import AppLayout from "../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../src/layouts/DashboardLayout"

const SecurityUserListingPage: React.FC<{}> = () => (
  <AppLayout title="User Listing" needAuth>
    <DashboardLayout breadcrumbs={["Security", "User"]}>
      user listing page
    </DashboardLayout>
  </AppLayout>
)

export default SecurityUserListingPage
