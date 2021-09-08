import React from "react"
import ButtonGroup from "../../../../src/components/ButtonGroup"
import ButtonLink from "../../../../src/components/ButtonLink"
import Card from "../../../../src/components/Card"
import AppLayout from "../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../src/layouts/DashboardLayout"
import useConstants from "../../../../src/utils/hooks/useConstants"

const SecurityUserCreatePage: React.FC<{}> = () => (
  <AppLayout title="Security - User Create" needAuth>
    <DashboardLayout breadcrumbs={["Security", "User", "Create"]}>
      <UserFormCard />
      <br />
      <ActionButton />
    </DashboardLayout>
  </AppLayout>
)

const UserFormCard: React.FC<{}> = () => {
  const constants = useConstants()

  return (
    <Card title={constants.header.userForm}>
      <div>Create user</div>
    </Card>
  )
}

const ActionButton: React.FC<{}> = () => {
  const constants = useConstants()

  return (
    <ButtonGroup align="is-right">
      <ButtonLink
        href="/dashboard/security/user"
        label={constants.button.back}
        color="is-primary"
      />
    </ButtonGroup>
  )
}

export default SecurityUserCreatePage
