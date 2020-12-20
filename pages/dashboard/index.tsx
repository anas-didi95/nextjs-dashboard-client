import React, { useEffect, useState } from "react"
import Card from "../../src/components/Card"
import LabelValue from "../../src/components/LabelValue"
import AppLayout from "../../src/layouts/AppLayout"
import DashboardLayout from "../../src/layouts/DashboardLayout"
import useConstants from "../../src/utils/hooks/useConstants"

const DashboardPage: React.FC<{}> = () => {
  const constants = useConstants()
  const [currentTime, setCurrentTime] = useState("Refreshing...")

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
        <Card title={constants.header.welcome}>
          <p className="title is-4">Hi, Anas Juwaidi</p>
          <LabelValue label={constants.label.currentTime}>
            <p>{currentTime}</p>
          </LabelValue>
        </Card>
      </DashboardLayout>
    </AppLayout>
  )
}

export default DashboardPage
