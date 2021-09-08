import { useRouter } from "next/dist/client/router"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Button from "../../../../src/components/Button"
import ButtonGroup from "../../../../src/components/ButtonGroup"
import ButtonLink from "../../../../src/components/ButtonLink"
import Card from "../../../../src/components/Card"
import FormCheckbox from "../../../../src/components/FormCheckbox"
import FormInput from "../../../../src/components/FormInput"
import LabelValue from "../../../../src/components/LabelValue"
import AppLayout from "../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../src/layouts/DashboardLayout"
import { useAuthContext } from "../../../../src/utils/contexts/AuthContext"
import { useLoadingContext } from "../../../../src/utils/contexts/LoadingContext"
import { useNotificationContext } from "../../../../src/utils/contexts/NotificationContext"
import useConstants from "../../../../src/utils/hooks/useConstants"
import useSecurityService from "../../../../src/utils/hooks/useSecurityService"
import { TPermission, TResponseError, TUser } from "../../../../src/utils/types"
import { handler } from "../../../api/hello"

const SecurityUserCreatePage: React.FC<{}> = () => (
  <AppLayout title="Security - User Create" needAuth>
    <DashboardLayout breadcrumbs={["Security", "User", "Create"]}>
      <UserFormCard />
      <br />
      <ActionButton />
    </DashboardLayout>
  </AppLayout>
)

const UserFormCard: React.FC<{}> = () => {
  const constants = useConstants()
  const authContext = useAuthContext()
  const notificationContext = useNotificationContext()
  const loadingContext = useLoadingContext()
  const securityService = useSecurityService()
  const router = useRouter()
  const [permissions, setPermissions] = useState<TPermission[]>([])
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUserForm>()

  const onSubmit = (data: TUserForm) => {
    if (!!data.permissions) {
      data.permissions = Array.isArray(data.permissions)
        ? data.permissions.filter((v) => !!v)
        : [data.permissions]
    }
    const request = async (
      retry: number = 1,
      accessToken: string = authContext.getAccessToken()
    ) => {
      const { responseBody, status } = await securityService.createUser(
        { ...data },
        accessToken
      )
      if (status === 201) {
        const { id } = responseBody as { id: string }
        router.replace(`/dashboard/security/user/${id}`)
      } else {
        if (status === 401 && retry > 0) {
          accessToken = await authContext.refresh()
          await request(retry - 1, accessToken)
        } else {
          notificationContext.setError(responseBody as TResponseError)
          if (retry === 0) {
            router.replace("/")
          }
        }
      }
    }
    loadingContext.run(request)
  }

  const onClear = () => {
    reset()
    notificationContext.clear()
  }

  useEffect(() => {
    const request = async (
      retry: number = 1,
      accessToken: string = authContext.getAccessToken()
    ) => {
      const { responseBody, status } = await securityService.getPermissionList(
        accessToken
      )
      if (status === 200) {
        setPermissions(responseBody as TPermission[])
      } else {
        if (status === 401 && retry > 0) {
          accessToken = await authContext.refresh()
          await request(retry - 1, accessToken)
        } else {
          notificationContext.setError(responseBody as TResponseError)
          if (retry === 0) {
            router.replace("/")
          }
        }
      }
    }
    loadingContext.run(request)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card title={constants.header.userForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="columns is-multiline is-variable is-4">
          <div className="column is-6">
            <FormInput
              label={constants.label.username}
              type="text"
              error={errors.username?.message}
              register={register("username", {
                required: constants.message.mandatoryField(
                  constants.label.username
                ),
              })}
            />
          </div>
          <div className="column is-6">
            <FormInput
              label={constants.label.fullName}
              type="text"
              error={errors.fullName?.message}
              register={register("fullName", {
                required: constants.message.mandatoryField(
                  constants.label.fullName
                ),
              })}
            />
          </div>
          <div className="column is-6">
            <FormInput
              label={constants.label.password}
              type="password"
              error={errors.password?.message}
              register={register("password", {
                required: constants.message.mandatoryField(
                  constants.label.password
                ),
              })}
            />
          </div>
          <div className="column is-6">
            <FormInput
              label={constants.label.confirmPassword}
              type="password"
              error={errors.confirmPassword?.message}
              register={register("confirmPassword", {
                validate: (value) =>
                  watch().password === value ||
                  constants.message.passwordNotMatched,
              })}
            />
          </div>
          <div className="column is-6">
            <FormInput
              label={constants.label.email}
              type="email"
              error={errors.email?.message}
              register={register("email", {
                required: constants.message.mandatoryField(
                  constants.label.email
                ),
              })}
            />
          </div>
          <div className="column is-6">
            <FormInput
              label={constants.label.telegramId}
              type="text"
              error={errors.telegramId?.message}
              register={register("telegramId")}
            />
          </div>
          <div className="column is-6">
            <LabelValue label={constants.label.permissions}>
              {!!permissions &&
                permissions.length > 0 &&
                permissions.map((permission, i) => (
                  <FormCheckbox
                    key={permission.id}
                    value={permission.id}
                    register={register(`permissions.${i}`)}
                  />
                ))}
            </LabelValue>
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
            onClick={onClear}
          />
          <Button
            label={constants.button.create}
            type="submit"
            color="is-success"
            onClick={handleSubmit(onSubmit)}
          />
        </ButtonGroup>
      </form>
    </Card>
  )
}

const ActionButton: React.FC<{}> = () => {
  const constants = useConstants()

  return (
    <ButtonGroup align="is-right">
      <ButtonLink
        href="/dashboard/security/user"
        label={constants.button.back}
        color="is-primary"
      />
    </ButtonGroup>
  )
}

export default SecurityUserCreatePage

type TUserForm = {
  username: string
  fullName: string
  password: string
  confirmPassword: string
  email: string
  telegramId: string
  permissions: string[]
}
