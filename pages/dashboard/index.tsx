import React from "react"
import Card from "../../src/components/Card"
import AppLayout from "../../src/layouts/AppLayout"
import DashboardLayout from "../../src/layouts/DashboardLayout"
import { useAuthContext } from "../../src/utils/contexts/AuthContext"
import useConstants from "../../src/utils/hooks/useConstants"

const HomePage: React.FC<{}> = () => (
  <AppLayout title="Home" needAuth>
    <DashboardLayout breadcrumbs={["Home"]}>
      <WelcomeCard />
    </DashboardLayout>
  </AppLayout>
)

const WelcomeCard: React.FC<{}> = () => {
  const constants = useConstants()
  const authContext = useAuthContext()
  const user = authContext.getUser()

  return (
    <Card title={constants.header.welcome}>
      <p className="title is-4">Hi, {user.fullName}</p>
    </Card>
  )
}

export default HomePage
