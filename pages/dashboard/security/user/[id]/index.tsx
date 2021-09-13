import { useRouter } from "next/dist/client/router"
import React, { useEffect, useState } from "react"
import Button from "../../../../../src/components/Button"
import ButtonGroup from "../../../../../src/components/ButtonGroup"
import ButtonLink from "../../../../../src/components/ButtonLink"
import Card from "../../../../../src/components/Card"
import LabelValue from "../../../../../src/components/LabelValue"
import Loader from "../../../../../src/components/Loader"
import Modal from "../../../../../src/components/Modal"
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
  const [isDelete, setDelete] = useState<boolean>(false)

  const toggleDelete = () => setDelete((prev) => !prev)
  const onDelete = () => {
    const request = async (
      retry: number = 1,
      accessToken: string = authContext.getAccessToken()
    ) => {
      const { responseBody, status } = await securityService.deleteUser(
        { id: user.id, version: user.version },
        accessToken
      )
      if (status === 200) {
        router.replace("/dashboard/security/user")
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
    <>
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
                  [{user.permissions.join(", ")}]
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
              {authContext.getClaim().userId !== id ? (
                <Button
                  label={constants.button.delete}
                  color="is-danger"
                  type="button"
                  onClick={toggleDelete}
                />
              ) : (
                <ButtonLink
                  label={constants.button.changePassword}
                  color="is-danger"
                  href={`/dashboard/security/user/${id}/change-password`}
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
      <Modal
        title={constants.header.confirmDelete}
        isActive={isDelete}
        toggleActive={toggleDelete}>
        <p className="content">Are you sure to delete user?</p>
        <ButtonGroup align="is-right">
          <Button
            label={constants.button.cancel}
            type="button"
            color="is-light"
            isInverted
            isOutlined
            onClick={toggleDelete}
          />
          <Button
            label={constants.button.delete}
            type="button"
            color="is-danger"
            onClick={onDelete}
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
        href="/dashboard/security/user"
        label={constants.button.back}
        color="is-primary"
      />
    </ButtonGroup>
  )
}

export default SecurityUserSummaryPage
