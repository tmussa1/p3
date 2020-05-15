/**
 * Shows validation logic in log in page
 */
describe('Log In Validation', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.get('[data-test="enter-name"]').type('Tofik');
    cy.get('[data-test="enter-dob"]').type('2019-08-07');
    cy.get('[data-test="register"]').click({ force: true });
  });
});
