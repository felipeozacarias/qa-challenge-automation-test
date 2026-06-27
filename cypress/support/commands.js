const buildTestUser = () => {
  const timestamp = Date.now();
  return {
    name: `Felipe QA ${timestamp}`,
    email: `felipe.qa.${timestamp}@example.com`,
    password: 'Teste@12345',
    title: 'Mr',
    birth_date: '10',
    birth_month: '5',
    birth_year: '1990',
    firstname: 'Felipe',
    lastname: 'Zacarias',
    company: 'QA Challenge',
    address1: 'Rua Teste 100',
    address2: 'Complemento QA',
    country: 'Canada',
    zipcode: '12345',
    state: 'Ontario',
    city: 'Toronto',
    mobile_number: '11999999999'
  };
};

Cypress.Commands.add('createAutomationExerciseUser', () => {
  const user = buildTestUser();

  return cy.request({
    method: 'POST',
    url: 'https://automationexercise.com/api/createAccount',
    form: true,
    failOnStatusCode: false,
    body: user
  }).then((response) => {
    expect(response.status, 'HTTP status da criacao do usuario').to.eq(200);
    expect(JSON.stringify(response.body), 'mensagem de criacao de usuario').to.include('User created');

    Cypress.env('currentUser', user);
    cy.wrap(user, { log: false }).as('currentUser');
    return cy.wrap(user, { log: false });
  });
});

Cypress.Commands.add('deleteAutomationExerciseUser', (email, password) => {
  if (!email || !password) return;

  return cy.request({
    method: 'DELETE',
    url: 'https://automationexercise.com/api/deleteAccount',
    form: true,
    failOnStatusCode: false,
    body: { email, password }
  });
});

Cypress.Commands.add('loginAutomationExercise', (user) => {
  cy.visit('/login');
  cy.get('[data-qa="login-email"]').should('be.visible').clear().type(user.email);
  cy.get('[data-qa="login-password"]').should('be.visible').clear().type(user.password, { log: false });
  cy.get('[data-qa="login-button"]').should('be.visible').click();
  cy.contains('Logged in as', { timeout: 15000 }).should('be.visible');
});

Cypress.Commands.add('goToProductsPage', () => {
  cy.visit('/products');
  cy.contains('All Products', { timeout: 20000 }).should('be.visible');
});

Cypress.Commands.add('searchProduct', (productName) => {
  cy.get('#search_product').should('be.visible').clear().type(productName);
  cy.get('#submit_search').should('be.visible').click();
  cy.contains('Searched Products', { timeout: 15000 }).should('be.visible');
});

Cypress.Commands.add('addFirstProductToCart', () => {
  cy.get('.features_items .product-image-wrapper', { timeout: 20000 })
    .should('have.length.greaterThan', 0)
    .first()
    .within(() => {
      cy.get('.productinfo p').invoke('text').then((name) => {
        cy.wrap(name.trim()).as('selectedProductName');
      });

      cy.get('.productinfo h2').invoke('text').then((price) => {
        cy.wrap(price.trim()).as('selectedProductPrice');
      });

      cy.contains('a', 'Add to cart').click({ force: true });
    });

  cy.get('#cartModal', { timeout: 15000 }).should('be.visible');
  cy.contains('Added!').should('be.visible');
});

Cypress.Commands.add('viewCartFromModal', () => {
  cy.get('#cartModal').should('be.visible');
  cy.contains('u', 'View Cart').click({ force: true });
  cy.url().should('include', '/view_cart');
  cy.get('#cart_info').should('be.visible');
});
