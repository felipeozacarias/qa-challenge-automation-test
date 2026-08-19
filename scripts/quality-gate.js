const fs = require('fs');
const path = require('path');

const reportPath = path.resolve('cypress/reports/cucumber-report.json');
const minimumScenarios = Number(process.argv[2] || 5);

if (!fs.existsSync(reportPath)) {
  console.error(`[QUALITY GATE] Falha: relatório não encontrado em ${reportPath}`);
  process.exit(1);
}

let report;
try {
  report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
} catch (error) {
  console.error(`[QUALITY GATE] Falha ao ler JSON: ${error.message}`);
  process.exit(1);
}

const scenarios = [];
for (const feature of Array.isArray(report) ? report : []) {
  for (const element of feature.elements || []) {
    if (element.type === 'scenario' || Array.isArray(element.steps)) {
      scenarios.push({ feature: feature.name, ...element });
    }
  }
}

const failures = [];
for (const scenario of scenarios) {
  const steps = scenario.steps || [];
  if (steps.length === 0) {
    failures.push(`${scenario.name}: cenário sem steps executados`);
    continue;
  }

  for (const step of steps) {
    const status = step?.result?.status || 'unknown';
    if (status !== 'passed') {
      failures.push(`${scenario.name} > ${step.name}: ${status}`);
    }
  }
}

console.log('[QUALITY GATE] Cenários encontrados:', scenarios.length);
console.log('[QUALITY GATE] Cenários mínimos esperados:', minimumScenarios);
console.log('[QUALITY GATE] Steps não aprovados:', failures.length);

if (scenarios.length < minimumScenarios) {
  console.error(`[QUALITY GATE] Falha: cobertura executada abaixo do mínimo (${scenarios.length}/${minimumScenarios}).`);
  process.exit(1);
}

if (failures.length > 0) {
  failures.forEach((failure) => console.error(`[QUALITY GATE] ${failure}`));
  process.exit(1);
}

console.log('[QUALITY GATE] APROVADO — todos os cenários e steps executados passaram.');
