import { useRouter } from "next/dist/client/router"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import Button from "../../../../../src/components/Button"
import ButtonGroup from "../../../../../src/components/ButtonGroup"
import ButtonLink from "../../../../../src/components/ButtonLink"
import Card from "../../../../../src/components/Card"
import FormCheckbox from "../../../../../src/components/FormCheckbox"
import FormInput from "../../../../../src/components/FormInput"
import LabelValue from "../../../../../src/components/LabelValue"
import Loader from "../../../../../src/components/Loader"
import AppLayout from "../../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../../src/layouts/DashboardLayout"
import { useAuthContext } from "../../../../../src/utils/contexts/AuthContext"
import { useLoadingContext } from "../../../../../src/utils/contexts/LoadingContext"
import { useNotificationContext } from "../../../../../src/utils/contexts/NotificationContext"
import useConstants from "../../../../../src/utils/hooks/useConstants"
import useSecurityService from "../../../../../src/utils/hooks/useSecurityService"
import {
  initialUser,
  TPermission,
  TResponseError,
  TUser,
} from "../../../../../src/utils/types"

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
  const authContext = useAuthContext()
  const notificationContext = useNotificationContext()
  const loadingContext = useLoadingContext()
  const securityService = useSecurityService()
  const router = useRouter()
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUser>({ defaultValues: initialUser })
  const [user, setUser] = useState<TUser>(initialUser)
  const [permissions, setPermissions] = useState<TPermission[]>([])

  const onSubmit = (data: TUser) => {
    if (!!data.permissions) {
      data.permissions = Array.isArray(data.permissions)
        ? data.permissions.filter((v) => !!v)
        : [data.permissions]
    } else {
      data.permissions = []
    }
    const request = async (retry: number = 1, accessToken: string = "") => {
      accessToken = accessToken || authContext.getAccessToken()
      const { responseBody, status } = await securityService.updateUser(
        data,
        accessToken
      )
      if (status === 200) {
        const { id } = responseBody as { id: string }
        if (id === authContext.getClaim().userId) {
          await authContext.refresh()
        }
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
    reset({ permissions: [] })
    notificationContext.clear()
  }

  useEffect(() => {
    const { id } = router.query
    const request = async (retry: number = 1, accessToken: string = "") => {
      accessToken = accessToken || authContext.getAccessToken()
      const user = await securityService.getUserById(id as string, accessToken)
      const permissions = await securityService.getPermissionList(accessToken)
      if (user.status === permissions.status && permissions.status === 200) {
        setUser(user.responseBody as TUser)
        setPermissions(permissions.responseBody as TPermission[])
      } else {
        const isRetry = user.status === 401 || permissions.status === 401
        if (isRetry && retry > 0) {
          accessToken = await authContext.refresh()
          await request(retry - 1, accessToken)
        } else {
          const responseBody =
            user.status !== 200 ? user.responseBody : permissions.responseBody
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

  useEffect(() => {
    setValue("id", user.id)
    setValue("version", user.version)
    setValue("fullName", user.fullName)
    setValue("email", user.email)
    setValue("permissions", user.permissions)
    setValue("telegramId", user.telegramId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <Card title={constants.header.userForm}>
      {!loadingContext.isLoading() ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="columns is-multiline is-variable is-4">
            <div className="column is-6">
              <LabelValue label={constants.label.username}>
                {user.username}
              </LabelValue>
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
                label={constants.label.email}
                type="text"
                error={errors.email?.message}
                register={register("email", {
                  required: constants.message.mandatoryField(
                    constants.label.email
                  ),
                })}
              />
            </div>
            <div className="column is-6">
              <LabelValue label={constants.label.permissions}>
                {!!permissions &&
                  permissions.length > 0 &&
                  permissions.map((permission) => (
                    <FormCheckbox
                      key={permission.id}
                      value={permission.id}
                      register={register(`permissions`)}
                    />
                  ))}
              </LabelValue>
            </div>
            <div className="column is-6">
              <FormInput
                label={constants.label.telegramId}
                type="text"
                error={errors.telegramId?.message}
                register={register("telegramId")}
              />
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
              label={constants.button.update}
              type="submit"
              color="is-success"
              onClick={handleSubmit(onSubmit)}
            />
          </ButtonGroup>
        </form>
      ) : (
        <Loader />
      )}
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
