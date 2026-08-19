# Automação de Testes Web e API | Cypress + JavaScript + Cucumber

Projeto prático de QA voltado à automação de fluxos Web e API, utilizando Cypress, JavaScript e Cucumber/Gherkin. A proposta é demonstrar uma estrutura simples de manter, com cenários BDD, massa de dados controlada, validações de API e evidências de execução.

## Objetivo

Automatizar fluxos críticos de uma aplicação de e-commerce e uma validação de API:

### Web

- Login válido;
- Busca de produto;
- Inclusão de produto no carrinho;
- Validação do produto incluído na tela de checkout/pagamento.

### API

- Envio de requisição `GET` para a API do Trello;
- Validação do status code;
- Exibição e validação do campo `data.list.name`.

## Decisão técnica sobre URL utilizada

Foi utilizado o site **Automation Exercise** por oferecer fluxo público de login, produtos, busca, carrinho, checkout e APIs auxiliares para criação de massa de dados, sendo adequado para um projeto prático de automação de e-commerce.

URL base utilizada:

```text
https://automationexercise.com
```

API Trello utilizada:

```text
https://api.trello.com/1/actions/592f11060f95a3d3d46a987a
```

## Tecnologias

- Node.js 18+
- Cypress
- JavaScript
- Cucumber / Gherkin
- @badeball/cypress-cucumber-preprocessor
- @bahmutov/cypress-esbuild-preprocessor

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/felipeozacarias/qa-challenge-automation-test.git
cd qa-challenge-automation-test
npm install
```

## Execução dos testes

Abrir Cypress em modo interativo:

```bash
npm run cy:open
```

Executar todos os testes em modo headless:

```bash
npm run cy:run
```

Executar somente os testes Web:

```bash
npm run test:web
```

Executar somente os testes API:

```bash
npm run test:api
```

## Estrutura do projeto

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
└── support/
    ├── commands.js
    └── e2e.js
```

## Cenários automatizados

### Login

```gherkin
Cenário: Realizar login com credenciais válidas
  Dado que possuo um usuário de teste válido no Automation Exercise
  E acesso a página de login do Automation Exercise
  Quando informo as credenciais válidas
  E aciono a opção de login
  Então devo visualizar o usuário autenticado no sistema
```

### Busca

```gherkin
Cenário: Realizar busca por produto existente
  Dado que acesso a página de produtos do Automation Exercise
  Quando realizo a busca pelo produto "dress"
  Então devo visualizar produtos relacionados à busca "dress"
```

### Carrinho

```gherkin
Cenário: Incluir produto no carrinho
  Dado que acesso a página de produtos do Automation Exercise
  Quando adiciono o primeiro produto disponível ao carrinho
  Então devo visualizar a confirmação de produto adicionado ao carrinho
```

### Checkout

```gherkin
Cenário: Validar produto incluído na tela de checkout
  Dado que estou autenticado com um usuário de teste válido no Automation Exercise
  E acesso a página de produtos do Automation Exercise
  Quando adiciono o primeiro produto disponível ao carrinho
  E acesso o carrinho de compras
  E prossigo para o checkout
  Então devo visualizar o produto incluído na tela de checkout
```

### API Trello

```gherkin
Cenário: Validar status code e campo name da estrutura list
  Dado que possuo o endpoint da API do Trello
  Quando envio uma requisição GET para consultar o recurso
  Então o status code da resposta deve ser 200
  E devo exibir o conteúdo do campo name da estrutura list
  E o valor do campo name da estrutura list deve ser "Professional"
```

## Estratégia de massa de dados

Para reduzir dependência de usuário fixo, o projeto cria um usuário de teste via API pública do Automation Exercise antes dos cenários que exigem autenticação.

Ao final dos cenários Web, o usuário criado é removido via API, reduzindo sujeira de massa no ambiente público.

## Relatórios e evidências

O projeto gera:

- vídeos de execução em `cypress/videos`;
- screenshots em falhas em `cypress/screenshots`;
- JSON do Cucumber em `cypress/reports/cucumber-report.json`.

## Observações e Decisões Técnicas

Durante a construção do projeto, priorizei primeiro os fluxos críticos para garantir uma base funcional e executável. Depois, complementei a solução com evidências, checklist de cobertura e ajustes de estabilidade.

Escolhi utilizar o Automation Exercise por oferecer os fluxos necessários para demonstrar automação de login, produtos, busca, carrinho e checkout. Para reduzir dependência de credenciais fixas, optei por criar um usuário de teste dinamicamente e remover essa massa ao final da execução.

Durante a validação local, identifiquei um problema de mapeamento entre um passo Gherkin e sua step definition. Corrigi o texto do cenário e executei novamente a suíte completa, finalizando com todos os testes aprovados.

## Boas práticas aplicadas

- Escrita dos cenários em Gherkin;
- Separação entre features e step definitions;
- Custom commands para ações reutilizáveis;
- Criação dinâmica de massa de dados;
- Cleanup da massa criada;
- Validação de status code e payload em API;
- README com instruções de instalação e execução.

## Evoluções possíveis

Em uma próxima evolução, eu adicionaria:

- Page Objects mais completos;
- relatório HTML consolidado;
- execução em pipeline CI/CD;
- paralelismo;
- integração com Jira/Xray;
- tags por smoke, regressivo e crítico;
- cobertura ampliada de cenários negativos.
