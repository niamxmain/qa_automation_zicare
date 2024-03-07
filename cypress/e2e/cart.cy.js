describe("TS_Cart", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  it("add product to cart from inventory page", () => {
    cy.add_product_to_cart();
  });

  it("add product to cart from product detail page", () => {
    cy.login("standard_user", "secret_sauce");
    cy.get("#item_4_title_link").click();
    cy.get(".fa-layers-counter.shopping_cart_badge").should("not.exist");
    cy.get(".btn_primary.btn_inventory").click();
    cy.get(".btn_secondary.btn_inventory").should("contain", "REMOVE");
    cy.get(".fa-layers-counter.shopping_cart_badge").should("contain", "1");
  });

  it("check product in cart", () => {
    cy.add_product_to_cart();
    cy.product_in_cart();
  });

  it("remove product from inventory page", () => {
    cy.add_product_to_cart();
    cy.get(".btn_secondary.btn_inventory").click();
    cy.get(".btn_primary.btn_inventory").should("contain", "ADD TO CART");
    cy.get(".fa-layers-counter.shopping_cart_badge").should("not.exist");
  });

  it("remove product from product detail page", () => {
    cy.add_product_to_cart();
    cy.get("#item_4_title_link").click();
    cy.get(".inventory_details_name").should("contain", "Sauce Labs Backpack");
    cy.get(".btn_secondary.btn_inventory").should("contain", "REMOVE");
    cy.get(".btn_secondary.btn_inventory").click();
    cy.get(".btn_primary.btn_inventory").should("contain", "ADD TO CART");
    cy.get(".fa-layers-counter.shopping_cart_badge").should("not.exist");
  });

  it("remove product from cart page", () => {
    cy.add_product_to_cart()
    cy.get(".shopping_cart_link.fa-layers.fa-fw").click();
    cy.get(".subheader").should("contain", "Your Cart");
    cy.get(".inventory_item_name").should("contain", "Sauce Labs Backpack");
    cy.get('.btn_secondary.cart_button').click()
    cy.get(".inventory_item_name").should('not.exist');
  });
});
