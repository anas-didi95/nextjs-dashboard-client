import { useRouter } from "next/dist/client/router"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import ButtonGroup from "../../../../../src/components/ButtonGroup"
import ButtonLink from "../../../../../src/components/ButtonLink"
import Card from "../../../../../src/components/Card"
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
  const { id } = router.query
  const [user, setUser] = useState<TUser>(initialUser)

  useEffect(() => {
    const request = async (retry: number = 1, accessToken: string = "") => {
      accessToken = accessToken || authContext.getAccessToken()
      const { responseBody, status } = await securityService.getUserById(
        id as string,
        accessToken
      )
      if (status === 200) {
        setUser(responseBody as TUser)
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
      {!loadingContext.isLoading() ? (
        <form>
          <div className="columns is-multiline is-variable is-4">
            <div className="column is-6">
              <LabelValue label={constants.label.username}>
                {user.username}
              </LabelValue>
            </div>
            <div className="column is-6">
              <FormInput
                label={constants.label.fullName}
                register={null}
                type="text"
              />
            </div>
            <div className="column is-6">
              <FormInput
                label={constants.label.email}
                register={null}
                type="text"
              />
            </div>
            <div className="column is-6">
              <FormInput
                label={constants.label.permissions}
                register={null}
                type="text"
              />
            </div>
            <div className="column is-6">
              <FormInput
                label={constants.label.telegramId}
                register={null}
                type="text"
              />
            </div>
          </div>
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
