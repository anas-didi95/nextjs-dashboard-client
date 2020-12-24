import Link from "next/link"
import React from "react"
import { useForm } from "react-hook-form"
import Button from "../../../../src/components/Button"
import ButtonGroup from "../../../../src/components/ButtonGroup"
import Card from "../../../../src/components/Card"
import Form from "../../../../src/components/Form"
import FormInput from "../../../../src/components/FormInput"
import AppLayout from "../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../src/layouts/DashboardLayout"
import { TUser } from "../../../../src/utils/hooks/useSecurityService"

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
  type TForm = {
    username: string
    email: string
    password: string
    confirmPassword: string
    fullName: string
    telegramId: string
  }
  const { register, handleSubmit, errors } = useForm<TForm>()

  const onCreate = (data: TUser) => {
    console.log("data: ", data)
  }

  return (
    <Card title="User Form">
      <Form onSubmit={handleSubmit(onCreate)}>
        <div className="columns is-multiline is-variable is-4">
          <div className="column is-6">
            <FormInput label="Username" name="username" register={register} type="text" error={errors.username?.message} />
          </div>
          <div className="column is-6">
            <FormInput label="Email" name="email" register={register} type="email" error={errors.email?.message} />
          </div>
          <div className="column is-6">
            <FormInput label="Password" name="password" register={register} type="password" error={errors.password?.message} />
          </div>
          <div className="column is-6">
            <FormInput label="Confirm Password" name="confirmPassword" register={register} type="password" error={errors.confirmPassword?.message} />
          </div>
          <div className="column is-6">
            <FormInput label="Full Name" name="fullName" register={register} type="text" error={errors.fullName?.message} />
          </div>
          <div className="column is-6">
            <FormInput label="Telegram Id" name="telegramId" register={register} type="text" error={errors.telegramId?.message} />
          </div>
        </div>
        <br />
        <ButtonGroup align="is-right">
          <Button label="Create" onClick={handleSubmit(onCreate)} type="submit" color="is-success" />
        </ButtonGroup>
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
