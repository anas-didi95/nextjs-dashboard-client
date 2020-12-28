import { useRouter } from "next/router"
import React from "react"
import ButtonGroup from "../../../../../src/components/ButtonGroup"
import ButtonLink from "../../../../../src/components/ButtonLink"
import Card from "../../../../../src/components/Card"
import AppLayout from "../../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../../src/layouts/DashboardLayout"

const SecurityUserEditPage: React.FC<{}> = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <AppLayout title="Security - User Edit" needAuth={true}>
      <DashboardLayout breadcrumbs={["Security", "User", "Edit"]}>
        <UserEditForm id={id as string} />
        <br />
        <ActionButton id={id as string} />
      </DashboardLayout>
    </AppLayout>
  )
}

const UserEditForm: React.FC<{ id: string }> = ({ id }) => {
  return (
    <Card title="User Edit">
      {id}
    </Card>
  )
}

const ActionButton: React.FC<{ id: string }> = ({ id }) => (
  <ButtonGroup align="is-right">
    <ButtonLink href={`/dashboard/security/user/${id}/summary`} label="Back" color="is-primary" />
  </ButtonGroup>
)

export default SecurityUserEditPage
