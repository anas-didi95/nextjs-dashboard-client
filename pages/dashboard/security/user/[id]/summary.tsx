import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import ButtonGroup from "../../../../../src/components/ButtonGroup"
import ButtonLink from "../../../../../src/components/ButtonLink"
import Card from "../../../../../src/components/Card"
import LabelValue from "../../../../../src/components/LabelValue"
import AppLayout from "../../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../../src/layouts/DashboardLayout"
import useConstants from "../../../../../src/utils/hooks/useConstants"
import useSecurityService, { TUser } from "../../../../../src/utils/hooks/useSecurityService"

const SecurityUserSummaryPage: React.FC<{}> = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <AppLayout title="Security - User Summary" needAuth={true}>
      <DashboardLayout breadcrumbs={["Security", "User", "Summary"]}>
        <UserSummaryForm id={id as string} />
        <br />
        <ActionButton />
      </DashboardLayout>
    </AppLayout>
  )
}

const UserSummaryForm: React.FC<{ id: string }> = ({ id }) => {
  const [user, setUser] = useState<TUser>({
    email: "",
    fullName: "",
    id: "",
    password: "",
    telegramId: "",
    username: "",
    lastModifiedDate: "",
    version: -1
  })
  const securityService = useSecurityService()

  useEffect(() => {
    (async () => {
      const user = await securityService.getUserById(id)
      setUser(user)
    })()
  }, [])

  return (
    <Card title="User Summary">
      <div className="columns is-multiline is-variable is-4">
        <div className="column is-6">
          <LabelValue label="Username">{user.username}</LabelValue>
        </div>
        <div className="column is-6">
          <LabelValue label="Email">{user.email}</LabelValue>
        </div>
        <div className="column is-6">
          <LabelValue label="Full Name">{user.fullName}</LabelValue>
        </div>
        <div className="column is-6">
          <LabelValue label="Telegram Id">{user.telegramId}</LabelValue>
        </div>
        <div className="column is-6">
          <LabelValue label="Last Modified Date">{user.lastModifiedDate}</LabelValue>
        </div>
        <div className="column is-6">
          <LabelValue label="Version">{user.version}</LabelValue>
        </div>
      </div>
    </Card>
  )
}

const ActionButton: React.FC<{}> = () => {
  const constants = useConstants()

  return (
    <ButtonGroup align="is-right">
      <ButtonLink
        href="/dashboard/security/user/list"
        label={constants.button.back}
        color="is-primary"
      />
    </ButtonGroup>
  )
}



export default SecurityUserSummaryPage
