import React, { useEffect, useState } from "react"
import Card from "../../../../src/components/Card"
import Table from "../../../../src/components/Table"
import AppLayout from "../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../src/layouts/DashboardLayout"
import useSecurityService, { TUser } from "../../../../src/utils/hooks/useSecurityService"

const SecurityUserListPage: React.FC<{}> = () => (
  <AppLayout title="Security - User List" needAuth={true}>
    <DashboardLayout breadcrumbs={["Security", "User"]}>
      <UserListTable />
    </DashboardLayout>
  </AppLayout>
)

const UserListTable: React.FC<{}> = () => {
  const [userList, setUserList] = useState<TUser[]>([])
  const securityService = useSecurityService()

  useEffect(() => {
    (async () => {
      const userList = await securityService.getUserList()
      setUserList(userList)
    })()
  }, [])

  return (
    <Card title="User Listing">
      <Table headers={["No", "Username", "Full Name", "Email"]}>
        {!!userList && userList.length > 0 && userList.map((user, i) => (
          <tr>
            <td>{i + 1}</td>
            <td>{user.username}</td>
            <td>{user.fullName}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </Table >
    </Card >
  )
}

export default SecurityUserListPage
