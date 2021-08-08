import React from "react"
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
                <div className="box">
                  <p
                    className="is-size-4 has-text-weight-bold mb-4"
                    data-testid="signin-form-header">
                    {constants.header.signInForm}
                  </p>
                  <form>
                    <FormInput
                      label={constants.label.username}
                      type="text"
                      testidLabel="signin-form-label-username"
                    />
                    <FormInput
                      label={constants.label.password}
                      type="password"
                      testidLabel="signin-form-label-password"
                    />
                    <button
                      className="button"
                      data-testid="signin-form-button-signin">
                      {constants.button.signIn}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  )
}

export default SignInPage
