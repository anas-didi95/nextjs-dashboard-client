import { useRouter } from "next/router"
import React from "react"
import { useForm } from "react-hook-form"
import Button from "../../../../../src/components/Button"
import ButtonGroup from "../../../../../src/components/ButtonGroup"
import ButtonLink from "../../../../../src/components/ButtonLink"
import Card from "../../../../../src/components/Card"
import Form from "../../../../../src/components/Form"
import FormInput from "../../../../../src/components/FormInput"
import AppLayout from "../../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../../src/layouts/DashboardLayout"
import useConstants from "../../../../../src/utils/hooks/useConstants"

const SecurityUserChangePasswordPage: React.FC<{}> = () => (
  <AppLayout title="Change Password" needAuth={true}>
    <DashboardLayout breadcrumbs={["Security", "User", "Change Password"]}>
      <UserChangePasswordForm />
      <br />
      <ActionButton />
    </DashboardLayout>
  </AppLayout>
)

const UserChangePasswordForm: React.FC<{}> = () => {
  type TForm = {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  }
  const { handleSubmit, register, errors } = useForm<TForm>()

  const onUpdate = (data: TForm) => console.log("data", data)

  return (
    <Card title="User Change Password">
      <Form onSubmit={handleSubmit(onUpdate)}>
        <div className="columns is-multiline is-variable is-4">
          <div className="column is-6">
            <FormInput label="Old Password" name="oldPassword" type="password" error={errors.oldPassword?.message} register={register({})} />
          </div>
          <div className="column is-6">
            <FormInput label="New Password" name="newPassword" type="password" error={errors.newPassword?.message} register={register({})} />

          </div>
          <div className="column is-6" />
          <div className="column is-6">
            <FormInput label="Confirm Password" name="confirmPassword" type="password" error={errors.confirmPassword?.message} register={register({})} />
          </div>
        </div>
        <br />
        <ButtonGroup align="is-right">
          <Button label="Clear" onClick={() => { }} type="button" color="is-light" isInverted isOutlined />
          <Button label="Update" onClick={handleSubmit(onUpdate)} type="submit" color="is-success" />
        </ButtonGroup>
      </Form>
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
        href={`/dashboard/security/user/${id}/summary`}
        label={constants.button.back}
        color="is-primary"
      />
    </ButtonGroup>
  )
}
export default SecurityUserChangePasswordPage
