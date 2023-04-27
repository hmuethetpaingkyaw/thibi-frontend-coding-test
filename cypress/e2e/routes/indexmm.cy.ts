import { beforeEach, cy, describe, it } from 'local-cypress';

describe('Index Page in Burmese', () => {
  beforeEach(() => {
    cy.visit('/mm');
  });

  it('Header should exist', () => {
    cy.get('h1').should('be.visible');
    cy.get('h1').should('contain', 'မင်္ဂလာပါ ကမ္ဘာလောက');
    cy.get('h1').first().screenshot();
  });
  it('Dummy text should exist', () => {
    cy.get('p').should('be.visible');
    cy.get('p').should(
      'contain',
      'သီဟိုဠ်မှ ဉာဏ်ကြီးရှင်သည် အာယုဝဍ္ဎနဆေးညွှန်းစာကို ဇလွန်ဈေးဘေး ဗာဒံပင်ထက် အဓိဋ္ဌာန်လျက် ဂဃနဏဖတ်ခဲ့သည်။'
    );
    cy.get('p').first().screenshot();
  });
});
