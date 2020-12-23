import React, { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import Card from "../../../../src/components/Card"
import Table from "../../../../src/components/Table"
import AppLayout from "../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../src/layouts/DashboardLayout"
import useConstants from "../../../../src/utils/hooks/useConstants"
import useSecurityService, {
  TUser,
} from "../../../../src/utils/hooks/useSecurityService"

const SecurityUserListPage: React.FC<{}> = () => (
  <AppLayout title="Security - User List" needAuth={true}>
    <DashboardLayout breadcrumbs={["Security", "User"]}>
      <UserListTable />
    </DashboardLayout>
  </AppLayout>
)

const UserListTable: React.FC<{}> = () => {
  const constants = useConstants()
  const [userList, setUserList] = useState<TUser[]>([])
  const securityService = useSecurityService()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    ; (async () => {
      const userList = await securityService.getUserList()
      setUserList(userList)
    })()

    const timeout = setTimeout(() => setLoading(true), 5000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <Card title={constants.header.userListing}>
      {isLoading ? (<Table
        headers={[
          constants.label.number,
          constants.label.username,
          constants.label.fullName,
          constants.label.email,
        ]}>
        {!!userList &&
          userList.length > 0 &&
          userList.map((user, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{user.username}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
            </tr>
          ))}
      </Table>) : <Skeleton count={3} />}
    </Card>
  )
}

export default SecurityUserListPage
