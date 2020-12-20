import React, { useEffect, useState } from "react"
import Card from "../../src/components/Card"
import LabelValue from "../../src/components/LabelValue"
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
          <LabelValue label="Current time">
            <p>{currentTime}</p>
          </LabelValue>
        </Card>
      </DashboardLayout>
    </AppLayout>
  )
}

export default DashboardPage
