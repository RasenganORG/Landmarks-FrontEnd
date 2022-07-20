/// <reference types="cypress" />

describe('Register a user', () => {
  beforeEach(() => {
    cy.visit('/register');
    cy.deleteAllUsers();
  });

  it('should register user as mock data', () => {
    const user = 'Florian';
    const email = 'florian@g.com';
    const password = '12345678';

    cy.intercept('POST', 'http://localhost:8080/api/user', (req) => {
      req.reply((res) => {
        res.send('Something');
      });
    });

    cy.register(user, email, password);
  });
});
