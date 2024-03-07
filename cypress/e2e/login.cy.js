import "../support/commands";

describe("TS_Login", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  it("login with standard_user", () => {
    cy.login("standard_user", "secret_sauce");
    cy.url().should("include", "/inventory.html");
    cy.get(".app_logo").should("be.visible");
    cy.get(".product_label").should("be.visible").contains("Products");
  });

  it("login with locked_out_user", () => {
    cy.login("locked_out_user", "secret_sauce");
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Epic sadface: ");
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Sorry, this user has been locked out.");
  });

  it("login with problem_user", () => {
    cy.login("problem_user", "secret_sauce");
    cy.url().should("include", "/inventory.html");
    cy.get(".app_logo").should("be.visible");
    cy.get(".inventory_item_img").should(
      "not.have.attr",
      "src",
      "./img/sauce-backpack-1200x1500.jpg"
    );
  });

  it("login with performance_glitch_user", () => {
    cy.login("performance_glitch_user", "secret_sauce");
    cy.url().should("include", "/inventory.html");
    cy.get(".app_logo").should("be.visible");
    cy.get(".product_label").should("be.visible").contains("Products");
  });

  it("login with invalid credential", () => {
    cy.login("invalid username", "secret_sauce");
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Epic sadface: ");
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and(
        "contain",
        "Username and password do not match any user in this service"
      );
  });

  it("login without username", () => {
    cy.login("", "secret_sauce");
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Epic sadface: ");
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Username is required");
  });

  it("login without password", () => {
    cy.login("standard_user", "");
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Epic sadface: ");
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Password is required");
  });

  it('user access inventory.html', () => {
    cy.visit('/inventory.html')
    cy.url().should("include", "/index.html");
  })
});
