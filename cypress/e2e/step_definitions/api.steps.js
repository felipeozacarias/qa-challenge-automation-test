import Ajv from 'ajv';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import trelloActionSchema from '../../schemas/trello-action.schema';

const ajv = new Ajv({ allErrors: true, strict: false });
const validateTrelloAction = ajv.compile(trelloActionSchema);

Given('que possuo o endpoint da API do Trello', () => {
  const trelloActionUrl = Cypress.env('trelloActionUrl');
  expect(trelloActionUrl, 'endpoint da API Trello').to.be.a('string').and.not.be.empty;
  cy.wrap(trelloActionUrl).as('trelloActionUrl');
});

When('envio uma requisicao GET para consultar o recurso', () => {
  cy.get('@trelloActionUrl').then((url) => {
    cy.request({
      method: 'GET',
      url,
      failOnStatusCode: false,
    }).as('trelloResponse');
  });
});

Then('o status code da resposta deve ser 200', () => {
  cy.get('@trelloResponse').its('status').should('eq', 200);
});

Then('a resposta deve respeitar o schema esperado da action do Trello', () => {
  cy.get('@trelloResponse').then((response) => {
    const isValid = validateTrelloAction(response.body);
    const validationErrors = validateTrelloAction.errors
      ? JSON.stringify(validateTrelloAction.errors, null, 2)
      : 'nenhum';

    expect(isValid, `erros de schema: ${validationErrors}`).to.eq(true);
  });
});

Then('devo exibir o conteudo do campo name da estrutura list', () => {
  cy.get('@trelloResponse').then((response) => {
    const listName = response.body?.data?.list?.name;
    expect(listName, 'data.list.name').to.be.a('string').and.not.be.empty;
    cy.log(`Valor retornado em data.list.name: ${listName}`);
  });
});

Then('o valor do campo name da estrutura list deve ser {string}', (expectedListName) => {
  cy.get('@trelloResponse').then((response) => {
    expect(response.body.data.list.name).to.eq(expectedListName);
  });
});
