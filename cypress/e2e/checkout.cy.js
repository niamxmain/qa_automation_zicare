describe("TS_Checkout", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  it("checkout product", () => {
    cy.add_product_to_cart();
    cy.product_in_cart();
    cy.get(".btn_action.checkout_button").click();
    cy.get('[data-test="firstName"]').type("muhammad");
    cy.get('[data-test="lastName"]').type("niam");
    cy.get('[data-test="postalCode"]').type("12345");
    cy.get('.btn_primary.cart_button').should('contain', 'CONTINUE').click()

    cy.get(".subheader").should("contain", "Checkout: Overview");
    cy.get(".btn_action.cart_button").should("contain", "FINISH").click();
    cy.get(".complete-header")
      .should("be.visible")
      .and("contain", "THANK YOU FOR YOUR ORDER");
  });

  it("checkout without product in cart", () => {
    cy.login("standard_user", "secret_sauce")
    cy.get('.shopping_cart_link.fa-layers.fa-fw').click()
    cy.get(".btn_action.checkout_button").click();
    cy.get('.error-msg').should('contain', 'There is no product in cart')
  });

  it("checkout product without filling in detail information", () => {
    cy.add_product_to_cart();
    cy.product_in_cart();
    cy.get(".btn_action.checkout_button").click();
    cy.get('.btn_primary.cart_button').should('contain', 'CONTINUE').click()

    cy.get('[data-test="error"]').should('be.visible').and('contain', 'First Name is required')
  });
});
