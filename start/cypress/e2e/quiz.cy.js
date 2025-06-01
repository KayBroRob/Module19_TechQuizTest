describe('Tech Quiz via Fixtures', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
        cy.intercept({
            method: 'GET',
            url: "/api/questions"
        }, {
            fixture: 'questions.json',
            statusCode: 200
        }
        ).as('fixtureQuestions')
    });

    it('should ask the first quiz question when I click start', () => {
        cy.fixture('question.json').then((questions) => {
            cy.contains(questions[0].question).should('be.visibile');
            cy.get('[data-cy="option-button"]').should('have.length', questions[0].options.length);
        });
    });
    it('when I answer a question, then I am asked the next question', () => {
        cy.fixture('question.json').then((questions) => {
            cy.contains(questions[0].question).should('be.visibile');
            cy.get('[data-cy="option-button"]').eq(0).click();
            cy.contains(questions[1].question).should('be.visible');
            cy.get('[data-cy="option-button"]').should('have.length', questions[1].options.length);
        });
    });
    it('when the quiz is over, then I can view my score', () => {
        cy.fixture('questions.json').then((questions) => {
            for (let i = 0; i < questions.length; i++) {
                cy.get(['data-cy="option-button"]').eq(0).click();
            }
        });
        cy.findByText('Quiz Over!').should('be.visible');
        cy.findByText('Your Score').should('be.visible');
    });
});