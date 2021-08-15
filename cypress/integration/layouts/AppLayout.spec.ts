const appLayout = {
  testId: {
    navbarImage: "[data-testId=navbar-image]",
    navbarTitle: "[data-testId=navbar-title]",
    navbarButtonCredits: "[data-testId=navbar-button-credits]",
    navbarModalCredits: "[data-testId=navbar-modal-credits]",
    navbarModalCreditsClose: "[data-testId=navbar-modal-credits-close]",
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
