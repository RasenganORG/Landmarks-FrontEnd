/// <reference types="cypress" />

describe('Members List drawer', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('George', '123456789');
  });

  it('should load initial list of 3 members', () => {
    cy.membersFetch();

    cy.contains('div.ant-drawer-title', 'Members').should('be.visible');
    // cy.get('ul[class="ant-list-items"]').should('have.length', 3);
    // cy.get('[data-cy=members-li]').each((item, index, list) => {
    //   expect(list).to.have.length(3);
    // });
    cy.get('[data-cy="members-ul"]')
      .find('ul > li')
      .its('length')
      .should('eq', 3);
  });

  it('shoud load more members', () => {
    cy.membersFetch();

    cy.contains('button', 'Load More').click();
    cy.membersFetch();

    // cy.wait(500);
    cy.get('[data-cy="members-ul"]')
      .find('ul > li')
      .its('length')
      .should('eq', 6);
  });
});
