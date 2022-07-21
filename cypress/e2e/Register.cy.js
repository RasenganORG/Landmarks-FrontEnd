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

    const stubSample = {
      name: 'George',
      email: 'george@g.com',
      password: '987654321',
    };

    cy.intercept('POST', 'http://localhost:8080/api/user', (req) => {
      // controll request body
      req.body = { ...stubSample };
      req.reply((res) => {
        // controll response body
        res.send({ ...res.body, email: 'cypress@g.com' });
      });
    });

    cy.register(user, email, password);
  });
});
