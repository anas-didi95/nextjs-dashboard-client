import React from "react"

const HomePage: React.FC<{}> = () => {
  return (
    <section className="hero is-info is-fullheight">
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
                  <div className="field">
                    <label
                      className="label"
                      data-testid="login-form-label-username">
                      Username
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Text input"
                      />
                    </div>
                    <p className="help">This is a help text</p>
                  </div>
                  <div className="field">
                    <label
                      className="label"
                      data-testid="login-form-label-password">
                      Password
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Text input"
                      />
                    </div>
                    <p className="help">This is a help text</p>
                  </div>
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
  )
}

export default HomePage
