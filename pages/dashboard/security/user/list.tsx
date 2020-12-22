import React, { useState } from "react"
import Card from "../../../../src/components/Card"
import Table from "../../../../src/components/Table"
import AppLayout from "../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../src/layouts/DashboardLayout"

const SecurityUserListPage: React.FC<{}> = () => (
  <AppLayout title="Security - User List" needAuth={true}>
    <DashboardLayout breadcrumbs={["Security", "User"]}>
      <UserListTable />
    </DashboardLayout>
  </AppLayout>
)

const UserListTable: React.FC<{}> = () => {
  type TUser = {
    id: string
    userId: string
    fullName: string
    email: string
  }
  const [userList, setUserList] = useState<TUser[]>([])

  return (
    <Card title="User Listing">
      <Table headers={["No", "User Id", "Full Name", "Email"]}>
        {!!userList && userList.length > 0 && userList.map((user, i) => (
          <tr>
            <td>{i + 1}</td>
            <td>{user.userId}</td>
            <td>{user.fullName}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </Table >
    </Card >
  )
}

export default SecurityUserListPage
