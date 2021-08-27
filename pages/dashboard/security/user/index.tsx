import Link from "next/link"
import React, { useState } from "react"
import { useEffect } from "react"
import Card from "../../../../src/components/Card"
import Table from "../../../../src/components/Table"
import AppLayout from "../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../src/layouts/DashboardLayout"
import { useAuthContext } from "../../../../src/utils/contexts/AuthContext"
import { useLoadingContext } from "../../../../src/utils/contexts/LoadingContext"
import { useNotificationContext } from "../../../../src/utils/contexts/NotificationContext"
import useConstants from "../../../../src/utils/hooks/useConstants"
import useSecurityService from "../../../../src/utils/hooks/useSecurityService"
import { TResponseError, TUsers } from "../../../../src/utils/types"

const SecurityUserListingPage: React.FC<{}> = () => (
  <AppLayout title="Security - User Listing" needAuth>
    <DashboardLayout breadcrumbs={["Security", "User"]}>
      <UserListingeCard />
    </DashboardLayout>
  </AppLayout>
)

const UserListingeCard: React.FC<{}> = () => {
  const constants = useConstants()
  const authContext = useAuthContext()
  const notification = useNotificationContext()
  const loadingContext = useLoadingContext()
  const securityService = useSecurityService()
  const [users, setUsers] = useState<TUsers>([])

  useEffect(() => {
    setUsers([])
    const request = async (retry: number = 1, accessToken: string = "") => {
      accessToken = accessToken || authContext.getAccessToken()
      const { responseBody, status } = await securityService.getUsers(
        accessToken
      )
      if (status === 200) {
        setUsers(responseBody as TUsers)
      } else {
        if (status === 401 && retry > 0) {
          accessToken = await authContext.refresh()
          await request(retry - 1, accessToken)
        } else {
          notification.setError(responseBody as TResponseError)
        }
      }
    }
    loadingContext.run(request)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card title={constants.header.userListing} testId="user-listing-card">
      <Table
        headers={[
          constants.label.number,
          constants.label.username,
          constants.label.fullName,
          constants.label.email,
        ]}>
        {!!users &&
          users.length > 0 &&
          users.map((user, i) => (
            <tr key={`user${i}`}>
              <td>{i + 1}</td>
              <td>
                <Link href={`/dashboard/security/user/${user.id}`}>
                  <a>{user.username}</a>
                </Link>
              </td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
            </tr>
          ))}
      </Table>
    </Card>
  )
}

export default SecurityUserListingPage
