// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (username = "", password = "") => {
  if (username !== "") {
    cy.get('[data-test="username"]').type(username);
  }
  if (password !== "") {
    cy.get('[data-test="password"]').type(password);
  }
  cy.get("#login-button").click();
});

Cypress.Commands.add("detail_product", () => {
  cy.get(".inventory_item_name").eq(0).should("contain", "Sauce Labs Backpack");
  cy.get("#item_4_title_link").click();
  cy.get(".inventory_details_name").should("contain", "Sauce Labs Backpack");
  cy.get(".inventory_details_desc").should(
    "contain",
    "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection."
  );
  cy.get(".inventory_details_price")
    .should("be.visible")
    .and("contain", "29.99");
});

Cypress.Commands.add("add_product_to_cart", () => {
  cy.login("standard_user", "secret_sauce");
  cy.get(".fa-layers-counter.shopping_cart_badge").should("not.exist");
  cy.get(".btn_primary.btn_inventory").eq(0).click();
  cy.get(".btn_secondary.btn_inventory").should("contain", "REMOVE");
  cy.get(".fa-layers-counter.shopping_cart_badge").should("contain", "1");
});

Cypress.Commands.add("product_in_cart", () => {
  cy.get(".shopping_cart_link.fa-layers.fa-fw").click();
  cy.get(".subheader").should("contain", "Your Cart");
  cy.get(".inventory_item_name").should("contain", "Sauce Labs Backpack");
  cy.get(".inventory_item_desc").should(
    "contain",
    "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection."
  );
  cy.get(".inventory_item_price").should("be.visible").and("contain", "29.99");
});
