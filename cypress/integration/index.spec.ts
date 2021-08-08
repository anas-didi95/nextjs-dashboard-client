describe("Sign In page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("has title", () => {
    cy.title().should("eq", "Sign In | Dashboard")
  })

  it("has navbar", () => {
    cy.get("[data-testid=navbar-image")
      .should("have.attr", "src")
      .should("include", "dashboard")
    cy.get("[data-testid=navbar-title").should("have.text", "Dashboard")
  })

  it("has signin form", () => {
    cy.get("[data-testid=signin-form-header]").should(
      "have.text",
      "Sign In Form"
    )
    cy.get("[data-testid=signin-form-label-username").should(
      "have.text",
      "Username"
    )
    cy.get("[data-testid=signin-form-label-password").should(
      "have.text",
      "Password"
    )
    cy.get("[data-testid=signin-form-button-signin").should(
      "have.text",
      "Sign In"
    )
  })

  it("screenshot", () => {
    cy.screenshot("index.tsx")
  })
})
