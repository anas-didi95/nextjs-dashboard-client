import React from "react"
import AppLayout from "../../src/layouts/AppLayout"

const HomePage: React.FC<{}> = () => (
  <AppLayout title="Home" needAuth>
    <div>This is home</div>
  </AppLayout>
)

export default HomePage
