declare namespace Cypress {
  interface Chainable {
    login(): void
  }
}

Cypress.Commands.add("login", () => {
  cy.request("POST", `${Cypress.env("API_SECURITY")}/auth/login`, {
    username: Cypress.env("LOGIN_USERNAME"),
    password: Cypress.env("LOGIN_PASSWORD"),
  })
    .its("body")
    .then((responseBody) => {
      window.localStorage.setItem("refreshToken", responseBody.refreshToken)
    })
})
