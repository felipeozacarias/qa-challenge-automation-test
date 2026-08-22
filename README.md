# Automação de Testes Web e API | Cypress + JavaScript + Cucumber

[![QA Automation CI](https://github.com/felipeozacarias/qa-challenge-automation-test/actions/workflows/qa-automation.yml/badge.svg)](https://github.com/felipeozacarias/qa-challenge-automation-test/actions/workflows/qa-automation.yml)

Projeto prático de Quality Engineering voltado à automação de fluxos Web e API com **Cypress, JavaScript e Cucumber/Gherkin**. O foco é demonstrar uma estrutura executável e de fácil manutenção, com BDD, massa de dados dinâmica, Page Object, suites por criticidade, quality gates, validação de contrato de API, relatório HTML, CI/CD, execução cross-browser e evidências de execução.

## Resultado consolidado

Última execução local validada:

```text
Cypress: 14.5.4
Browser CI: Chrome 151
Specs: 3
Tests: 5
Passing: 5
Failing: 0
Exit code: 0
All specs passed!
```

Cross-browser do caminho crítico:

```text
Chrome 151: 3 critical passing / 0 failing
Edge 151: 3 critical passing / 0 failing
Firefox: validado via GitHub Actions
```

## Escopo automatizado

### Web — Automation Exercise

- login com usuário de teste válido;
- busca de produto;
- inclusão de produto no carrinho;
- validação do produto no checkout/pagamento.

### API — Trello

- requisição `GET` para o recurso de actions;
- validação do status code `200`;
- validação de JSON Schema do contrato utilizado pelo teste;
- validação do campo `data.list.name` com valor esperado `Professional`.

O schema valida apenas a estrutura necessária ao contrato do cenário (`data.list.name`), evitando acoplamento desnecessário a campos da API que não fazem parte do requisito.

## Tecnologias

- Node.js 22
- Cypress 14.5.4
- JavaScript
- Cucumber / Gherkin
- Ajv 8.17.1
- `@badeball/cypress-cucumber-preprocessor` 22.2.0
- `@bahmutov/cypress-esbuild-preprocessor`
- GitHub Actions

## Arquitetura

```text
cypress/
├── e2e/
│   ├── api/
│   │   └── trello.feature
│   ├── web/
│   │   ├── login.feature
│   │   └── product_flow.feature
│   └── step_definitions/
│       ├── api.steps.js
│       └── web.steps.js
├── schemas/
│   └── trello-action.schema.js
├── fixtures/
│   └── users.json
├── pages/
│   └── automationExercise.page.js
└── support/
    ├── commands.js
    └── e2e.js

scripts/
├── quality-gate.js
├── critical-quality-gate.js
└── generate-html-report.js
```

## Instalação

```bash
git clone https://github.com/felipeozacarias/qa-challenge-automation-test.git
cd qa-challenge-automation-test
npm ci
```

## Execução

Abrir Cypress em modo interativo:

```bash
npm run cy:open
```

Executar toda a suíte:

```bash
npm run cy:run
```

Executar somente Web:

```bash
npm run test:web
```

Executar somente API:

```bash
npm run test:api
```

### Suites por tags

```bash
npm run test:smoke
npm run test:regression
npm run test:critical
```

As tags utilizadas incluem `@smoke`, `@regression` e `@critical`, além das tags funcionais como `@web`, `@api`, `@login` e `@ecommerce`.

## Cross-browser

O caminho crítico pode ser executado com gate explícito por navegador:

```bash
npm run ci:critical:chrome
npm run ci:critical:edge
npm run ci:critical:firefox
```

A estratégia executa a suíte completa no navegador principal e o caminho crítico nos navegadores adicionais, reduzindo custo sem abrir mão de cobertura de compatibilidade.

## Quality Gates

### Gate da suíte completa

```bash
npm run quality:gate
```

Critérios:

- relatório Cucumber JSON deve existir;
- pelo menos 5 cenários devem estar presentes na execução completa;
- nenhum step pode terminar com status diferente de `passed`.

### Gate do caminho crítico

```bash
npm run quality:gate:critical
```

Critérios:

- pelo menos 3 cenários com tag `@critical` devem estar presentes;
- os 3 cenários críticos devem ter sido executados;
- nenhum step crítico pode terminar com status diferente de `passed`.

Qualquer violação encerra o processo com exit code diferente de zero.

## Relatório HTML

```bash
npm run report:html
```

Arquivo gerado:

```text
reports/automation-report.html
```

## Execução de CI local

```bash
npm run ci
```

Esse comando executa, em sequência:

1. suíte Cypress completa em Chrome, sem gravação de vídeo;
2. quality gate global;
3. geração do relatório HTML.

## CI/CD

Workflow:

```text
.github/workflows/qa-automation.yml
```

O pipeline contém dois níveis:

```text
Full Suite + Quality Gate
└── Chrome → 5 cenários + gate global

Critical Cross-Browser
├── Chrome  → 3 críticos + critical gate
├── Edge    → 3 críticos + critical gate
└── Firefox → 3 críticos + critical gate
```

Acionamentos:

- `push` na `main`;
- `pull_request` para `main`;
- execução manual com `workflow_dispatch`.

## Estratégia de massa de dados

O projeto cria um usuário de teste via API pública do Automation Exercise antes dos cenários que exigem autenticação e remove essa massa ao final dos cenários Web.

## Decisões técnicas

O **Automation Exercise** foi escolhido por disponibilizar publicamente login, produtos, busca, carrinho, checkout e APIs auxiliares para controle de massa.

A evolução do projeto introduziu **Page Object**, classificação por criticidade, quality gates, relatório HTML, execução cross-browser e validação de contrato de API com JSON Schema. O schema da API foi deliberadamente mantido focado na estrutura que o cenário realmente consome, reduzindo falsos positivos por mudanças irrelevantes no payload público.

## Evidências e documentação

- [Índice de evidências](docs/evidencias/INDICE.md)
- [Validação local do CI](docs/evidencias/ci-local-2026-08-19.md)
- [Suites, quality gate e HTML](docs/evidencias/quality-gate-html-2026-08-19.md)
- [Cross-browser com Cypress 14](docs/evidencias/cross-browser-cypress14-2026-08-21.md)
- [Validação técnica](docs/VALIDACAO_TECNICA.md)
- [Checklist de cobertura](docs/CHECKLIST_ENTREGA_FINAL.md)

## Competências demonstradas

- automação E2E Web;
- automação e validação de API;
- validação de contrato com JSON Schema;
- BDD com Cucumber/Gherkin;
- JavaScript aplicado a testes;
- Page Object;
- smoke, regressão e caminho crítico por tags;
- cross-browser testing;
- quality gates global e por criticidade;
- geração de relatório HTML;
- custom commands;
- massa de dados dinâmica e cleanup;
- validação de status code e payload;
- CI/CD com GitHub Actions;
- evidências e rastreabilidade de execução.

## Próximas evoluções

- cenários negativos e de contrato adicionais;
- paralelismo;
- integração com Jira/Xray ou ferramenta equivalente;
- observabilidade de flakiness e tendências de execução.
