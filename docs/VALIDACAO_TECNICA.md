# Validação Técnica do Projeto

Este documento consolida os principais pontos de validação técnica do projeto de automação Web e API.

## Escopo validado

- Cypress configurado para execução E2E;
- JavaScript utilizado nas step definitions e comandos reutilizáveis;
- Cucumber/Gherkin utilizado para escrita dos cenários BDD;
- Fluxo Web cobrindo login, busca, inclusão no carrinho e validação no checkout;
- Fluxo API cobrindo GET na API do Trello, status code e campo `data.list.name`;
- README com instruções de instalação e execução.

## Comandos de validação

```bash
npm install
npm run test:api
npm run test:web
npm run cy:run
```

## Resultado consolidado

```text
Specs: 3
Tests: 5
Passing: 5
Failing: 0
All specs passed
```

## Pontos de atenção do ambiente

- O site Automation Exercise é público e pode apresentar oscilação, lentidão ou alteração de seletores;
- Em caso de falha Web relacionada ao ambiente, revisar primeiro `cypress/support/commands.js` e a estabilidade dos seletores;
- Caso a API do Trello fique indisponível temporariamente, repetir a execução antes de alterar a validação funcional.

## Conclusão

O projeto demonstra automação Web e API com BDD, organização de código, massa de dados controlada, validação de payload e execução reproduzível.
