import React from "react"
import { useEffect } from "react"
import { useState } from "react"
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
  const [currentTime, setCurrentTime] = useState<Date>()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Card title={constants.header.welcome}>
      <p className="title is-4">Hi, {user.fullName}</p>
      <div className="columns">
        <div className="column is-4">
          <div className="field">
            <label className="label">Session started at</label>
            <div className="control">
              <p>{authContext.getSessionDate().toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="column is-4">
          <div className="field">
            <label className="label">Current Time</label>
            <div className="control">
              <p>{currentTime?.toLocaleString() ?? "Loading..."}</p>
            </div>
          </div>
        </div>
        <div className="column is-4">
          <div className="field">
            <label className="label">Session duration</label>
            <div className="control">
              {(currentTime?.valueOf() ?? 0) -
                authContext.getSessionDate().valueOf()}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default HomePage
