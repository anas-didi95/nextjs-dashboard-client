const homePage = {
  testId: {
    welcomeCardTitle: "[data-testid=welcome-card-title]",
    serverStatusCardTitle: "[data-testid=server-status-card-title]",
  }
}

describe("Home page - Not sign in", () => {
  beforeEach(() => {
    cy.visit("/dashboard")
  })

  it("will navigate to login page", () => {
    cy.title().should("eq", "Sign In | Dashboard")
  })
})

describe("Home page - Sign in", () => {
  beforeEach(() => {
    cy.login()
    cy.visit("/dashboard")
  })

  it("has title", () => {
    cy.title().should("eq", "Home | Dashboard")
  })

  it("has welcome card", () => {
    cy.get(homePage.testId.welcomeCardTitle).should("have.text", "Welcome")
  })

  it("has server status card", () => {
    cy.get(homePage.testId.serverStatusCardTitle).should("have.text", "Server Status")
  })
})
