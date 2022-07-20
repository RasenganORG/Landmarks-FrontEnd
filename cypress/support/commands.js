// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
  cy.get('[data-cy=login-username-input]')
    .should('have.attr', 'placeholder', 'Username')
    .type(`${username}`);
  cy.get('[data-cy=login-password-input]')
    .should('have.attr', 'placeholder', 'Password')
    .type(`${password}`);
  cy.contains('button', 'Log in').click();
});

Cypress.Commands.add('register', (username, email, password) => {
  cy.get('[data-cy=register-username-input]')
    .should('have.attr', 'placeholder', 'Username')
    .type(`${username}`);
  cy.get('[data-cy=register-email-input]')
    .should('have.attr', 'placeholder', 'E-Mail')
    .type(`${email}`);
  cy.get('[data-cy=register-password-input]')
    .should('have.attr', 'placeholder', 'Password')
    .type(`${password}`);
  cy.contains('button', 'Register').click();
});

Cypress.Commands.add('membersFetch', () => {
  cy.intercept({
    method: 'GET',
    url: 'https://randomuser.me/api/?results=3&inc=name,gender,email,nat,picture&noinfo',
  }).as('initialMembersList');
  cy.wait('@initialMembersList').its('response.statusCode').should('eq', 200);
});

Cypress.Commands.add('deleteAllUsers', () => {
  cy.request('DELETE', 'http://localhost:8080/api/users');
});
