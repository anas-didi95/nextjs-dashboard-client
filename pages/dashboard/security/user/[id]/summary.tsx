import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import ButtonGroup from "../../../../../src/components/ButtonGroup"
import ButtonLink from "../../../../../src/components/ButtonLink"
import Card from "../../../../../src/components/Card"
import LabelValue from "../../../../../src/components/LabelValue"
import Notification from "../../../../../src/components/Notification"
import AppLayout from "../../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../../src/layouts/DashboardLayout"
import { useLoadingContext } from "../../../../../src/utils/contexts/LoadingContext"
import useConstants from "../../../../../src/utils/hooks/useConstants"
import useSecurityService, {
  TUser,
} from "../../../../../src/utils/hooks/useSecurityService"

const SecurityUserSummaryPage: React.FC<{}> = () => (
  <AppLayout title="Security - User Summary" needAuth={true}>
    <DashboardLayout breadcrumbs={["Security", "User", "Summary"]}>
      <Notification />
      <UserSummaryForm />
      <br />
      <ActionButton />
    </DashboardLayout>
  </AppLayout>
)

const UserSummaryForm: React.FC<{}> = () => {
  const router = useRouter()
  const { id } = router.query
  const constants = useConstants()
  const [user, setUser] = useState<TUser>({
    email: "",
    fullName: "",
    id: "",
    password: "",
    telegramId: "",
    username: "",
    lastModifiedDate: "",
    version: -1,
  })
  const securityService = useSecurityService()
  const loadingContext = useLoadingContext()

  useEffect(() => {
    ; (async () => {
      loadingContext.onLoading()
      const user = await securityService.getUserById(id as string)
      loadingContext.offLoading()

      setUser(user)
    })()
  }, [])

  return (
    <Card title={constants.header.userSummary}>
      <div className="columns is-multiline is-variable is-4">
        <div className="column is-6">
          {!loadingContext.isLoading() ? (
            <LabelValue label={constants.label.username}>
              {user.username}
            </LabelValue>
          ) : (
              <Skeleton count={2} />
            )}
        </div>
        <div className="column is-6">
          {!loadingContext.isLoading() ? (
            <LabelValue label={constants.label.email}>{user.email}</LabelValue>
          ) : (
              <Skeleton count={2} />
            )}
        </div>
        <div className="column is-6">
          {!loadingContext.isLoading() ? (
            <LabelValue label={constants.label.fullName}>
              {user.fullName}
            </LabelValue>
          ) : (
              <Skeleton count={2} />
            )}
        </div>
        <div className="column is-6">
          {!loadingContext.isLoading() ? (
            <LabelValue label={constants.label.telegramId}>
              {user.telegramId}
            </LabelValue>
          ) : (
              <Skeleton count={2} />
            )}
        </div>
        <div className="column is-6">
          {!loadingContext.isLoading() ? (
            <LabelValue label={constants.label.lastModifiedDate}>
              {user.lastModifiedDate}
            </LabelValue>
          ) : (
              <Skeleton count={2} />
            )}
        </div>
        <div className="column is-6">
          {!loadingContext.isLoading() ? (
            <LabelValue label={constants.label.version}>
              {user.version}
            </LabelValue>
          ) : (
              <Skeleton count={2} />
            )}
        </div>
      </div>
      <br />
      <ButtonGroup align="is-right">
        <ButtonLink href={`/dashboard/security/user/${user.id}/edit`} label="Edit" color="is-success" />
      </ButtonGroup>
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

export default SecurityUserSummaryPage
