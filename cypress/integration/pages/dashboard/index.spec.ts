const homePage = {
  testId: {
    welcomeCardTitle: "[data-testid=welcome-card-title]",
    serverStatusCardTitle: "[data-testid=server-status-card-title]",
  },
}

describe("Home page", () => {
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
    cy.get(homePage.testId.serverStatusCardTitle).should(
      "have.text",
      "Server Status"
    )
  })
})
