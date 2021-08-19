const appLayout = {
  testId: {
    navbarImage: "[data-testid=navbar-image]",
    navbarTitle: "[data-testid=navbar-title]",
    navbarButtonCredits: "[data-testid=navbar-button-credits]",
    navbarModalCredits: "[data-testid=navbar-modal-credits]",
    navbarModalCreditsClose: "[data-testid=navbar-modal-credits-close]",
  },
}

describe("AppLayout - Not sign in", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("has navbar", () => {
    cy.get(appLayout.testId.navbarImage)
      .should("have.attr", "src")
      .should("include", "dashboard")
    cy.get(appLayout.testId.navbarTitle).should("have.text", "Dashboard")
    cy.get(appLayout.testId.navbarButtonCredits).should("have.text", "Credits")
  })

  it("has modal credits", () => {
    cy.get(appLayout.testId.navbarButtonCredits).click({ force: true })
    cy.get(appLayout.testId.navbarModalCredits)
      .should("have.attr", "class")
      .should("include", "is-active")
    cy.get(appLayout.testId.navbarModalCreditsClose).click()
    cy.get(appLayout.testId.navbarModalCredits)
      .should("have.attr", "class")
      .should("not.include", "is-active")
  })
})
