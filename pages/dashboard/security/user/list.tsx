import React, { useContext, useEffect, useState } from "react"
import Card from "../../../../src/components/Card"
import Table from "../../../../src/components/Table"
import AppLayout from "../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../src/layouts/DashboardLayout"
import AuthContext from "../../../../src/utils/contexts/AuthContext"
import useConstants from "../../../../src/utils/hooks/useConstants"

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
    username: string
    fullName: string
    email: string
  }
  const constants = useConstants()
  const [userList, setUserList] = useState<TUser[]>([])
  const authContext = useContext(AuthContext)

  useEffect(() => {
    (async () => {
      const response = await fetch(`${constants.env.apiSecurity}/graphql`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authContext.getAccessToken()}`
        },
        body: JSON.stringify({
          query: `query { getUserList { id username fullName email } }`,
        })
      })
      const responseBody = await response.json()
      setUserList(responseBody.data.getUserList)
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
