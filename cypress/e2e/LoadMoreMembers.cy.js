/// <reference types="cypress" />

describe('Login form', () => {
  beforeEach(() => {
    cy.visit('/');
    // Open Modal with Create Room form
  });

  it('load more members', () => {
    // cy.contains('span', 'Members').click();
    cy.contains('div.ant-drawer-title', 'Members').should('be.visible');
  });
});
