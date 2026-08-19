# Checklist de Cobertura e Validação

Projeto: `qa-challenge-automation-test`

## Objetivo do projeto

Demonstrar uma estrutura de automação Web e API utilizando Cypress, JavaScript e Cucumber/Gherkin, com cenários reproduzíveis, documentação de execução e evidências.

## Cobertura implementada

| Item | Status | Observação |
|---|---|---|
| Cucumber para BDD | Atendido | Cenários escritos em arquivos `.feature`. |
| JavaScript | Atendido | Steps e comandos implementados em JavaScript. |
| Cypress | Atendido | Framework configurado e validado localmente. |
| README com instalação | Atendido | README possui clone, instalação e comandos de execução. |
| Login Web | Atendido | Cenário de login válido usando usuário criado dinamicamente. |
| Busca Web | Atendido | Cenário de busca de produto existente. |
| Inclusão no carrinho | Atendido | Cenário adiciona produto ao carrinho e valida confirmação. |
| Validação no checkout | Atendido | Cenário valida produto incluído na tela de checkout/pagamento. |
| GET API Trello | Atendido | Requisição GET implementada para o endpoint de referência. |
| Status code API | Atendido | Validação de status code 200. |
| Campo `list.name` | Atendido | Validação do valor `Professional`. |

## Execução local realizada

```bash
npm install
npx cypress verify
npm run test:api
npm run test:web
npm run cy:run
```

## Resultado da execução completa

```text
Specs: 3
Tests: 5
Passing: 5
Failing: 0
All specs passed
```

Detalhamento:

```text
api/trello.feature: 1 teste aprovado
web/login.feature: 1 teste aprovado
web/product_flow.feature: 3 testes aprovados
```

## Evidências

- índice de evidências em `docs/evidencias/INDICE.md`;
- evidência visual em `docs/evidencias/automation-cypress-run-finished-all-specs-passed.svg`;
- vídeos gerados localmente pelo Cypress em `cypress/videos`.

## Decisões técnicas relevantes

- Automation Exercise foi escolhido por disponibilizar publicamente os fluxos necessários para um case de e-commerce;
- usuário de teste criado dinamicamente para reduzir dependência de credencial fixa;
- custom commands utilizados para reduzir duplicidade;
- retry mantido por se tratar de ambiente público sujeito a oscilações;
- um problema de mapeamento Gherkin/step definition foi identificado durante a validação e corrigido antes da execução final.

## Conclusão

A cobertura implementada foi validada localmente com sucesso e demonstra automação Web/API, BDD, organização de código, estratégia de massa de dados e registro de evidências.
