# Automação de Testes Web e API | Cypress + JavaScript + Cucumber

[![QA Automation CI](https://github.com/felipeozacarias/qa-challenge-automation-test/actions/workflows/qa-automation.yml/badge.svg)](https://github.com/felipeozacarias/qa-challenge-automation-test/actions/workflows/qa-automation.yml)

Projeto prático de Quality Engineering voltado à automação de fluxos Web e API com **Cypress, JavaScript e Cucumber/Gherkin**. O foco é demonstrar uma estrutura executável e de fácil manutenção, com BDD, massa de dados dinâmica, Page Object, suites por criticidade, quality gate, relatório HTML, CI/CD, execução cross-browser e evidências de execução.

## Resultado consolidado

Última execução local validada na branch de upgrade:

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
Chrome 151: 3 passing / 0 failing
Edge 151: 3 passing / 0 failing
Firefox 154: 3 passing / 0 failing
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
- validação do campo `data.list.name` com valor esperado `Professional`.

## Tecnologias

- Node.js 22
- Cypress 14.5.4
- JavaScript
- Cucumber / Gherkin
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
├── fixtures/
│   └── users.json
├── pages/
│   └── automationExercise.page.js
└── support/
    ├── commands.js
    └── e2e.js

scripts/
├── quality-gate.js
└── generate-html-report.js
```

## Instalação

```bash
git clone https://github.com/felipeozacarias/qa-challenge-automation-test.git
cd qa-challenge-automation-test
npm install
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

O caminho crítico pode ser executado individualmente em navegadores reais:

```bash
npm run test:critical:chrome
npm run test:critical:edge
npm run test:critical:firefox
```

A estratégia adotada executa a suíte completa no navegador principal e o caminho crítico nos navegadores adicionais, reduzindo custo sem abrir mão de cobertura de compatibilidade.

## Quality Gate

```bash
npm run quality:gate
```

Critérios atuais:

- relatório Cucumber JSON deve existir;
- pelo menos 5 cenários devem estar presentes na execução completa;
- nenhum step pode terminar com status diferente de `passed`.

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
2. quality gate;
3. geração do relatório HTML.

## CI/CD

Workflow:

```text
.github/workflows/qa-automation.yml
```

O pipeline contém dois níveis:

```text
Full Suite + Quality Gate
└── Chrome

Critical Cross-Browser
├── Chrome
├── Edge
└── Firefox
```

Acionamentos:

- `push` na `main`;
- `pull_request` para `main`;
- execução manual com `workflow_dispatch`.

## Estratégia de massa de dados

O projeto cria um usuário de teste via API pública do Automation Exercise antes dos cenários que exigem autenticação e remove essa massa ao final dos cenários Web.

## Decisões técnicas

O **Automation Exercise** foi escolhido por disponibilizar publicamente login, produtos, busca, carrinho, checkout e APIs auxiliares para controle de massa.

A evolução do projeto introduziu **Page Object**, classificação por criticidade, quality gate, relatório HTML e execução cross-browser. A atualização para Cypress 14.5.4 foi realizada de forma controlada para garantir compatibilidade com versões atuais do Firefox sem perder a estabilidade já validada em Chrome e Edge.

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
- BDD com Cucumber/Gherkin;
- JavaScript aplicado a testes;
- Page Object;
- smoke, regressão e caminho crítico por tags;
- cross-browser testing;
- quality gates;
- geração de relatório HTML;
- custom commands;
- massa de dados dinâmica e cleanup;
- validação de status code e payload;
- CI/CD com GitHub Actions;
- evidências e rastreabilidade de execução.

## Próximas evoluções

- validação de schema de API;
- quality gate por criticidade;
- paralelismo;
- integração com Jira/Xray ou ferramenta equivalente;
- expansão de cenários negativos e de contrato.
