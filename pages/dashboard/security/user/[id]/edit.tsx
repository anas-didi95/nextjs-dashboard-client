import { useRouter } from "next/dist/client/router"
import React from "react"
import ButtonGroup from "../../../../../src/components/ButtonGroup"
import ButtonLink from "../../../../../src/components/ButtonLink"
import Card from "../../../../../src/components/Card"
import FormInput from "../../../../../src/components/FormInput"
import LabelValue from "../../../../../src/components/LabelValue"
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
      <form>
        <div className="columns is-multiline is-variable is-4">
          <div className="column is-6">
            <LabelValue label={constants.label.username}>username</LabelValue>
          </div>
          <div className="column is-6">
            <FormInput label={constants.label.fullName} register={null} type="text" />
          </div>
          <div className="column is-6">
            <FormInput label={constants.label.email} register={null} type="text" />
          </div>
          <div className="column is-6">
            <FormInput label={constants.label.permissions} register={null} type="text" />
          </div>
          <div className="column is-6">
            <FormInput label={constants.label.telegramId} register={null} type="text" />
          </div>
        </div>
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
        href={`/dashboard/security/user/${id}`}
        label={constants.button.back}
        color="is-primary"
      />
    </ButtonGroup>
  )
}

export default SecurityUserEditPage
