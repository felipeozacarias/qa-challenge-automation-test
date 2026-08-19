# Automação de Testes Web e API | Cypress + JavaScript + Cucumber

Projeto prático de Quality Engineering voltado à automação de fluxos Web e API com **Cypress, JavaScript e Cucumber/Gherkin**. O foco é demonstrar uma estrutura executável e de fácil manutenção, com BDD, massa de dados dinâmica, Page Object, validações de API, CI/CD e evidências de execução.

## Resultado consolidado

Última execução local validada:

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
```

A camada `pages` concentra seletores e interações de UI. As step definitions ficam responsáveis pela tradução do comportamento Gherkin para ações de teste, enquanto os custom commands mantêm responsabilidades reutilizáveis, como lifecycle de massa de dados.

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

Executar o mesmo comando utilizado no pipeline:

```bash
npm run ci
```

## CI/CD

O workflow está versionado em:

```text
.github/workflows/qa-automation.yml
```

O pipeline é acionado em `push`, `pull_request` para `main` e também manualmente por `workflow_dispatch`.

Etapas principais:

1. checkout do repositório;
2. configuração do Node.js;
3. instalação das dependências;
4. execução completa Cypress Web + API;
5. publicação de vídeos, screenshots e relatórios como artefatos.

Os artefatos de execução são mantidos no GitHub Actions por período limitado para facilitar diagnóstico e auditoria da execução.

## Estratégia de massa de dados

Para reduzir dependência de credenciais fixas, o projeto cria um usuário de teste via API pública do Automation Exercise antes dos cenários que exigem autenticação.

Ao final dos cenários Web, o usuário criado é removido via API. Essa abordagem reduz sujeira de massa e torna os cenários mais independentes.

## Cenários BDD

### Login

```gherkin
Cenario: Realizar login com credenciais validas
  Dado que possuo um usuario de teste valido no Automation Exercise
  E acesso a pagina de login do Automation Exercise
  Quando informo as credenciais validas
  E aciono a opcao de login
  Entao devo visualizar o usuario autenticado no sistema
```

### Busca

```gherkin
Cenario: Realizar busca por produto existente
  Dado que acesso a pagina de produtos do Automation Exercise
  Quando realizo a busca pelo produto "dress"
  Entao devo visualizar produtos relacionados a busca "dress"
```

### Carrinho

```gherkin
Cenario: Incluir produto no carrinho
  Dado que acesso a pagina de produtos do Automation Exercise
  Quando adiciono o primeiro produto disponivel ao carrinho
  Entao devo visualizar a confirmacao de produto adicionado ao carrinho
```

### Checkout

```gherkin
Cenario: Validar produto incluido na tela de checkout
  Dado que estou autenticado com um usuario de teste valido no Automation Exercise
  E acesso a pagina de produtos do Automation Exercise
  Quando adiciono o primeiro produto disponivel ao carrinho
  E acesso o carrinho de compras
  E prossigo para o checkout
  Entao devo visualizar o produto incluido na tela de checkout
```

### API Trello

```gherkin
Cenario: Validar status code e campo name da estrutura list
  Dado que possuo o endpoint da API do Trello
  Quando envio uma requisicao GET para consultar o recurso
  Entao o status code da resposta deve ser 200
  E devo exibir o conteudo do campo name da estrutura list
  E o valor do campo name da estrutura list deve ser "Professional"
```

## Evidências e documentação

- [Índice de evidências](docs/evidencias/INDICE.md)
- [Resumo de evidências](docs/evidencias.md)
- [Validação técnica](docs/VALIDACAO_TECNICA.md)
- [Checklist de cobertura](docs/CHECKLIST_ENTREGA_FINAL.md)

O Cypress também gera vídeos, screenshots em falhas e relatórios Cucumber durante a execução.

## Decisões técnicas

O **Automation Exercise** foi escolhido por oferecer fluxos públicos de login, produtos, busca, carrinho e checkout, além de APIs auxiliares úteis para controlar massa de dados.

Durante a validação inicial, foi identificado um problema de mapeamento entre um passo Gherkin e sua step definition. O mapeamento foi corrigido e a suíte completa voltou a executar com sucesso.

A refatoração posterior introduziu **Page Object** para separar seletores/interações de UI das step definitions, preservando o comportamento dos cenários já validados.

## Competências demonstradas

- automação E2E Web;
- automação e validação de API;
- BDD com Cucumber/Gherkin;
- JavaScript aplicado a testes;
- Page Object e separação de responsabilidades;
- custom commands;
- criação e cleanup de massa dinâmica;
- validação de status code e payload;
- tratamento de instabilidade de ambiente público;
- CI/CD com GitHub Actions;
- evidências e rastreabilidade de execução.

## Próximas evoluções

- relatório HTML consolidado;
- tags dedicadas para smoke e regressão;
- execução cross-browser;
- paralelismo;
- integração com Jira/Xray ou ferramenta equivalente;
- expansão de cenários negativos e de contrato.
