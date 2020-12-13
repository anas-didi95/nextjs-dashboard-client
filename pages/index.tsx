import React from "react"
import { useForm } from "react-hook-form"
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
  type TForm = {
    username: string
    password: string
  }
  const constants = useConstants()
  const { register, handleSubmit, errors } = useForm<TForm>()

  const onSignIn = (data: TForm) => {
    console.log("data", data)
  }

  return (
    <Box>
      <Form title={constants.header.signInForm} onSubmit={handleSubmit(onSignIn)}>
        <FormInput name="username" label={constants.label.username} type="text" register={register} />
        <FormInput name="password" label={constants.label.password} type="password" register={register} />
        <br />
        <ButtonGroup align="is-right">
          <Button
            label={constants.button.clear}
            type="button"
            color="is-light"
            isInverted
            isOutlined
            onClick={() => console.log("Clear button undefined!")}
          />
          <Button
            label={constants.button.signIn}
            type="submit"
            color="is-primary"
            onClick={handleSubmit(onSignIn)}
          />
        </ButtonGroup>
      </Form>
    </Box>
  )
}

export default LoginPage
