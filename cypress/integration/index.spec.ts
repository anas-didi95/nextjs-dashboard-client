describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("has a login form", () => {
    cy.get("[data-testid=login-form-header]").should("have.text", "Login Form")
    cy.get("[data-testid=login-form-label-username").should(
      "have.text",
      "Username"
    )
    cy.get("[data-testid=login-form-label-password").should(
      "have.text",
      "Password"
    )
    cy.get("[data-testid=login-form-button-login").should("have.text", "Login")
  })

  it("screenshot", () => {
    cy.screenshot("index.tsx")
  })
})
