import { useRouter } from "next/dist/client/router"
import React from "react"
import { useForm } from "react-hook-form"
import Button from "../src/components/Button"
import ButtonGroup from "../src/components/ButtonGroup"
import FormInput from "../src/components/FormInput"
import Notification from "../src/components/Notification"
import AppLayout from "../src/layouts/AppLayout"
import { useNotificationContext } from "../src/utils/contexts/NotificationContext"
import useConstants from "../src/utils/hooks/useConstants"
import useSecurityService, {
  TResponseError,
} from "../src/utils/hooks/useSecurityService"

const SignInPage: React.FC<{}> = () => {
  const constants = useConstants()

  return (
    <AppLayout title="Sign In">
      <section className="hero is-info is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-half">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  )
}

const LoginForm: React.FC<{}> = () => {
  const constants = useConstants()
  const router = useRouter()
  const notificationContext = useNotificationContext()
  const { signIn } = useSecurityService()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>()

  const onSignIn = async (data: TLoginForm) => {
    notificationContext.clear()
    const responseBody = await signIn(data.username, data.password)
    if (!responseBody.accessToken) {
      const { errors, message } = responseBody as any as TResponseError
      notificationContext.setError("Sign In Failed!", message, errors)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="box">
      <p
        className="is-size-4 has-text-weight-bold mb-4"
        data-testid="signin-form-header">
        {constants.header.signInForm}
      </p>
      <Notification />
      <form onSubmit={handleSubmit(onSignIn)}>
        <FormInput
          register={register("username", {
            required: constants.error.mandatoryField(constants.label.username),
          })}
          label={constants.label.username}
          type="text"
          error={errors.username?.message}
          testidLabel="signin-form-label-username"
          testidInput="signin-form-input-username"
          testidError="signin-form-error-username"
        />
        <FormInput
          register={register("password", {
            required: constants.error.mandatoryField(constants.label.password),
          })}
          label={constants.label.password}
          type="password"
          error={errors.password?.message}
          testidLabel="signin-form-label-password"
          testidInput="signin-form-input-password"
          testidError="signin-form-error-password"
        />
        <br />
        <ButtonGroup align="is-right">
          <Button
            label={constants.button.signIn}
            type="submit"
            color="is-primary"
            testId="signin-form-button-signin"
          />
        </ButtonGroup>
      </form>
    </div>
  )
}

type TLoginForm = {
  username: string
  password: string
}

export default SignInPage
