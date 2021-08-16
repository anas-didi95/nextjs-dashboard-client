describe("Home page - Not sign in", () => {
  beforeEach(() => {
    cy.visit("/dashboard")
  })

  it("will navigate to login page", () => {
    cy.title().should("eq", "Sign In | Dashboard")
  })
})
