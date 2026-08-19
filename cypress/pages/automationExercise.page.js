const selectors = {
  loginEmail: '[data-qa="login-email"]',
  loginPassword: '[data-qa="login-password"]',
  loginButton: '[data-qa="login-button"]',
  productCards: '.features_items .product-image-wrapper',
  searchInput: '#search_product',
  searchButton: '#submit_search',
  cartModal: '#cartModal',
  cartInfo: '#cart_info'
};

class AutomationExercisePage {
  visitLogin() {
    cy.visit('/login');
    cy.contains('Login to your account').should('be.visible');
  }

  fillLogin(user) {
    cy.get(selectors.loginEmail).should('be.visible').clear().type(user.email);
    cy.get(selectors.loginPassword)
      .should('be.visible')
      .clear()
      .type(user.password, { log: false });
  }

  submitLogin() {
    cy.get(selectors.loginButton).should('be.visible').click();
  }

  assertLoggedIn() {
    cy.contains('Logged in as', { timeout: 15000 }).should('be.visible');
    cy.contains('Logout').should('be.visible');
  }

  login(user) {
    this.visitLogin();
    this.fillLogin(user);
    this.submitLogin();
    this.assertLoggedIn();
  }

  visitProducts() {
    cy.visit('/products');
    cy.contains('All Products', { timeout: 20000 }).should('be.visible');
    cy.get(selectors.productCards, { timeout: 20000 }).should('have.length.greaterThan', 0);
  }

  searchProduct(productName) {
    cy.get(selectors.searchInput).should('be.visible').clear().type(productName);
    cy.get(selectors.searchButton).should('be.visible').click();
    cy.contains('Searched Products', { timeout: 15000 }).should('be.visible');
  }

  assertSearchResults(productName) {
    cy.get(selectors.productCards).should('have.length.greaterThan', 0);

    cy.get('body').invoke('text').then((text) => {
      expect(text.toLowerCase()).to.include(productName.toLowerCase());
    });
  }

  addFirstProductToCart() {
    cy.get(selectors.productCards, { timeout: 20000 })
      .should('have.length.greaterThan', 0)
      .first()
      .as('selectedProductCard');

    cy.get('@selectedProductCard').find('.productinfo p').first().invoke('text').then((name) => {
      cy.wrap(name.trim()).as('selectedProductName');
    });

    cy.get('@selectedProductCard').find('.productinfo h2').first().invoke('text').then((price) => {
      cy.wrap(price.trim()).as('selectedProductPrice');
    });

    cy.get('@selectedProductCard')
      .find('.productinfo a.add-to-cart, a.add-to-cart')
      .first()
      .scrollIntoView()
      .click({ force: true });
  }

  assertProductAdded() {
    cy.get(selectors.cartModal, { timeout: 15000 }).should('be.visible').within(() => {
      cy.contains('Added!').should('be.visible');
      cy.contains('Your product has been added to cart.').should('be.visible');
    });
  }

  viewCartFromModal() {
    cy.get(selectors.cartModal).should('be.visible').within(() => {
      cy.contains('a', 'View Cart').should('be.visible').click({ force: true });
    });

    cy.location('pathname', { timeout: 10000 }).should('eq', '/view_cart');
    cy.get(selectors.cartInfo).should('be.visible');
  }

  proceedToCheckout() {
    cy.contains('a', 'Proceed To Checkout').should('be.visible').click();
    cy.url().should('include', '/checkout');
  }

  assertSelectedProductAtCheckout() {
    cy.get('@selectedProductName').then((productName) => {
      cy.get(selectors.cartInfo).should('be.visible').and('contain', productName);
    });

    cy.get('@selectedProductPrice').then((productPrice) => {
      cy.get(selectors.cartInfo).should('contain', productPrice);
    });
  }
}

export const automationExercisePage = new AutomationExercisePage();
