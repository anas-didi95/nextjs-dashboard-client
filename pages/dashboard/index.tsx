import React, { useEffect, useState } from "react"
import Card from "../../src/components/Card"
import LabelValue from "../../src/components/LabelValue"
import Tag from "../../src/components/Tag"
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
        <ServerStatus
          title={constants.header.securityServerStatus}
          url={constants.env.apiSecurity}
        />
      </DashboardLayout>
    </AppLayout>
  )
}

const ServerStatus: React.FC<{ url: string; title: string }> = ({
  url,
  title,
}) => {
  type TServer = {
    isOnline: boolean
    responseBody: string
  }
  const constants = useConstants()
  const [server, setServer] = useState<TServer>({
    isOnline: false,
    responseBody: "",
  })

  useEffect(() => {
    ; (async () => {
      const response = await fetch(`${url}/ping`, { method: "GET" })
      const responseBody = await response.json()

      setServer({
        isOnline: responseBody.outcome === "UP",
        responseBody: JSON.stringify(responseBody),
      })
    })()
  }, [])

  return (
    <Card title={title}>
      <div className="columns is-mobile is-multiline">
        <div className="column is-8">
          <LabelValue label={constants.label.url}>
            <p>{url}</p>
          </LabelValue>
        </div>
        <div className="column is-4">
          <LabelValue label={constants.label.status}>
            {server.isOnline ? (
              <Tag value="Online" color="is-success" />
            ) : (
                <Tag value="Checking" color="is-warning" />
              )}
          </LabelValue>
        </div>
        <div className="column is-12">
          <LabelValue label={constants.label.responseBody}>
            <pre>
              {server.responseBody.replace(`{"id"`, `\n\t{"id"`).replace("]", "]\n")}
            </pre>
          </LabelValue>
        </div>
      </div>
    </Card>
  )
}

export default DashboardPage
