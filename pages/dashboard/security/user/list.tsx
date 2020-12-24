import Link from "next/link"
import React, { useContext, useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import Button from "../../../../src/components/Button"
import ButtonGroup from "../../../../src/components/ButtonGroup"
import Card from "../../../../src/components/Card"
import Table from "../../../../src/components/Table"
import AppLayout from "../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../src/layouts/DashboardLayout"
import LoadingContext from "../../../../src/utils/contexts/LoadingContext"
import useConstants from "../../../../src/utils/hooks/useConstants"
import useSecurityService, {
  TUser,
} from "../../../../src/utils/hooks/useSecurityService"

const SecurityUserListPage: React.FC<{}> = () => (
  <AppLayout title="Security - User List" needAuth={true}>
    <DashboardLayout breadcrumbs={["Security", "User"]}>
      <UserListTable />
      <br />
      <ActionButton />
    </DashboardLayout>
  </AppLayout>
)

const UserListTable: React.FC<{}> = () => {
  const constants = useConstants()
  const [userList, setUserList] = useState<TUser[]>([])
  const securityService = useSecurityService()
  const loadingContext = useContext(LoadingContext)

  useEffect(() => {
    ; (async () => {
      loadingContext.onLoading()
      const userList = await securityService.getUserList()
      setUserList(userList)
      loadingContext.offLoading()
    })()
  }, [])

  return (
    <Card title={constants.header.userListing}>
      {!loadingContext.isLoading() ? (
        <Table
          headers={[
            constants.label.number,
            constants.label.username,
            constants.label.fullName,
            constants.label.email,
          ]}>
          {!!userList &&
            userList.length > 0 &&
            userList.map((user, i) => (
              <tr key={user.id}>
                <td>{i + 1}</td>
                <td>{user.username}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
              </tr>
            ))}
        </Table>
      ) : (
          <Skeleton count={3} />
        )}
    </Card>
  )
}

const ActionButton: React.FC<{}> = () => (
  <ButtonGroup align="is-right">
    <Link href="/dashboard/security/user/create">
      <Button label="Create" onClick={null} type="button" color="is-primary" />
    </Link>
  </ButtonGroup>
)

export default SecurityUserListPage
