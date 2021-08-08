describe("Login page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("has title", () => {
    cy.title().should("eq", "Login | Dashboard")
  })

  it("has a navbar", () => {
    cy.get("[data-testid=navbar-image")
      .should("have.attr", "src")
      .should("include", "dashboard")
    cy.get("[data-testid=navbar-title").should("have.text", "Dashboard")
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
