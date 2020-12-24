import React from "react"
import Card from "../../../../src/components/Card"
import Form from "../../../../src/components/Form"
import FormInput from "../../../../src/components/FormInput"
import AppLayout from "../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../src/layouts/DashboardLayout"

const SecurityUserCreatePage: React.FC<{}> = () => (
  <AppLayout title="Security - User Create">
    <DashboardLayout breadcrumbs={["Security", "User", "Create"]}>
      <UserCreateForm />
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

export default SecurityUserCreatePage
