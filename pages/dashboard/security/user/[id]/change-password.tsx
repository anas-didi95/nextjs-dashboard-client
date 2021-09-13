import { useRouter } from "next/dist/client/router"
import React from "react"
import ButtonGroup from "../../../../../src/components/ButtonGroup"
import ButtonLink from "../../../../../src/components/ButtonLink"
import AppLayout from "../../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../../src/layouts/DashboardLayout"
import useConstants from "../../../../../src/utils/hooks/useConstants"

const SecurityUserChangePassword: React.FC<{}> = () => (
  <AppLayout title="Security - User Change Password" needAuth>
    <DashboardLayout breadcrumbs={["Security", "User", "Change Password"]}>
      <ChangePasswordCard />
      <br />
      <ActionButton />
    </DashboardLayout>
  </AppLayout>
)

const ChangePasswordCard: React.FC<{}> = () => {
  return <div>Change password</div>
}

const ActionButton: React.FC<{}> = () => {
  const constants = useConstants()
  const router = useRouter()
  const { id } = router.query

  return (
    <ButtonGroup align="is-right">
      <ButtonLink
        label={constants.button.back}
        color="is-primary"
        href={`/dashboard/security/user/${id}`}
      />
    </ButtonGroup>
  )
}

export default SecurityUserChangePassword
