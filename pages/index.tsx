import React from "react"
import Navbar from "../src/components/Navbar"
import AppLayout from "../src/layouts/AppLayout"

const LoginPage = () => (
  <AppLayout title="Login Page">
    <section className="hero is-primary is-fullheight is-info">
      <div className="hero-head">
        <Navbar />
      </div>
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Primary title</h1>
          <h2 className="subtitle">Primary subtitle</h2>
        </div>
      </div>
    </section>
  </AppLayout>
)

export default LoginPage
