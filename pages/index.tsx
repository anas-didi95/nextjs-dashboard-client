import React from "react"
import FormInput from "../src/components/FormInput"
import AppLayout from "../src/layouts/AppLayout"

const LoginPage: React.FC<{}> = () => {
  return (
    <AppLayout title="Login">
      <section className="hero is-info is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-half">
                <div className="box">
                  <p
                    className="is-size-4 has-text-weight-bold mb-4"
                    data-testid="login-form-header">
                    Login Form
                  </p>
                  <form>
                    <FormInput
                      label="Username"
                      type="text"
                      testidLabel="login-form-label-username"
                    />
                    <FormInput
                      label="Password"
                      type="password"
                      testidLabel="login-form-label-password"
                    />
                    <button
                      className="button"
                      data-testid="login-form-button-login">
                      Login
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

export default LoginPage
