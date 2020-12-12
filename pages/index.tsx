import React from "react"
import Box from "../src/components/Box"
import Button from "../src/components/Button"
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
              <Box>
                <Form title="Sign In Form">
                  <FormInput label="Username" type="text" />
                  <FormInput label="Password" type="password" />
                  <br />
                  <ButtonGroup align="is-right">
                    <Button label="Clear" type="button" color="is-light" isInverted isOutlined />
                    <Button label="Sign In" type="submit" color="is-primary" />
                  </ButtonGroup>
                </Form>
              </Box>
            </div>
          </div>
        </article>
      </div>
    </section>
  </AppLayout>
)

export default LoginPage
