# Validacao tecnica final

Este documento consolida os pontos de revisao tecnica do desafio de automacao.

## Escopo atendido

- Cypress configurado para execucao E2E.
- JavaScript utilizado nas step definitions e comandos reutilizaveis.
- Cucumber/Gherkin utilizado para escrita dos cenarios BDD.
- Fluxo Web cobrindo login, busca, inclusao no carrinho e validacao no checkout.
- Fluxo API cobrindo GET na API do Trello, status code e campo `data.list.name`.
- README com instrucoes de instalacao e execucao.

## Validacoes recomendadas antes do envio

Executar os comandos abaixo localmente:

```bash
npm install
npm run test:api
npm run test:web
npm run cy:run
```

## Pontos de atencao

- O site Automation Exercise e publico e pode apresentar oscilacao, lentidao ou alteracao de seletores.
- Caso algum teste Web falhe por instabilidade visual, revisar primeiro `cypress/support/commands.js`.
- Caso a API do Trello fique indisponivel temporariamente, repetir a execucao antes de alterar a validacao funcional.

## Parecer

A entrega esta aderente ao desafio tecnico proposto e prioriza clareza, cobertura dos fluxos criticos, escrita BDD e facilidade de execucao por parte do avaliador.
