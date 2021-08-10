import { useRouter } from "next/dist/client/router"
import React from "react"
import { useForm } from "react-hook-form"
import Button from "../src/components/Button"
import ButtonGroup from "../src/components/ButtonGroup"
import FormInput from "../src/components/FormInput"
import AppLayout from "../src/layouts/AppLayout"
import useConstants from "../src/utils/hooks/useConstants"

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>()

  const onSubmit = async (data: TLoginForm) => {
    const response = await fetch(
      "https://api.anasdidi.dev/security/auth/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      }
    )
    if (response.ok) {
      router.push("/dashboard")
    } else {
      alert("ERROR")
    }
  }

  return (
    <div className="box">
      <p
        className="is-size-4 has-text-weight-bold mb-4"
        data-testid="signin-form-header">
        {constants.header.signInForm}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
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
