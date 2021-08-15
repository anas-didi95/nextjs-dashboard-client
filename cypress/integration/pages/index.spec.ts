const signInPage = {
  testId: {
    signInFormHeader: "[data-testId=signin-form-header]",
    signInFormLabelUsername: "[data-testId=signin-form-label-username]",
    signInFormInputUsername: "[data-testId=signin-form-input-username]",
    signInFormErrorUsername: "[data-testId=signin-form-error-username]",
    signInFormLabelPassword: "[data-testId=signin-form-label-password]",
    signInFormInputPassword: "[data-testId=signin-form-input-password]",
    signInFormErrorPassword: "[data-testId=signin-form-error-password]",
    signInFormButtonSignIn: "[data-testId=signin-form-button-signin]",
    signInFormButtonClear: "[data-testId=signin-form-button-clear]",
    notification: "[data-testId=notification]",
    notificationTitle: "[data-testId=notification-title]",
    notificationMessage: "[data-testId=notification-message]",
  },
}

describe("Sign In page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("has title", () => {
    cy.title().should("eq", "Sign In | Dashboard")
  })

  it("has signin form", () => {
    cy.get(signInPage.testId.signInFormHeader).should(
      "have.text",
      "Sign In Form"
    )
    cy.get(signInPage.testId.signInFormLabelUsername).should(
      "have.text",
      "Username"
    )
    cy.get(signInPage.testId.signInFormLabelPassword).should(
      "have.text",
      "Password"
    )
    cy.get(signInPage.testId.signInFormButtonSignIn).should(
      "have.text",
      "Sign In"
    )
  })

  it("can validate signin form", () => {
    cy.get(signInPage.testId.signInFormInputUsername).clear()
    cy.get(signInPage.testId.signInFormInputPassword).clear()
    cy.get(signInPage.testId.signInFormButtonSignIn).click()
    cy.get(signInPage.testId.signInFormErrorUsername).should(
      "have.text",
      "Username is a mandatory field!"
    )
    cy.get(signInPage.testId.signInFormErrorPassword).should(
      "have.text",
      "Password is a mandatory field!"
    )
  })

  it("can clear form", () => {
    cy.get(signInPage.testId.signInFormInputUsername).type(
      Cypress.env("LOGIN_USERNAME")
    )
    cy.get(signInPage.testId.signInFormInputPassword).type(
      Cypress.env("LOGIN_PASSWORD")
    )
    cy.get(signInPage.testId.signInFormButtonClear).click()
    cy.get(signInPage.testId.signInFormInputUsername).should("have.value", "")
    cy.get(signInPage.testId.signInFormInputPassword).should("have.value", "")
  })

  it("can login", () => {
    cy.get(signInPage.testId.signInFormInputUsername).type(
      Cypress.env("LOGIN_USERNAME")
    )
    cy.get(signInPage.testId.signInFormInputPassword).type(
      Cypress.env("LOGIN_PASSWORD")
    )
    cy.get(signInPage.testId.signInFormButtonSignIn).click()
    cy.url({ timeout: 10000 }).should("include", "/dashboard")
  })

  it("can notify login failed", () => {
    const rnd = `index${new Date().getMilliseconds().toString()}`
    cy.get(signInPage.testId.signInFormInputUsername).type(rnd)
    cy.get(signInPage.testId.signInFormInputPassword).type(rnd)
    cy.get(signInPage.testId.signInFormButtonSignIn).click()
    cy.get(signInPage.testId.notification)
      .should("have.attr", "class")
      .should("include", "is-danger")
  })

  it("screenshot", () => {
    cy.screenshot("index.tsx")
  })
})
