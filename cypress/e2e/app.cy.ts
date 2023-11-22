describe("todo-e2e", () => {
  beforeEach(() => cy.visit("/"));

  it("should display home page with all feeds", () => {
    cy.get('[data-testid="home"]', { timeout: 10000 });
    cy.get('[data-testid="articles"]').children().should("have.length.above", 1);
  });

  it("should filter articles with query", () => {
    cy.get('[data-testid="searchbar"]', { timeout: 10000 }).should("be.visible").type("Book{enter}");
    cy.get('[data-testid="articles"]').children().should("have.length.above", 1);
  });

  it("should filter articles with sources", () => {
    cy.get('[data-testid="btn-filter"]', { timeout: 10000 }).click();
    cy.get("#filter-sources", { timeout: 10000 })
      .click({ timeout: 10000 }) // click to open dropdown
      .get('[class*="-menu"]')
      .find('[class*="-option"]')
      .first()
      .click(); // click on first option
    cy.get('.filter > .modal > .modal__header > [data-testid="modal-close"]').click();
    cy.wait(1000);
    cy.get('[data-testid="articles"]').children().should("have.length.above", 1);
  });
});
