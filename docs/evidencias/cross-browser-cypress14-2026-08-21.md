# Validação Cross-Browser com Cypress 14 — 2026-08-21

Validação realizada no Windows com Git Bash na branch `upgrade/cypress14-firefox` após atualização controlada da stack.

## Stack validada

```text
Node.js: v22.23.2
Cypress: 14.5.4
@badeball/cypress-cucumber-preprocessor: 22.2.0
Chrome: 151
Edge: 151
Firefox: 154
```

## Caminho crítico — Chrome

Comando:

```bash
npm run test:critical:chrome
```

Resultado:

```text
Passing: 3
Failing: 0
Pending: 2
Exit code: 0
All specs passed!
```

Os dois cenários `pending` não possuem a tag `@critical` e foram corretamente excluídos pelo filtro.

## Caminho crítico — Edge

Comando:

```bash
npm run test:critical:edge
```

Resultado:

```text
Passing: 3
Failing: 0
Pending: 2
Exit code: 0
All specs passed!
```

## Caminho crítico — Firefox

Comando:

```bash
npm run test:critical:firefox
```

Resultado:

```text
Passing: 3
Failing: 0
Pending: 2
Exit code: 0
All specs passed!
```

Foi observado warning de cleanup de profile temporário (`EBUSY`) no encerramento do Firefox. O warning não alterou o exit code e ocorreu após a conclusão dos testes.

## Suíte completa + Quality Gate

O primeiro teste da suíte completa com o Electron embutido apresentou instabilidade de conexão CDP no Windows. Como os navegadores reais estavam estáveis, o comando de CI foi ajustado para executar a suíte completa explicitamente no Chrome.

Comando final validado:

```bash
npm run ci
```

Resultado:

```text
Browser: Chrome 151
Specs: 3
Tests: 5
Passing: 5
Failing: 0
Pending: 0
Skipped: 0
Video: false
All specs passed!
```

Quality Gate:

```text
[QUALITY GATE] Cenários encontrados: 5
[QUALITY GATE] Cenários mínimos esperados: 5
[QUALITY GATE] Steps não aprovados: 0
[QUALITY GATE] APROVADO — todos os cenários e steps executados passaram.
```

Relatório HTML:

```text
[HTML REPORT] Cenários: 5 | Aprovados: 5 | Falhas: 0
```

Exit code final:

```text
0
```

## Conclusão

A atualização para Cypress 14.5.4 e Cucumber preprocessor 22.2.0 preservou o comportamento da suíte e habilitou a execução crítica em Chrome, Edge e Firefox atuais.

A matriz cross-browser pode voltar a incluir os três navegadores, enquanto a suíte completa e o quality gate permanecem executados em Chrome para maior estabilidade e previsibilidade do pipeline.
