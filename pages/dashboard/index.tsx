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
        <br />
        <ServerStatus title="Security Server Status" url={process.env.NEXT_PUBLIC_API_SECURITY} />
      </DashboardLayout>
    </AppLayout>
  )
}

const ServerStatus: React.FC<{ url: string, title: string }> = ({ url, title }) => {

  useEffect(() => {
    (async () => {
      const response = await fetch(`${url}/ping`, { method: "GET" })
      const responseBody = await response.json()

      console.log("response", response)
      console.log("responseBody", responseBody)
    })()
  }, [])

  return (
    <Card title={title}>
      <div className="columns is-mobile">
        <div className="column is-6">
          <LabelValue label="URL">
            <p>{url}</p>
          </LabelValue>
        </div>
        <div className="column is-6">
          <LabelValue label="Status">
            <span className="tag is-rounded is-success">
              Online
            </span>          </LabelValue>
        </div>
      </div>
    </Card>

  )
}

export default DashboardPage
