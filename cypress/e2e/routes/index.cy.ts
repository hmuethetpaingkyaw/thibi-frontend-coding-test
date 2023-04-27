import { beforeEach, cy, describe, it } from 'local-cypress';

describe('Index Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Header should exist', () => {
    cy.get('h1').should('be.visible');
    cy.get('h1').should('contain', 'Hello world');
    cy.get('h1').first().screenshot();
  });
  it('Dummy text should exist', () => {
    cy.get('p').should('be.visible');
    cy.get('p').should(
      'contain',
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates omnis natus temporibus magnam nisi at nostrum commodi ea autem, error dolores laboriosam ipsam maxime corporis quae, reprehenderit ipsum quasi harum!'
    );
    cy.get('p').first().screenshot();
  });
});
