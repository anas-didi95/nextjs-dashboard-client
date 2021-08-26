import React from "react"
import AppLayout from "../../src/layouts/AppLayout"

const TestPage: React.FC<{}> = () => (
  <AppLayout title="Test" needAuth>
    <div>This is test page</div>
  </AppLayout>
)

export default TestPage
