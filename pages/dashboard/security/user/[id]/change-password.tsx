import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Button from "../../../../../src/components/Button"
import ButtonGroup from "../../../../../src/components/ButtonGroup"
import ButtonLink from "../../../../../src/components/ButtonLink"
import Card from "../../../../../src/components/Card"
import Form from "../../../../../src/components/Form"
import FormInput from "../../../../../src/components/FormInput"
import AppLayout from "../../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../../src/layouts/DashboardLayout"
import { useLoadingContext } from "../../../../../src/utils/contexts/LoadingContext"
import { useNotificationContext } from "../../../../../src/utils/contexts/NotificationContext"
import useConstants from "../../../../../src/utils/hooks/useConstants"
import useSecurityService, { blankTUser, TUser } from "../../../../../src/utils/hooks/useSecurityService"

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
  const securityService = useSecurityService()
  const router = useRouter()
  const notificationContext = useNotificationContext()
  const loadingContext = useLoadingContext()
  const [user, setUser] = useState<TUser>(blankTUser)

  const onUpdate = async (data: TForm) => {
    const { id } = router.query
    const { oldPassword, newPassword } = data

    notificationContext.clear()
    loadingContext.onLoading()
    const responseBody = await securityService.changePassword(user, oldPassword, newPassword)
    loadingContext.offLoading()

    if (responseBody.status.isSuccess) {
      notificationContext.setSaveMessage("Operation completed.", responseBody.status.message, "is-success", [])
      router.replace(`/dashboard/security/user/${id}/summary`)
    } else {
      notificationContext.setErrorMessage("Operation failed!", responseBody.status.message, responseBody.data?.errorList ?? []);
    }
  }

  const onClear = () => reset()

  useEffect(() => {
    ; (async () => {
      const { id } = router.query

      loadingContext.onLoading()
      const user = await securityService.getUserById(id as string)
      loadingContext.offLoading()

      setUser(user)
    })()
  }, [])

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
