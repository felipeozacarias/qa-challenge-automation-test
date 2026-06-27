const automationExerciseApiUrl = 'https://automationexercise.com/api';

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

const normalizeResponseBody = (body) => {
  if (typeof body !== 'string') return body;

  try {
    return JSON.parse(body);
  } catch (error) {
    return body;
  }
};

Cypress.Commands.add('createAutomationExerciseUser', () => {
  const user = buildTestUser();

  return cy.request({
    method: 'POST',
    url: `${automationExerciseApiUrl}/createAccount`,
    form: true,
    failOnStatusCode: false,
    body: user
  }).then((response) => {
    expect(response.status, 'HTTP status da criacao do usuario').to.eq(200);

    const responseBody = normalizeResponseBody(response.body);
    expect(JSON.stringify(responseBody), 'mensagem de criacao de usuario').to.include('User created');

    Cypress.env('currentUser', user);
    cy.wrap(user, { log: false }).as('currentUser');

    return cy.wrap(user, { log: false });
  });
});

Cypress.Commands.add('deleteAutomationExerciseUser', (email, password) => {
  if (!email || !password) return cy.wrap(null, { log: false });

  return cy.request({
    method: 'DELETE',
    url: `${automationExerciseApiUrl}/deleteAccount`,
    form: true,
    failOnStatusCode: false,
    body: { email, password }
  }).then((response) => {
    expect(response.status, 'HTTP status da exclusao do usuario').to.eq(200);
  });
});

Cypress.Commands.add('loginAutomationExercise', (user) => {
  cy.visit('/login');
  cy.contains('Login to your account', { timeout: 20000 }).should('be.visible');

  cy.get('form[action="/login"]').within(() => {
    cy.get('[data-qa="login-email"], input[name="email"]').first().should('be.visible').clear().type(user.email);
    cy.get('[data-qa="login-password"], input[name="password"]').first().should('be.visible').clear().type(user.password, { log: false });
    cy.get('[data-qa="login-button"], button[type="submit"]').first().should('be.visible').click();
  });

  cy.contains('Logged in as', { timeout: 15000 }).should('be.visible');
});

Cypress.Commands.add('goToProductsPage', () => {
  cy.visit('/products');
  cy.contains('All Products', { timeout: 20000 }).should('be.visible');
  cy.get('.features_items .product-image-wrapper', { timeout: 20000 }).should('have.length.greaterThan', 0);
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

  cy.get('#cartModal', { timeout: 15000 }).should('be.visible').within(() => {
    cy.contains('Added!').should('be.visible');
    cy.contains('Your product has been added to cart.').should('be.visible');
  });
});

Cypress.Commands.add('viewCartFromModal', () => {
  cy.get('#cartModal').should('be.visible').within(() => {
    cy.contains('a', 'View Cart').should('be.visible').click({ force: true });
  });

  cy.location('pathname', { timeout: 10000 }).should('eq', '/view_cart');
  cy.get('#cart_info').should('be.visible');
});
