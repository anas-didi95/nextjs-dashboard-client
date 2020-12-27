import { useRouter } from "next/router"
import React from "react"
import AppLayout from "../../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../../src/layouts/DashboardLayout"

const SecurityUserSummaryPage: React.FC<{}> = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <AppLayout title="Security - User Summary" needAuth={true}>
      <DashboardLayout breadcrumbs={["Security", "User", "Summary"]}>
        <div>id: {id}</div>
      </DashboardLayout>
    </AppLayout>
  )
}

export default SecurityUserSummaryPage
