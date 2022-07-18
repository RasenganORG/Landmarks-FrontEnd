/// <reference types="cypress" />

describe('CreateRoom form', () => {
  beforeEach(() => {
    cy.visit('/');
    // Open Modal with Create Room form
  });

  it('should open modal with create room form', () => {
    cy.contains('li', 'Create Room').click();
    cy.contains('Create a room:').should('be.visible');
  });

  it('should show error for trying to create new room without password', () => {
    cy.contains('li', 'Create Room').click();
    cy.get('[data-cy=room-name-input]').type('Room 4');
    cy.contains('button', 'Create Room').click();
    cy.contains('[role=alert]', 'password').should('be.visible');
  });
});
