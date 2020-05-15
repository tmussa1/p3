describe('Shows categories and selects a word to play', () => {
  it('Shows list of categories', () => {
    let categories = ['Chicken', 'Texas Life', 'Arts'];
    cy.visit('/categories');

    cy.contains('[data-test="category-name"]', categories[0]);
    cy.contains('[data-test="category-name"]', categories[1]);
    cy.contains('[data-test="category-name"]', categories[2]);
  });

  it('Select a category', () => {
    cy.get('[data-test="category-button"]').click({
      multiple: true,
      force: true,
    });
  });

  it('Switch difficulty level', () => {
    cy.get('[data-test="difficulty-hard"]').click();
  });

  it('Enter special characters', () => {
    cy.get('[data-test="enter-answer"]').type('$#$%%^^&');
    cy.get('[data-test="enter-button"]').click();
    cy.get('[data-test="enter-answer"]').clear();
  });

  it('Enter wrong answer 3 times', () => {
    cy.get('[data-test="enter-answer"]').type('wronganswer');
    cy.get('[data-test="enter-button"]').click();
    cy.get('[data-test="enter-answer"]').clear();
    cy.get('[data-test="enter-answer"]').type('wronganswer');
    cy.get('[data-test="enter-button"]').click();
    cy.get('[data-test="enter-answer"]').clear();
    cy.get('[data-test="enter-answer"]').type('wronganswer');
    cy.get('[data-test="enter-button"]').click();
  });

  it('Play game again', () => {
    cy.get('[ data-test="play-again-button"]').click();
  });
});
