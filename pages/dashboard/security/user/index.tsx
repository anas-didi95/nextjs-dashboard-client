import React from "react"
import Card from "../../../../src/components/Card"
import Table from "../../../../src/components/Table"
import AppLayout from "../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../src/layouts/DashboardLayout"

const SecurityUserListingPage: React.FC<{}> = () => (
  <AppLayout title="User Listing" needAuth>
    <DashboardLayout breadcrumbs={["Security", "User"]}>
      <UserListingeCard />
    </DashboardLayout>
  </AppLayout>
)

const UserListingeCard: React.FC<{}> = () => {
  const users: { username: string; fullName: string; email: string }[] = [
    { email: "email1", fullName: "fullName1", username: "username1" },
    { email: "email2", fullName: "fullName2", username: "username2" },
    { email: "email3", fullName: "fullName3", username: "username3" },
  ]

  return (
    <Card title="User Listing">
      <Table headers={["No", "Username", "Full Name", "Email"]}>
        {!!users &&
          users.length > 0 &&
          users.map((user, i) => (
            <tr key={`user${i}`}>
              <td>{i + 1}</td>
              <td>{user.username}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
            </tr>
          ))}
      </Table>
    </Card>
  )
}

export default SecurityUserListingPage
