import { Given, When, Then, After } from '@badeball/cypress-cucumber-preprocessor';

After({ tags: '@web' }, () => {
  const user = Cypress.env('currentUser');
  if (user?.email && user?.password) {
    cy.deleteAutomationExerciseUser(user.email, user.password);
    Cypress.env('currentUser', null);
  }
});

Given('que possuo um usuario de teste valido no Automation Exercise', () => {
  cy.createAutomationExerciseUser();
});

Given('acesso a pagina de login do Automation Exercise', () => {
  cy.visit('/login');
  cy.contains('Login to your account').should('be.visible');
});

When('informo as credenciais validas', () => {
  cy.get('@currentUser').then((user) => {
    cy.get('[data-qa="login-email"]').should('be.visible').clear().type(user.email);
    cy.get('[data-qa="login-password"]').should('be.visible').clear().type(user.password, { log: false });
  });
});

When('aciono a opcao de login', () => {
  cy.get('[data-qa="login-button"]').should('be.visible').click();
});

Then('devo visualizar o usuario autenticado no sistema', () => {
  cy.contains('Logged in as', { timeout: 15000 }).should('be.visible');
  cy.contains('Logout').should('be.visible');
});

Given('que estou autenticado com um usuario de teste valido no Automation Exercise', () => {
  cy.createAutomationExerciseUser().then((user) => {
    cy.loginAutomationExercise(user);
  });
});

Given('que acesso a pagina de produtos do Automation Exercise', () => {
  cy.goToProductsPage();
});

When('realizo a busca pelo produto {string}', (productName) => {
  cy.searchProduct(productName);
});

Then('devo visualizar produtos relacionados a busca {string}', (productName) => {
  cy.get('.features_items .product-image-wrapper')
    .should('have.length.greaterThan', 0);

  cy.get('body').invoke('text').then((text) => {
    expect(text.toLowerCase()).to.include(productName.toLowerCase());
  });
});

When('adiciono o primeiro produto disponivel ao carrinho', () => {
  cy.addFirstProductToCart();
});

Then('devo visualizar a confirmacao de produto adicionado ao carrinho', () => {
  cy.get('#cartModal').should('be.visible');
  cy.contains('Your product has been added to cart.').should('be.visible');
});

When('acesso o carrinho de compras', () => {
  cy.viewCartFromModal();
});

When('prossigo para o checkout', () => {
  cy.contains('a', 'Proceed To Checkout').should('be.visible').click();
  cy.url().should('include', '/checkout');
});

Then('devo visualizar o produto incluido na tela de checkout', () => {
  cy.get('@selectedProductName').then((productName) => {
    cy.get('#cart_info').should('be.visible').and('contain', productName);
  });

  cy.get('@selectedProductPrice').then((productPrice) => {
    cy.get('#cart_info').should('contain', productPrice);
  });
});
