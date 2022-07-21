/// <reference types="cypress" />

describe('Login user', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should log an existent user in', () => {
    const user = 'Florian';
    cy.intercept({
      method: 'GET',
      url: `http://localhost:8080/api/user/${user}`,
    }).as('logInUser');

    cy.login(user, '123456789');
    cy.wait('@logInUser').its('response.statusCode').should('eq', 200);
  });

  it('should throw error when trying to log in nonexistent user', () => {
    const user = 'George';
    cy.intercept({
      method: 'GET',
      url: `http://localhost:8080/api/user/${user}`,
    }).as('logInUser');
    cy.login(user, '123456789');
    cy.wait('@logInUser').its('response.statusCode').should('eq', 404);
  });
});
