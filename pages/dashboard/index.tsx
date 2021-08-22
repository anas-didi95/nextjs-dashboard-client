import React from "react"
import { useEffect } from "react"
import Card from "../../src/components/Card"
import AppLayout from "../../src/layouts/AppLayout"
import DashboardLayout from "../../src/layouts/DashboardLayout"
import { useAuthContext } from "../../src/utils/contexts/AuthContext"
import { useLoadingContext } from "../../src/utils/contexts/LoadingContext"
import useConstants from "../../src/utils/hooks/useConstants"
import useSecurityService from "../../src/utils/hooks/useSecurityService"

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
  const loadingContext = useLoadingContext()
  const securityService = useSecurityService()
  const user = authContext.getUser()

  useEffect(() => {
    loadingContext.run(async () => {
      if (!user.userId) {
        const responseBody = await securityService.check()
        if ("userId" in responseBody) {
          authContext.setUser(responseBody)
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card title={constants.header.welcome}>
      <p className="title is-4">Hi, {user.fullName}</p>
    </Card>
  )
}

export default HomePage
