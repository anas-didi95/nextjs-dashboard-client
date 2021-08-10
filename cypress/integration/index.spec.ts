const testId = {
  navbarImage: "[data-testid=navbar-image]",
  navbarTitle: "[data-testid=navbar-title]",
  signInFormHeader: "[data-testid=signin-form-header]",
  signInFormLabelUsername: "[data-testid=signin-form-label-username]",
  signInFormInputUsername: "[data-testid=signin-form-input-username]",
  signInFormErrorUsername: "[data-testid=signin-form-error-username]",
  signInFormLabelPassword: "[data-testid=signin-form-label-password]",
  signInFormInputPassword: "[data-testid=signin-form-input-password]",
  signInFormErrorPassword: "[data-testid=signin-form-error-password]",
  signInFormButtonSignIn: "[data-testid=signin-form-button-signin]",
}

describe("Sign In page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("has title", () => {
    cy.title().should("eq", "Sign In | Dashboard")
  })

  it("has navbar", () => {
    cy.get(testId.navbarImage)
      .should("have.attr", "src")
      .should("include", "dashboard")
    cy.get(testId.navbarTitle).should("have.text", "Dashboard")
  })

  it("has signin form", () => {
    cy.get(testId.signInFormHeader).should("have.text", "Sign In Form")
    cy.get(testId.signInFormLabelUsername).should("have.text", "Username")
    cy.get(testId.signInFormLabelPassword).should("have.text", "Password")
    cy.get(testId.signInFormButtonSignIn).should("have.text", "Sign In")
  })

  it("can validate signin form", () => {
    cy.get(testId.signInFormInputUsername).clear()
    cy.get(testId.signInFormInputPassword).clear()
    cy.get(testId.signInFormButtonSignIn).click()
    cy.get(testId.signInFormErrorUsername).should(
      "have.text",
      "Username is a mandatory field!"
    )
    cy.get(testId.signInFormErrorPassword).should(
      "have.text",
      "Password is a mandatory field!"
    )
  })

  it("can login", () => {
    cy.get(testId.signInFormInputUsername).type(Cypress.env("LOGIN_USERNAME"))
    cy.get(testId.signInFormInputPassword).type(Cypress.env("LOGIN_PASSWORD"))
    cy.get(testId.signInFormButtonSignIn).click()
    cy.url().should("include", "/dashboard")
  })

  it("screenshot", () => {
    cy.screenshot("index.tsx")
  })
})
