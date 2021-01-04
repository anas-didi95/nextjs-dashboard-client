import React from "react"
import { useForm } from "react-hook-form"
import Box from "../src/components/Box"
import Button from "../src/components/Button"
import ButtonGroup from "../src/components/ButtonGroup"
import Form from "../src/components/Form"
import FormInput from "../src/components/FormInput"
import AppLayout from "../src/layouts/AppLayout"
import useConstants from "../src/utils/hooks/useConstants"
import { useRouter } from "next/router"
import useAuth from "../src/utils/hooks/useAuth"
import Notification from "../src/components/Notification"
import { useAuthContext } from "../src/utils/contexts/AuthContext"
import { useNotificationContext } from "../src/utils/contexts/NotificationContext"
import { useLoadingContext } from "../src/utils/contexts/LoadingContext"

const LoginPage: React.FC<{}> = () => (
  <AppLayout title="Sign In Page">
    <section className="hero is-primary is-fullheight-with-navbar is-info">
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
  const authContext = useAuthContext()
  const auth = useAuth()
  const notificationContext = useNotificationContext()
  const loadingContext = useLoadingContext()

  const onSignIn = async (data: TForm) => {
    notificationContext.clear()
    loadingContext.onLoading()
    const responseBody = await auth.signIn(data.username, data.password)
    loadingContext.offLoading()

    if (responseBody.status.isSuccess) {
      authContext.setAuth(responseBody.data.accessToken, responseBody.data.refreshToken)
      router.replace("/dashboard")
    } else {
      notificationContext.setErrorMessage(
        "Sign in failed!",
        responseBody.status.message
      )
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
