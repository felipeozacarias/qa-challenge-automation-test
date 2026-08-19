# Evidências de Execução

Este documento resume os artefatos e pontos comprovados na execução local do projeto.

## Execução completa

Comando:

```bash
npm run cy:run
```

Resultado validado:

```text
Specs: 3
Tests: 5
Passing: 5
Failing: 0
All specs passed
```

## Artefatos gerados

- vídeos em `cypress/videos`;
- screenshots em `cypress/screenshots` apenas em caso de falha;
- relatório JSON em `cypress/reports/cucumber-report.json`.

## Pontos validados

- Login válido com usuário criado via API pública do Automation Exercise;
- Busca de produto;
- Inclusão de produto no carrinho;
- Validação do produto no checkout;
- GET na API do Trello;
- Validação de status code 200;
- Validação do campo `data.list.name = Professional`.
