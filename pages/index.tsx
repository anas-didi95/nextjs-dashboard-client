import React from "react"
import Image from "next/image"
import FormInput from "../src/components/FormInput"

const HomePage: React.FC<{}> = () => {
  return (
    <>
      <nav
        className="navbar is-info is-spaced"
        role="navigation"
        aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-item">
            <Image
              src="/images/dashboard.png"
              alt="Dashboard logo"
              width={64}
              height={64}
              data-testid="navbar-image"
            />
            <p
              className="title has-text-white is-3 ml-2"
              data-testid="navbar-title">
              Dashboard
            </p>
          </div>
        </div>
      </nav>
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
    </>
  )
}

export default HomePage
