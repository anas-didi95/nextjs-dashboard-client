const userListingPage = {
  testId: {
    userListingCardTitle: "[data-testid=user-listing-card-title]",
  },
}

describe("Security - User Listing page", () => {
  beforeEach(() => {
    cy.login()
    cy.visit("/dashboard/security/user")
  })

  it("has user listing card", () => {
    cy.get(userListingPage.testId.userListingCardTitle).should(
      "have.text",
      "User Listing"
    )
  })
})
