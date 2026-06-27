# Evidencias de execucao

Preencher apos a execucao local antes de enviar ao avaliador.

## Execucao completa

Comando:

```bash
npm run cy:run
```

Resultado esperado:

- Cenarios web executados.
- Cenario API executado.
- Screenshots gerados apenas em caso de falha.
- Videos gerados em `cypress/videos`.
- Relatorio JSON em `cypress/reports/cucumber-report.json`.

## Pontos validados

- Login valido com usuario criado via API publica do Automation Exercise.
- Busca de produto.
- Inclusao de produto no carrinho.
- Validacao do produto no checkout.
- GET na API do Trello.
- Validacao de status code 200.
- Validacao do campo `data.list.name = Professional`.
