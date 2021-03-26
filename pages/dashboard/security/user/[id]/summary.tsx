import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import Button from "../../../../../src/components/Button"
import ButtonGroup from "../../../../../src/components/ButtonGroup"
import ButtonLink from "../../../../../src/components/ButtonLink"
import Card from "../../../../../src/components/Card"
import LabelValue from "../../../../../src/components/LabelValue"
import Modal from "../../../../../src/components/Modal"
import AppLayout from "../../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../../src/layouts/DashboardLayout"
import { useAuthContext } from "../../../../../src/utils/contexts/AuthContext"
import { useLoadingContext } from "../../../../../src/utils/contexts/LoadingContext"
import { useNotificationContext } from "../../../../../src/utils/contexts/NotificationContext"
import useConstants from "../../../../../src/utils/hooks/useConstants"
import useSecurityService, {
  TUser,
} from "../../../../../src/utils/hooks/useSecurityService"

const SecurityUserSummaryPage: React.FC<{}> = () => (
  <AppLayout title="Security - User Summary" needAuth={true}>
    <DashboardLayout breadcrumbs={["Security", "User", "Summary"]}>
      <UserSummaryForm />
      <br />
      <ActionButton />
    </DashboardLayout>
  </AppLayout>
)

const UserSummaryForm: React.FC<{}> = () => {
  const [user, setUser] = useState<TUser>({
    email: "",
    fullName: "",
    id: "",
    password: "",
    telegramId: "",
    username: "",
    lastModifiedDate: "",
    version: -1,
    permissions: [],
    lastModifiedBy: {
      id: "",
      username: "",
      fullName: "",
    },
  })
  const [isDelete, setDelete] = useState(false)
  const constants = useConstants()
  const securityService = useSecurityService()
  const loadingContext = useLoadingContext()
  const notificationContext = useNotificationContext()
  const router = useRouter()
  const { id } = router.query
  const authContext = useAuthContext()

  const toggleDelete = () => setDelete((prev) => !prev)

  const onDelete = async () => {
    notificationContext.clear()
    loadingContext.onLoading()
    const responseBody = await securityService.deleteUser(user)
    loadingContext.offLoading()

    if (responseBody.status.isSuccess) {
      notificationContext.setSaveMessage(
        "Delete user succeed.",
        responseBody.status.message,
        "is-success",
        []
      )
      router.replace("/dashboard/security/user/list")
    } else {
      console.error("[SecurityUserSummaryPage] responseBody", responseBody)
      notificationContext.setErrorMessage(
        "Delete user failed!",
        responseBody.status.message,
        responseBody.data.errorList ?? []
      )
      setDelete(false)
    }
  }

  useEffect(() => {
    ; (async () => {
      loadingContext.onLoading()
      const user = await securityService.getUserById(id as string)
      loadingContext.offLoading()

      setUser(user)
    })()
  }, [])

  return (
    <>
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
              <LabelValue label={constants.label.email}>
                {user.email}
              </LabelValue>
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
          <div className="column is-6">
            {!loadingContext.isLoading() ? (
              <LabelValue label={constants.label.lastModifiedBy}>
                {!!user.lastModifiedBy.username
                  ? user.lastModifiedBy.username +
                  " - " +
                  user.lastModifiedBy.fullName
                  : user.lastModifiedBy.id}
              </LabelValue>
            ) : (
              <Skeleton count={2} />
            )}
          </div>
          <div className="column is-6">
            {!loadingContext.isLoading() ? (
              <LabelValue label={constants.label.permissions}>
                [ {!!user.permissions && user.permissions.join(", ")} ]
              </LabelValue>
            ) : (
              <Skeleton count={2} />
            )}
          </div>
        </div>
        <br />
        <ButtonGroup align="is-right">
          {authContext.getUsername() !== user.username ? (
            <Button
              label={constants.button.delete}
              onClick={toggleDelete}
              type="button"
              color="is-danger"
            />
          ) : (
            <ButtonLink href={`/dashboard/security/user/${user.id}/change-password`} label="Change Password" color="is-danger" />
          )}
          <ButtonLink
            href={`/dashboard/security/user/${user.id}/edit`}
            label="Edit"
            color="is-success"
          />
        </ButtonGroup>
      </Card>
      <Modal
        isActive={isDelete}
        title={constants.header.confirmDelete}
        toggleActive={toggleDelete}>
        <p>Are you sure to delete?</p>
        <br />
        <ButtonGroup align="is-right">
          <Button
            label={constants.button.cancel}
            onClick={toggleDelete}
            type="button"
          />
          <Button
            label={constants.button.ok}
            onClick={onDelete}
            type="button"
            color="is-success"
          />
        </ButtonGroup>
      </Modal>
    </>
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
