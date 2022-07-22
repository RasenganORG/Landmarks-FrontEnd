/// <reference types="cypress" />

describe('Login user', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should log an existent user in', () => {
    const user = 'George';
    cy.intercept({
      method: 'GET',
      url: `http://localhost:8080/api/user/${user}`,
    }).as('logInUser');

    cy.login(user, '123456789');
    cy.wait('@logInUser').its('response.statusCode').should('eq', 200);
    cy.wait(500);
  });

  it('should throw http error when trying to log in nonexistent user', () => {
    const user = 'Zane';
    cy.intercept({
      method: 'GET',
      url: `http://localhost:8080/api/user/${user}`,
    }).as('logInUser');
    cy.login(user, '123456789');
    cy.wait('@logInUser').its('response.statusCode').should('eq', 404);
  });
});
