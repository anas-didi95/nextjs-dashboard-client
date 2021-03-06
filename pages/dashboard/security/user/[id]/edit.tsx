import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Button from "../../../../../src/components/Button"
import ButtonGroup from "../../../../../src/components/ButtonGroup"
import ButtonLink from "../../../../../src/components/ButtonLink"
import Card from "../../../../../src/components/Card"
import Form from "../../../../../src/components/Form"
import FormCheckBox from "../../../../../src/components/FormCheckbox"
import FormInput from "../../../../../src/components/FormInput"
import LabelValue from "../../../../../src/components/LabelValue"
import Notification from "../../../../../src/components/Notification"
import AppLayout from "../../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../../src/layouts/DashboardLayout"
import { useLoadingContext } from "../../../../../src/utils/contexts/LoadingContext"
import { useNotificationContext } from "../../../../../src/utils/contexts/NotificationContext"
import useConstants from "../../../../../src/utils/hooks/useConstants"
import useSecurityService, {
  blankTUser,
  TPermission,
  TUser,
} from "../../../../../src/utils/hooks/useSecurityService"

const SecurityUserEditPage: React.FC<{}> = () => (
  <AppLayout title="Security - User Edit" needAuth={true}>
    <DashboardLayout breadcrumbs={["Security", "User", "Edit"]}>
      <UserEditForm />
      <br />
      <ActionButton />
    </DashboardLayout>
  </AppLayout>
)

const UserEditForm: React.FC<{}> = () => {
  type TForm = {
    email: string
    fullName: string
    telegramId: string
    permissions: string[]
  }
  const [user, setUser] = useState<TUser>(blankTUser)
  const { register, handleSubmit, errors, setValue, reset } = useForm<TForm>()
  const securityService = useSecurityService()
  const constants = useConstants()
  const router = useRouter()
  const { id } = router.query
  const notificationContext = useNotificationContext()
  const loadingContext = useLoadingContext()
  const [permissions, setPermissions] = useState<TPermission[]>()

  const onUpdate = async (data: TForm) => {
    if (!!data.permissions) {
      data.permissions = data.permissions.filter((permission) => !!permission)
    } else {
      data.permissions = []
    }
    const updateUser: TUser = {
      id: user.id,
      email: data.email,
      fullName: data.fullName,
      lastModifiedDate: "",
      password: "",
      telegramId: data.telegramId,
      username: user.username,
      version: user.version,
      permissions: data.permissions,
      lastModifiedBy: {
        id: "",
        username: "",
        fullName: "",
      },
    }

    notificationContext.clear()
    loadingContext.onLoading()
    const responseBody = await securityService.updateUser(updateUser)
    loadingContext.offLoading()

    if (responseBody.status.isSuccess) {
      notificationContext.setSaveMessage(
        "Update user succeed.",
        responseBody.status.message,
        "is-success",
        []
      )
      router.replace(`/dashboard/security/user/${id}/summary`)
    } else {
      console.error("[SecurityUserEditPage] responseBody", responseBody)
      notificationContext.setErrorMessage(
        "Update user failed!",
        responseBody.status.message,
        responseBody.data.errorList ?? []
      )
    }
  }

  const onClear = () => reset()

  useEffect(() => {
    ;(async () => {
      loadingContext.onLoading()
      const permissions = await securityService.getPermissionList()
      const user = await securityService.getUserById(id as string)
      loadingContext.offLoading()

      setPermissions(permissions)
      setUser(user)
      setValue("email", user.email)
      setValue("fullName", user.fullName)
      setValue("telegramId", user.telegramId)
      setValue("permissions", user.permissions)
    })()
  }, [])

  return (
    <Card title={constants.header.userEdit}>
      <Form onSubmit={handleSubmit(onUpdate)}>
        <div className="columns is-multiline is-variable is-4">
          <div className="column is-6">
            <LabelValue label={constants.label.username}>
              {user.username}
            </LabelValue>
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
              register={register}
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
                    name={`permissions[${i}]`}
                    register={register()}
                    value={permission.id}
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
            label={constants.button.update}
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

export default SecurityUserEditPage
