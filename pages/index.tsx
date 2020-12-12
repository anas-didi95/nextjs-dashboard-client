import React from "react"
import Box from "../src/components/Box"
import Button from "../src/components/Button"
import ButtonGroup from "../src/components/ButtonGroup"
import Form from "../src/components/Form"
import FormInput from "../src/components/FormInput"
import Navbar from "../src/components/Navbar"
import AppLayout from "../src/layouts/AppLayout"
import useConstants from "../src/utils/useConstants"

const LoginPage: React.FC<{}> = () => (
  <AppLayout title="Login Page">
    <section className="hero is-primary is-fullheight is-info">
      <div className="hero-head">
        <Navbar />
      </div>
      <div className="hero-body">
        <article className="container">
          <div className="columns is-centered">
            <div className="column is-5">
              <SignInForm />
            </div>
          </div>
        </article>
      </div>
    </section>
  </AppLayout>
)

const SignInForm: React.FC<{}> = () => {
  const constants = useConstants()

  return (
    <Box>
      <Form title={constants.header.signInForm}>
        <FormInput label={constants.label.username} type="text" />
        <FormInput label={constants.label.password} type="password" />
        <br />
        <ButtonGroup align="is-right">
          <Button label={constants.button.clear} type="button" color="is-light" isInverted isOutlined />
          <Button label={constants.button.signIn} type="submit" color="is-primary" />
        </ButtonGroup>
      </Form>
    </Box>
  )
}

export default LoginPage
