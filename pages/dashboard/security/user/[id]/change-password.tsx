import { useRouter } from "next/dist/client/router"
import React from "react"
import Button from "../../../../../src/components/Button"
import ButtonGroup from "../../../../../src/components/ButtonGroup"
import ButtonLink from "../../../../../src/components/ButtonLink"
import Card from "../../../../../src/components/Card"
import FormInput from "../../../../../src/components/FormInput"
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
  const constants = useConstants()

  return (
    <Card title={constants.header.changePassword}>
      <form>
        <div className="columns is-multiline is-variable is-4">
          <div className="column is-6">
            <FormInput
              label={constants.label.oldPassword}
              type="password"
              register={null}
            />
          </div>
          <div className="column is-hidden-mobile" />
          <div className="column is-6">
            <FormInput
              label={constants.label.newPassword}
              type="password"
              register={null}
            />
          </div>
          <div className="column is-6">
            <FormInput
              label={constants.label.confirmPassword}
              type="password"
              register={null}
            />
          </div>
        </div>
        <br />
        <ButtonGroup align="is-right">
          <Button
            label={constants.button.clear}
            type="button"
            color="is-light"
            isInverted
            isOutlined
            onClick={() => {}}
          />
          <Button
            label={constants.button.changePassword}
            type="submit"
            color="is-success"
            onClick={() => {}}
          />
        </ButtonGroup>
      </form>
    </Card>
  )
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
