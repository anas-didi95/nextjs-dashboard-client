import React from "react"
import Form from "../src/components/Form"
import Navbar from "../src/components/Navbar"
import AppLayout from "../src/layouts/AppLayout"

const LoginPage = () => (
  <AppLayout title="Login Page">
    <section className="hero is-primary is-fullheight is-info">
      <div className="hero-head">
        <Navbar />
      </div>
      <div className="hero-body">
        <article className="container">
          <div className="columns is-centered">
            <div className="column is-5">
              <div className="box">
                <Form title="Sign In Form">
                  <div className="field">
                    <label className="label">Label</label>
                    <div className="control">
                      <input className="input is-danger" type="text" />
                    </div>
                    <p className="help is-danger">This is a help text</p>
                  </div>
                  <div className="field">
                    <label className="label">Label</label>
                    <div className="control">
                      <input className="input is-danger" type="text" />
                    </div>
                    <p className="help is-danger">This is a help text</p>
                  </div>
                  <br />
                  <div className="buttons is-right">
                    <button type="button" className="button is-light is-outlined is-inverted">Clear</button>
                    <button type="submit" className="button is-primary">Sign In</button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  </AppLayout>
)

export default LoginPage
