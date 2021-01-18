import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Button from "../../../../src/components/Button"
import ButtonGroup from "../../../../src/components/ButtonGroup"
import ButtonLink from "../../../../src/components/ButtonLink"
import Card from "../../../../src/components/Card"
import Form from "../../../../src/components/Form"
import FormCheckBox from "../../../../src/components/FormCheckbox"
import FormInput from "../../../../src/components/FormInput"
import LabelValue from "../../../../src/components/LabelValue"
import Notification from "../../../../src/components/Notification"
import AppLayout from "../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../src/layouts/DashboardLayout"
import { useLoadingContext } from "../../../../src/utils/contexts/LoadingContext"
import { useNotificationContext } from "../../../../src/utils/contexts/NotificationContext"
import useConstants from "../../../../src/utils/hooks/useConstants"
import useSecurityService, {
  Permission,
  TUser,
} from "../../../../src/utils/hooks/useSecurityService"

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
    permissions: string[]
  }
  const constants = useConstants()
  const { register, handleSubmit, errors, watch, reset } = useForm<TForm>()
  const securityService = useSecurityService()
  const router = useRouter()
  const notificationContext = useNotificationContext()
  const loadingContext = useLoadingContext()
  const [permissions, setPermissions] = useState<Permission[]>([])

  const onCreate = async (data: TUser) => {
    if (!!data.permissions) {
      data.permissions = data.permissions.filter((permission) => !!permission)
    } else {
      data.permissions = []
    }

    const user: TUser = {
      id: "",
      username: data.username,
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      telegramId: data.telegramId,
      lastModifiedDate: "",
      version: -1,
      permissions: data.permissions,
      lastModifiedBy: {
        id: "",
        username: "",
        fullName: "",
      },
    }

    notificationContext.clear()
    loadingContext.onLoading()
    const responseBody = await securityService.createUser(user)
    loadingContext.offLoading()

    if (responseBody.status.isSuccess) {
      notificationContext.setSaveMessage(
        "Create user succeed.",
        responseBody.status.message,
        "is-success"
      )
      router.replace(`/dashboard/security/user/${responseBody.data.id}/summary`)
    } else {
      console.error("[SecurityUserCreatePage] responseBody", responseBody)
      notificationContext.setErrorMessage(
        "Create user failed!",
        responseBody.status.message
      )
    }
  }

  const onClear = () => reset()

  useEffect(() => {
    ;(async () => {
      const permissions = await securityService.getPermissionList()
      setPermissions(permissions)
    })()
  }, [])

  return (
    <Card title={constants.header.userForm}>
      <Form onSubmit={handleSubmit(onCreate)}>
        <div className="columns is-multiline is-variable is-4">
          <div className="column is-6">
            <FormInput
              label={constants.label.username}
              name="username"
              register={register({
                required: constants.error.mandatoryField(
                  constants.label.username
                ),
              })}
              type="text"
              error={errors.username?.message}
            />
          </div>
          <div className="column is-6">
            <FormInput
              label={constants.label.email}
              name="email"
              register={register({
                required: constants.error.mandatoryField(constants.label.email),
              })}
              type="email"
              error={errors.email?.message}
            />
          </div>
          <div className="column is-6">
            <FormInput
              label={constants.label.password}
              name="password"
              register={register({
                required: constants.error.mandatoryField(
                  constants.label.password
                ),
              })}
              type="password"
              error={errors.password?.message}
            />
          </div>
          <div className="column is-6">
            <FormInput
              label={constants.label.confirmPassword}
              name="confirmPassword"
              register={register({
                validate: (value) =>
                  watch().password === value ||
                  constants.error.passwordNotMatched,
              })}
              type="password"
              error={errors.confirmPassword?.message}
            />
          </div>
          <div className="column is-6">
            <FormInput
              label={constants.label.fullName}
              name="fullName"
              register={register({
                required: constants.error.mandatoryField(
                  constants.label.fullName
                ),
              })}
              type="text"
              error={errors.fullName?.message}
            />
          </div>
          <div className="column is-6">
            <FormInput
              label={constants.label.telegramId}
              name="telegramId"
              register={register()}
              type="text"
              error={errors.telegramId?.message}
            />
          </div>
          <div className="column is-6">
            <LabelValue label={constants.label.permissions}>
              {!!permissions &&
                permissions.length > 0 &&
                permissions.map((permission, i) => (
                  <FormCheckBox
                    key={permission.id}
                    value={permission.id}
                    name={`permissions[${i}]`}
                    register={register()}
                  />
                ))}
            </LabelValue>
          </div>
        </div>
        <br />
        <ButtonGroup align="is-right">
          <Button
            label={constants.button.clear}
            onClick={onClear}
            type="button"
            color="is-light"
            isInverted
            isOutlined
          />
          <Button
            label={constants.button.create}
            onClick={handleSubmit(onCreate)}
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

  return (
    <ButtonGroup align="is-right">
      <ButtonLink
        href="/dashboard/security/user/list"
        label={constants.button.back}
        color="is-primary"
      />
    </ButtonGroup>
  )
}

export default SecurityUserCreatePage
