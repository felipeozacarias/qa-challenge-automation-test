# Automação de Testes Web e API | Cypress + JavaScript + Cucumber

[![QA Automation CI](https://github.com/felipeozacarias/qa-challenge-automation-test/actions/workflows/qa-automation.yml/badge.svg)](https://github.com/felipeozacarias/qa-challenge-automation-test/actions/workflows/qa-automation.yml)

Projeto prático de Quality Engineering voltado à automação de fluxos Web e API com **Cypress, JavaScript e Cucumber/Gherkin**. O foco é demonstrar uma estrutura executável e de fácil manutenção, com BDD, massa de dados dinâmica, Page Object, suites por criticidade, quality gate, relatório HTML, CI/CD e evidências de execução.

## Resultado consolidado

Última execução local validada antes da inclusão do novo quality gate:

```text
Specs: 3
Tests: 5
Passing: 5
Failing: 0
Exit code: 0
All specs passed
```

Detalhamento:

```text
api/trello.feature: 1 teste aprovado
web/login.feature: 1 teste aprovado
web/product_flow.feature: 3 testes aprovados
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
- Cypress 13
- JavaScript
- Cucumber / Gherkin
- `@badeball/cypress-cucumber-preprocessor`
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

A camada `pages` concentra seletores e interações de UI. As step definitions traduzem o comportamento Gherkin para ações de teste, enquanto os custom commands mantêm responsabilidades reutilizáveis, como lifecycle da massa de dados.

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

Smoke:

```bash
npm run test:smoke
```

Regressão:

```bash
npm run test:regression
```

As tags utilizadas incluem `@smoke`, `@regression` e `@critical`, além das tags funcionais já existentes como `@web`, `@api`, `@login` e `@ecommerce`.

## Quality Gate

O gate é executado por:

```bash
npm run quality:gate
```

Critérios atuais:

- relatório Cucumber JSON deve existir;
- pelo menos 5 cenários devem estar presentes na execução completa;
- nenhum step pode terminar com status diferente de `passed`.

Qualquer violação encerra o processo com exit code diferente de zero.

## Relatório HTML

Após uma execução completa, o relatório pode ser gerado com:

```bash
npm run report:html
```

Arquivo gerado:

```text
reports/automation-report.html
```

O relatório é construído a partir de:

```text
cypress/reports/cucumber-report.json
```

## Execução de CI local

```bash
npm run ci
```

Esse comando executa, em sequência:

1. suíte Cypress completa sem gravação de vídeo;
2. quality gate;
3. geração do relatório HTML.

## CI/CD

Workflow:

```text
.github/workflows/qa-automation.yml
```

Acionamentos:

- `push` na `main`;
- `pull_request` para `main`;
- execução manual com `workflow_dispatch`.

Etapas principais:

1. checkout;
2. Node.js;
3. instalação de dependências;
4. execução Cypress + quality gate + relatório HTML;
5. upload de evidências e relatórios como artifacts.

## Estratégia de massa de dados

O projeto cria um usuário de teste via API pública do Automation Exercise antes dos cenários que exigem autenticação e remove essa massa ao final dos cenários Web.

## Decisões técnicas

O **Automation Exercise** foi escolhido por disponibilizar publicamente login, produtos, busca, carrinho, checkout e APIs auxiliares para controle de massa.

A evolução do projeto introduziu **Page Object** para separar seletores e interações das step definitions, além de classificação por criticidade e um gate explícito para impedir que uma execução incompleta seja tratada como aprovada.

## Evidências e documentação

- [Índice de evidências](docs/evidencias/INDICE.md)
- [Validação local do CI](docs/evidencias/ci-local-2026-08-19.md)
- [Validação técnica](docs/VALIDACAO_TECNICA.md)
- [Checklist de cobertura](docs/CHECKLIST_ENTREGA_FINAL.md)

## Competências demonstradas

- automação E2E Web;
- automação e validação de API;
- BDD com Cucumber/Gherkin;
- JavaScript aplicado a testes;
- Page Object;
- smoke e regressão por tags;
- quality gates;
- geração de relatório HTML;
- custom commands;
- massa de dados dinâmica e cleanup;
- validação de status code e payload;
- CI/CD com GitHub Actions;
- evidências e rastreabilidade de execução.

## Próximas evoluções

- execução cross-browser;
- validação de schema de API;
- paralelismo;
- integração com Jira/Xray ou ferramenta equivalente;
- expansão de cenários negativos e de contrato.
