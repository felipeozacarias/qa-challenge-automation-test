const fs = require('fs');
const path = require('path');

const inputPath = path.resolve('cypress/reports/cucumber-report.json');
const outputDir = path.resolve('reports');
const outputPath = path.join(outputDir, 'automation-report.html');

if (!fs.existsSync(inputPath)) {
  console.error(`[HTML REPORT] Relatório Cucumber não encontrado: ${inputPath}`);
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const rows = [];
let totalScenarios = 0;
let passedScenarios = 0;
let failedScenarios = 0;

for (const feature of Array.isArray(report) ? report : []) {
  for (const scenario of feature.elements || []) {
    if (!Array.isArray(scenario.steps)) continue;
    totalScenarios += 1;
    const failedSteps = scenario.steps.filter((step) => step?.result?.status !== 'passed');
    const passed = failedSteps.length === 0;
    if (passed) passedScenarios += 1;
    else failedScenarios += 1;

    const tags = (scenario.tags || []).map((tag) => tag.name).join(', ');
    rows.push(`
      <tr>
        <td>${escapeHtml(feature.name || '')}</td>
        <td>${escapeHtml(scenario.name || '')}</td>
        <td>${escapeHtml(tags)}</td>
        <td>${passed ? 'PASS' : 'FAIL'}</td>
      </tr>`);
  }
}

fs.mkdirSync(outputDir, { recursive: true });

const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>QA Automation Report</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 1100px; margin: 40px auto; padding: 0 20px; line-height: 1.5; }
    .summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 24px 0; }
    .card { border: 1px solid #ddd; border-radius: 8px; padding: 16px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { border-bottom: 1px solid #ddd; text-align: left; padding: 10px; vertical-align: top; }
    th { background: #f5f5f5; }
    code { background: #f5f5f5; padding: 2px 5px; border-radius: 4px; }
  </style>
</head>
<body>
  <h1>Relatório de Automação Web e API</h1>
  <p>Gerado a partir do relatório JSON do Cucumber.</p>
  <div class="summary">
    <div class="card"><strong>Cenários</strong><br>${totalScenarios}</div>
    <div class="card"><strong>Aprovados</strong><br>${passedScenarios}</div>
    <div class="card"><strong>Falhas</strong><br>${failedScenarios}</div>
  </div>
  <table>
    <thead><tr><th>Feature</th><th>Cenário</th><th>Tags</th><th>Status</th></tr></thead>
    <tbody>${rows.join('')}</tbody>
  </table>
  <p><small>Fonte: <code>cypress/reports/cucumber-report.json</code></small></p>
</body>
</html>`;

fs.writeFileSync(outputPath, html, 'utf8');
console.log(`[HTML REPORT] Gerado: ${outputPath}`);
console.log(`[HTML REPORT] Cenários: ${totalScenarios} | Aprovados: ${passedScenarios} | Falhas: ${failedScenarios}`);

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
