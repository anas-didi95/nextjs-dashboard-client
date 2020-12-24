import Link from "next/link"
import React from "react"
import Button from "../../../../src/components/Button"
import ButtonGroup from "../../../../src/components/ButtonGroup"
import Card from "../../../../src/components/Card"
import Form from "../../../../src/components/Form"
import AppLayout from "../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../src/layouts/DashboardLayout"

const SecurityUserCreatePage: React.FC<{}> = () => (
  <AppLayout title="Security - User Create" needAuth={true}>
    <DashboardLayout breadcrumbs={["Security", "User", "Create"]}>
      <UserCreateForm />
      <br />
      <ActionButton />
    </DashboardLayout>
  </AppLayout>
)

const UserCreateForm: React.FC<{}> = () => {
  const onSubmit = () => {
    console.log("On submit")
  }

  return (
    <Card title="User Form">
      <Form onSubmit={onSubmit}>
        <div className="columns is-multiline">
          <div className="column is-6"></div>
          <div className="column is-6">2</div>
          <div className="column is-6">3</div>
          <div className="column is-6">4</div>
        </div>
      </Form>
    </Card>
  )
}

const ActionButton: React.FC<{}> = () => (
  <ButtonGroup align="is-right">
    <Link href="/dashboard/security/user/list">
      <Button label="Back" onClick={null} type="button" color="is-primary" />
    </Link>
  </ButtonGroup>
)

export default SecurityUserCreatePage
