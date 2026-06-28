# Checklist de Entrega Final - Desafio 1 Automacao

Data de consolidacao: 2026-06-28
Projeto: qa-challenge-automation-test

## Objetivo do desafio

Criar um framework de automacao utilizando Cypress, JavaScript e Cucumber/Gherkin, contemplando testes Web e API, com README contendo orientacoes de instalacao e execucao.

## Checklist de criterios solicitados

| Criterio | Status | Observacao |
|---|---|---|
| Cucumber para BDD | Atendido | Cenarios escritos em arquivos `.feature`. |
| JavaScript | Atendido | Steps e comandos implementados em JavaScript. |
| Cypress | Atendido | Framework configurado no projeto e validado localmente. |
| README com instalacao | Atendido | README possui clone, instalacao e comandos de execucao. |
| Login Web | Atendido | Cenario de login valido usando usuario criado dinamicamente. |
| Busca Web | Atendido | Cenario de busca de produto existente. |
| Inclusao no carrinho | Atendido | Cenario adiciona produto ao carrinho e valida confirmacao. |
| Validacao no checkout | Atendido | Cenario valida produto incluido na tela de checkout/pagamento. |
| GET API Trello | Atendido | Requisicao GET implementada para endpoint informado. |
| Status code API | Atendido | Validacao de status code 200. |
| Campo `list.name` | Atendido | Validacao do valor `Professional`. |

## Execucao local realizada

Comandos executados localmente em Windows / PowerShell:

```bash
npm install
npx cypress verify
npm run test:api
npm run test:web
npm run cy:run
```

## Resultado da execucao completa

Resultado final de `npm run cy:run`:

- Specs executadas: 3
- Testes executados: 5
- Testes aprovados: 5
- Falhas: 0
- Pendentes: 0
- Ignorados: 0

Resumo:

```text
api/trello.feature: 1 teste aprovado
web/login.feature: 1 teste aprovado
web/product_flow.feature: 3 testes aprovados
All specs passed
```

## Evidencias geradas

Videos gerados localmente pelo Cypress:

```text
cypress/videos/api/trello.feature.mp4
cypress/videos/web/login.feature.mp4
cypress/videos/web/product_flow.feature.mp4
```

## Observacoes tecnicas

- Foi utilizado Automation Exercise, conforme permitido pelo enunciado em caso de uso de URL similar.
- Optei por criar usuario de teste dinamicamente para reduzir dependencia de credencial fixa.
- O projeto utiliza comandos customizados para reduzir duplicidade e facilitar manutencao.
- Houve ajuste em um texto de step Gherkin durante a validacao local, e apos a correcao a suite Web passou integralmente.
- Como o ambiente Web e publico, o retry foi mantido para reduzir falso negativo por oscilacao externa.

## Parecer final

O Desafio 1 atende aos criterios solicitados e foi validado localmente com sucesso. A entrega esta pronta para avaliacao tecnica.
