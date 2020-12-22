import React from "react"
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

const UserListTable: React.FC<{}> = () => (
  <Card title="User Listing">
    <Table headers={["No", "User Id", "Full Name", "Email"]}>
      <tr>
        <th>1</th>
        <td><a href="https://en.wikipedia.org/wiki/Leicester_City_F.C." title="Leicester City F.C.">Leicester City</a> <strong>(C)</strong>
        </td>
        <td>38</td>
        <td>23</td>
      </tr>
      <tr>
        <th>2</th>
        <td><a href="https://en.wikipedia.org/wiki/Arsenal_F.C." title="Arsenal F.C.">Arsenal</a></td>
        <td>38</td>
        <td>20</td>
      </tr>
    </Table >
  </Card >
)

export default SecurityUserListPage
