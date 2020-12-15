import React, { useContext } from "react"
import { useForm } from "react-hook-form"
import Box from "../src/components/Box"
import Button from "../src/components/Button"
import ButtonGroup from "../src/components/ButtonGroup"
import Form from "../src/components/Form"
import FormInput from "../src/components/FormInput"
import Navbar from "../src/components/Navbar"
import AppLayout from "../src/layouts/AppLayout"
import useConstants from "../src/utils/hooks/useConstants"
import { useRouter } from "next/router"
import AuthContext from "../src/utils/contexts/AuthContext"
import useAuth from "../src/utils/hooks/useAuth"
import Notification from "../src/components/Notification"
import NotificationContext from "../src/utils/contexts/NotificationContext"

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
  const { register, handleSubmit, errors, reset } = useForm<TForm>()
  const router = useRouter()
  const authContext = useContext(AuthContext)
  const auth = useAuth()
  const notificationContext = useContext(NotificationContext)

  const onSignIn = async (data: TForm) => {
    notificationContext.clear()
    const responseBody = await auth.signIn(data.username, data.password)

    if (responseBody.status.isSuccess) {
      authContext.setAuth(responseBody.data.accessToken)
      router.replace("/dashboard")
    }
  }

  const onClear = () => {
    notificationContext.clear()
    reset()
  }

  return (
    <Box>
      <Form
        title={constants.header.signInForm}
        onSubmit={handleSubmit(onSignIn)}>
        <Notification />
        <FormInput
          name="username"
          label={constants.label.username}
          type="text"
          register={register({
            required: constants.error.mandatoryField(constants.label.username),
          })}
          error={errors?.username?.message}
        />
        <FormInput
          name="password"
          label={constants.label.password}
          type="password"
          register={register({
            required: constants.error.mandatoryField(constants.label.password),
          })}
          error={errors?.password?.message}
        />
        <br />
        <ButtonGroup align="is-right">
          <Button
            label={constants.button.clear}
            type="button"
            color="is-light"
            isInverted
            isOutlined
            onClick={onClear}
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
