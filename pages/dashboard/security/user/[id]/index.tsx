import { useRouter } from "next/dist/client/router"
import React, { useEffect, useState } from "react"
import Button from "../../../../../src/components/Button"
import ButtonGroup from "../../../../../src/components/ButtonGroup"
import ButtonLink from "../../../../../src/components/ButtonLink"
import Card from "../../../../../src/components/Card"
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

const SecurityUserSummaryPage: React.FC<{}> = () => (
  <AppLayout title="Security - User Summary" needAuth>
    <DashboardLayout breadcrumbs={["Security", "User", "Summary"]}>
      <UserSummaryCard />
      <br />
      <ActionButton />
    </DashboardLayout>
  </AppLayout>
)

const UserSummaryCard: React.FC<{}> = () => {
  const constants = useConstants()
  const router = useRouter()
  const authContext = useAuthContext()
  const notificationContext = useNotificationContext()
  const loadingContext = useLoadingContext()
  const securityService = useSecurityService()
  const { id } = router.query
  const [user, setUser] = useState<TUser>(initialUser)

  useEffect(() => {
    const request = async (
      retry: number = 1,
      accessToken: string = authContext.getAccessToken()
    ) => {
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
    <Card title={constants.header.userSummary} testId="user-summary-car d">
      {!loadingContext.isLoading() ? (
        <>
          <div className="columns is-multiline is-variable is-4">
            <div className="column is-6">
              <LabelValue label={constants.label.username}>
                {user.username}
              </LabelValue>
            </div>
            <div className="column is-6">
              <LabelValue label={constants.label.fullName}>
                {user.fullName}
              </LabelValue>
            </div>
            <div className="column is-6">
              <LabelValue label={constants.label.email}>
                {user.email}
              </LabelValue>
            </div>
            <div className="column is-6">
              <LabelValue label={constants.label.permissions}>
                [{user.permissions}]
              </LabelValue>
            </div>
            <div className="column is-6">
              <LabelValue label={constants.label.telegramId}>
                {user.telegramId}
              </LabelValue>
            </div>
            <div className="column is-6">
              <LabelValue label={constants.label.version}>
                {user.version}
              </LabelValue>
            </div>
            <div className="column is-6">
              <LabelValue label={constants.label.lastModifiedBy}>
                {user.lastModifiedBy.username ?? user.lastModifiedBy.id}
              </LabelValue>
            </div>
            <div className="column is-6">
              <LabelValue label={constants.label.lastModifiedDate}>
                {user.lastModifiedDate}
              </LabelValue>
            </div>
          </div>
          <br />
          <ButtonGroup align="is-right">
            {authContext.getClaim().userId !== id && (
              <Button
                label={constants.button.delete}
                color="is-danger"
                type="button"
                onClick={() => { }}
              />
            )}
            <ButtonLink
              href={`/dashboard/security/user/${id}/edit`}
              label={constants.button.edit}
              color="is-success"
            />
          </ButtonGroup>
        </>
      ) : (
        <Loader />
      )}
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

export default SecurityUserSummaryPage
