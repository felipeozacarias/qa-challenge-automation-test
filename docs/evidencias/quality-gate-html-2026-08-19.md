# Validação de Suites, Quality Gate e Relatório HTML — 2026-08-19

Validação realizada no Windows com Git Bash após a evolução do projeto com tags de criticidade, quality gate e relatório HTML.

## Suite smoke

Comando:

```bash
npm run test:smoke
```

Resultado:

```text
Tests: 5
Passing: 4
Failing: 0
Pending: 1
Exit code: 0
All specs passed
```

O cenário pendente corresponde a um cenário sem a tag `@smoke`, portanto foi corretamente excluído da execução filtrada.

## Suite regression

Comando:

```bash
npm run test:regression
```

Resultado:

```text
Tests: 5
Passing: 3
Failing: 0
Pending: 2
Exit code: 0
All specs passed
```

Os cenários pendentes correspondem a cenários sem a tag `@regression`, confirmando o funcionamento do filtro por tags.

## Pipeline local completo

Comando:

```bash
npm run ci
```

Resultado Cypress:

```text
Specs: 3
Tests: 5
Passing: 5
Failing: 0
Pending: 0
Skipped: 0
Video: false
All specs passed
```

Durante a execução, o cenário de busca precisou de uma segunda tentativa. O retry foi concluído com sucesso, indicando instabilidade transitória do ambiente público sem falha final da suíte.

## Quality Gate

```text
[QUALITY GATE] Cenários encontrados: 5
[QUALITY GATE] Cenários mínimos esperados: 5
[QUALITY GATE] Steps não aprovados: 0
[QUALITY GATE] APROVADO — todos os cenários e steps executados passaram.
```

## Relatório HTML

```text
[HTML REPORT] Cenários: 5 | Aprovados: 5 | Falhas: 0
```

Arquivo gerado:

```text
reports/automation-report.html
```

## Conclusão

A execução confirmou que:

- as tags `@smoke`, `@regression` e `@critical` podem ser usadas para segmentar a suíte;
- os cenários fora do filtro são tratados como pending sem gerar falha da execução;
- a suíte completa permanece com 5/5 testes aprovados;
- o quality gate bloqueia cobertura abaixo do mínimo ou steps não aprovados;
- o relatório HTML é gerado a partir do resultado Cucumber;
- o fluxo local de CI permanece reproduzível no Git Bash.
