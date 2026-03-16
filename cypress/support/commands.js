Cypress.Commands.add('login', () => {
  const email    = Cypress.env('TEST_EMAIL')
  const password = Cypress.env('TEST_PASSWORD')

  cy.visit('/login')
  cy.get('form input[type="email"]').first().type(email)
  cy.get('form input[type="password"]').first().type(password)
  cy.get('form button[type="submit"]').first().click()

  cy.url().should('include', '/profile')
})
