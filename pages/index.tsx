import React from "react"
import ButtonGroup from "../src/components/ButtonGroup"
import Form from "../src/components/Form"
import FormInput from "../src/components/FormInput"
import Navbar from "../src/components/Navbar"
import AppLayout from "../src/layouts/AppLayout"

const LoginPage = () => (
  <AppLayout title="Login Page">
    <section className="hero is-primary is-fullheight is-info">
      <div className="hero-head">
        <Navbar />
      </div>
      <div className="hero-body">
        <article className="container">
          <div className="columns is-centered">
            <div className="column is-5">
              <div className="box">
                <Form title="Sign In Form">
                  <FormInput label="Username" type="text" />
                  <FormInput label="Password" type="password" />
                  <br />
                  <ButtonGroup align="is-right">
                    <button type="button" className="button is-light is-outlined is-inverted">Clear</button>
                    <button type="submit" className="button is-primary">Sign In</button>
                  </ButtonGroup>
                </Form>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  </AppLayout>
)

export default LoginPage
