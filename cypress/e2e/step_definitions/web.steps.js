import { Given, When, Then, After } from '@badeball/cypress-cucumber-preprocessor';
import { automationExercisePage } from '../../pages/automationExercise.page';

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
  automationExercisePage.visitLogin();
});

When('informo as credenciais validas', () => {
  cy.get('@currentUser').then((user) => {
    automationExercisePage.fillLogin(user);
  });
});

When('aciono a opcao de login', () => {
  automationExercisePage.submitLogin();
});

Then('devo visualizar o usuario autenticado no sistema', () => {
  automationExercisePage.assertLoggedIn();
});

Given('que estou autenticado com um usuario de teste valido no Automation Exercise', () => {
  cy.createAutomationExerciseUser().then((user) => {
    automationExercisePage.login(user);
  });
});

Given('que acesso a pagina de produtos do Automation Exercise', () => {
  automationExercisePage.visitProducts();
});

When('realizo a busca pelo produto {string}', (productName) => {
  automationExercisePage.searchProduct(productName);
});

Then('devo visualizar produtos relacionados a busca {string}', (productName) => {
  automationExercisePage.assertSearchResults(productName);
});

When('adiciono o primeiro produto disponivel ao carrinho', () => {
  automationExercisePage.addFirstProductToCart();
});

Then('devo visualizar a confirmacao de produto adicionado ao carrinho', () => {
  automationExercisePage.assertProductAdded();
});

When('acesso o carrinho de compras', () => {
  automationExercisePage.viewCartFromModal();
});

When('prossigo para o checkout', () => {
  automationExercisePage.proceedToCheckout();
});

Then('devo visualizar o produto incluido na tela de checkout', () => {
  automationExercisePage.assertSelectedProductAtCheckout();
});
