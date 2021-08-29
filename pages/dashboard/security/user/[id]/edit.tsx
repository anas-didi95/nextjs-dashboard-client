import { useRouter } from "next/dist/client/router"
import React from "react"
import Button from "../../../../../src/components/Button"
import ButtonGroup from "../../../../../src/components/ButtonGroup"
import Card from "../../../../../src/components/Card"
import AppLayout from "../../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../../src/layouts/DashboardLayout"
import useConstants from "../../../../../src/utils/hooks/useConstants"

const SecurityUserEditPage: React.FC<{}> = () => (
  <AppLayout title="Security - User Edit" needAuth>
    <DashboardLayout breadcrumbs={["Security", "User", "Edit"]}>
      <UserFormCard />
      <br />
      <ActionButton />
    </DashboardLayout>
  </AppLayout>
)

const UserFormCard: React.FC<{}> = () => {
  const constants = useConstants()
  const router = useRouter()
  const { id } = router.query

  return (
    <Card title={constants.header.userForm}>
      <div>id: {id}</div>
    </Card>
  )
}

const ActionButton: React.FC<{}> = () => {
  const constants = useConstants()
  const router = useRouter()

  const onBack = () => router.back()

  return (
    <ButtonGroup align="is-right">
      <Button label={constants.button.back} onClick={onBack} type="button" color="is-primary" />
    </ButtonGroup>
  )
}

export default SecurityUserEditPage
