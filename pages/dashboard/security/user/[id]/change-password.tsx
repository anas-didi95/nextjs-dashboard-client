import React from "react"
import AppLayout from "../../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../../src/layouts/DashboardLayout"

const SecurityUserChangePassword: React.FC<{}> = () => (
  <AppLayout title="Security - User Change Password" needAuth>
    <DashboardLayout breadcrumbs={["Security", "User", "Change Password"]}>
      <div>Change password</div>
    </DashboardLayout>
  </AppLayout>
)

export default SecurityUserChangePassword
