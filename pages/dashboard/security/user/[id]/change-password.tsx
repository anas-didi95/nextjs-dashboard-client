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
  <AppLayout title="Security - Change Password" needAuth={true}>
    <DashboardLayout breadcrumbs={["Security", "User", "Change Password"]}>
      <UserChangePasswordForm />
      <br />
      <ActionButton />
    </DashboardLayout>
  </AppLayout>
)

const UserChangePasswordForm: React.FC<{}> = () => {
  type TForm = {
    oldPassword: string
    newPassword: string
    confirmPassword: string
  }
  const constants = useConstants()
  const { handleSubmit, register, errors, watch, reset } = useForm<TForm>()

  const onUpdate = (data: TForm) => console.log("data", data)

  const onClear = () => reset()

  return (
    <Card title={constants.header.changePassword}>
      <Form onSubmit={handleSubmit(onUpdate)}>
        <div className="columns is-multiline is-variable is-4">
          <div className="column is-6">
            <FormInput
              label={constants.label.oldPassword}
              name="oldPassword"
              type="password"
              error={errors.oldPassword?.message}
              register={register({
                required: constants.error.mandatoryField(
                  constants.label.oldPassword
                ),
              })}
            />
          </div>
          <div className="column is-6">
            <FormInput
              label={constants.label.newPassword}
              name="newPassword"
              type="password"
              error={errors.newPassword?.message}
              register={register({
                required: constants.error.mandatoryField(
                  constants.label.newPassword
                ),
              })}
            />
          </div>
          <div className="column is-6" />
          <div className="column is-6">
            <FormInput
              label={constants.label.confirmPassword}
              name="confirmPassword"
              type="password"
              error={errors.confirmPassword?.message}
              register={register({
                required: constants.error.mandatoryField(
                  constants.label.confirmPassword
                ),
                validate: (value) =>
                  watch().newPassword === value ||
                  constants.error.passwordNotMatched,
              })}
            />
          </div>
        </div>
        <br />
        <ButtonGroup align="is-right">
          <Button
            label="Clear"
            onClick={onClear}
            type="button"
            color="is-light"
            isInverted
            isOutlined
          />
          <Button
            label="Update"
            onClick={handleSubmit(onUpdate)}
            type="submit"
            color="is-success"
          />
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
