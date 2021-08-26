import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import Card from "../../src/components/Card"
import LabelValue from "../../src/components/LabelValue"
import Tag from "../../src/components/Tag"
import AppLayout from "../../src/layouts/AppLayout"
import DashboardLayout from "../../src/layouts/DashboardLayout"
import { useAuthContext } from "../../src/utils/contexts/AuthContext"
import useConstants from "../../src/utils/hooks/useConstants"

const HomePage: React.FC<{}> = () => (
  <AppLayout title="Home" needAuth>
    <DashboardLayout breadcrumbs={["Home"]}>
      <WelcomeCard />
      <br />
      <ServerStatusCard />
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
    <Card title={constants.header.welcome} testId="welcome-card">
      <p className="title is-4">Hi, {user.fullName}</p>
      <div className="columns is-mobile is-multiline">
        <div className="column is-4">
          <LabelValue label="Session started at">
            <p>{authContext.getSessionDate().toLocaleString()}</p>
          </LabelValue>
        </div>
        <div className="column is-4">
          <LabelValue label="Current Time">
            <p>{currentTime?.toLocaleString() ?? "Loading..."}</p>
          </LabelValue>
        </div>
      </div>
    </Card>
  )
}

const ServerStatusCard: React.FC<{}> = () => {
  const servers: TServer[] = [
    { label: "Security", url: "https://api.anasdidi.dev/security/health" },
    { label: "Bot", url: "https://api.anasdidi.dev/bot/ping" },
  ]
  const [selected, setSelected] = useState<number>(0)
  const [content, setContent] = useState<string>("")
  const [status, setStatus] = useState<number>(0)

  const onSelectTab: React.MouseEventHandler<HTMLLIElement> = (e) => {
    const index = e.currentTarget.dataset.index ?? ""
    if (!!index) {
      setContent("")
      setStatus(0)
      setSelected(parseInt(index))
    }
  }

  useEffect(() => {
    ;(async () => {
      const url = servers[selected].url
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        const responseBody = await response.json()
        if (responseBody.outcome === "UP") {
          setStatus(1)
        }
        setContent(JSON.stringify(responseBody))
      } else {
        setStatus(-1)
        setContent(response.statusText)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  return (
    <Card title="Server Status" testId="server-status-card">
      <div className="tabs">
        <ul>
          {servers.map((server, i) => (
            <li
              key={server.label}
              className={`${selected === i ? "is-active" : ""}`}
              data-index={i}
              onClick={onSelectTab}>
              <a>{server.label}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="columns is-mobile is-multiline">
        <div className="column is-3">
          <LabelValue label="Server">
            <p>{servers[selected].label}</p>
          </LabelValue>
        </div>
        <div className="column is-3">
          <LabelValue label="Status">
            {status === 0 ? (
              <Tag color="is-warning" value="Loading" />
            ) : status > 0 ? (
              <Tag color="is-success" value="Online" />
            ) : (
              <Tag color="is-danger" value="Offline" />
            )}
          </LabelValue>
        </div>
        <div className="column">
          <LabelValue label="URL">
            <p>{servers[selected].url}</p>
          </LabelValue>
        </div>
      </div>
      {!!content && (
        <pre className="content">
          {content.replace(`{"id"`, `\n\t{"id"`).replace("]", "]\n")}
        </pre>
      )}
    </Card>
  )
}

export default HomePage

type TServer = {
  label: string
  url: string
}
