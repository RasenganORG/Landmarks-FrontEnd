/// <reference types="cypress" />

describe('Members List drawer', () => {
  beforeEach(() => {
    cy.visit('/');
    const user = { name: 'Florian', password: '123456789' };
    cy.login(user.name, user.password);
  });

  it('should load initial list of 3 members', () => {
    // cy.membersFetch();
    cy.intercept({
      method: 'GET',
      url: 'https://randomuser.me/api/?results=3&inc=name,gender,email,nat,picture&noinfo',
    }).as('initialMembersList');
    cy.wait('@initialMembersList').its('response.statusCode').should('eq', 200);

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

    cy.get('[data-cy="members-ul"]').find('ul > li').should('have.length', 6);
  });

  it('should intercept get (members list) request and display mock member list', () => {
    cy.intercept(
      'GET',
      'https://randomuser.me/api/?results=3&inc=name,gender,email,nat,picture&noinfo',
      { fixture: 'membersList' }
    ).as('getMembersFixture');

    cy.get('[data-cy="members-ul"]')
      .find('ul > li')
      .should('have.length', 3)
      .and('contain', 'Nguyen')
      .and('contain', 'Dupont')
      .and('contain', 'Woods');
  });

  it('should get only 1 member from stub sample', () => {
    const stubSample = {
      results: [
        {
          gender: 'male',
          name: {
            title: 'Mr',
            first: 'Anthony',
            last: 'Nguyen',
          },
          email: 'anthony.nguyen@example.com',
          picture: {
            large: 'https://randomuser.me/api/portraits/men/41.jpg',
            medium: 'https://randomuser.me/api/portraits/med/men/41.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/thumb/men/41.jpg',
          },
          nat: 'FR',
        },
      ],
    };

    cy.intercept(
      'GET',
      'https://randomuser.me/api/?results=3&inc=name,gender,email,nat,picture&noinfo',
      {
        body: stubSample,
      }
    ).as('getMembersStub');

    cy.get('[data-cy="members-ul"]')
      .find('ul > li')
      .should('have.length', 1)
      .and('contain', 'Nguyen');
  });
});
