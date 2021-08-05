/// <reference types="cypress" />

describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("displays a header", () => {
    cy.get("[data-testid=header]").should("have.text", "Welcome to Next.js!")
  })

  it("screenshot", () => {
    cy.screenshot("index.tsx")
  })
})
