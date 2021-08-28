import React from "react"
import { useRouter } from "next/dist/client/router"
import Card from "../../../../../src/components/Card"
import AppLayout from "../../../../../src/layouts/AppLayout"
import useConstants from "../../../../../src/utils/hooks/useConstants"
import DashboardLayout from "../../../../../src/layouts/DashboardLayout"
import { useEffect } from "react"
import LabelValue from "../../../../../src/components/LabelValue"

const SecurityUserSummaryPage: React.FC<{}> = () => (
  <AppLayout title="Security - User Summary" needAuth>
    <DashboardLayout breadcrumbs={["Security", "User", "Summary"]}>
      <UserSummaryCard />
    </DashboardLayout>
  </AppLayout>
)

const UserSummaryCard: React.FC<{}> = () => {
  const constants = useConstants()
  const router = useRouter()
  const { id } = router.query

  return (
    <Card title={constants.header.userSummary} testId="user-summary-car d">
      <div className="columns is-multiline is-variable is-4">
        <div className="column is-6">
          <LabelValue label={constants.label.username}>
            username
          </LabelValue>
        </div>
        <div className="column is-6">
          <LabelValue label={constants.label.fullName}>
            username
          </LabelValue>
        </div>
        <div className="column is-6">
          <LabelValue label={constants.label.email}>
            username
          </LabelValue>
        </div>
        <div className="column is-6">
          <LabelValue label={constants.label.version}>
            username
          </LabelValue>
        </div>
      </div>
    </Card>
  )
}

export default SecurityUserSummaryPage
