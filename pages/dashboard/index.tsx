import React, { useEffect, useState } from "react"
import Breadcrumb from "../../src/components/Breadcrumb"
import Card from "../../src/components/Card"
import Navbar from "../../src/components/Navbar"
import AppLayout from "../../src/layouts/AppLayout"
import DashboardLayout from "../../src/layouts/DashboardLayout"

const DashboardPage: React.FC<{}> = () => {
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const refreshTime = setInterval(() => {
      setCurrentTime(new Date().toUTCString())
    }, 1000)

    return () => {
      clearInterval(refreshTime)
    }
  }, [])

  return (
    <AppLayout title="Home" needAuth={true}>
      <DashboardLayout breadcrumbs={["Home"]}>
        <Card title="Welcome">
          <p className="title is-4">Hi, Anas Juwaidi</p>
          <div className="field">
            <label className="label">Current time</label>
            <div className="control">
              <p>{currentTime}</p>
            </div>
          </div>
        </Card>
      </DashboardLayout>
    </AppLayout>
  )
}

export default DashboardPage
