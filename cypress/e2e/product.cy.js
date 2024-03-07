import "../support/commands";

describe("TS_Product", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  it("check detail product by standard_user", () => {
    cy.login("standard_user", "secret_sauce");
    cy.detail_product()
  });

  it("check detail product using problem_user", () => {
    cy.login("problem_user", "secret_sauce");
    cy.detail_product()
  });
});
