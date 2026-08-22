const fs = require('fs');
const path = require('path');

const reportPath = path.resolve('cypress/reports/cucumber-report.json');
const minimumCriticalScenarios = Number(process.argv[2] || 3);

if (!fs.existsSync(reportPath)) {
  console.error(`[CRITICAL GATE] Falha: relatório não encontrado em ${reportPath}`);
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const criticalScenarios = [];

for (const feature of Array.isArray(report) ? report : []) {
  const featureTags = (feature.tags || []).map((tag) => tag.name);
  for (const element of feature.elements || []) {
    const scenarioTags = (element.tags || []).map((tag) => tag.name);
    const tags = new Set([...featureTags, ...scenarioTags]);
    if (tags.has('@critical')) {
      criticalScenarios.push({ feature: feature.name, ...element });
    }
  }
}

const failures = [];
for (const scenario of criticalScenarios) {
  const steps = scenario.steps || [];
  if (steps.length === 0) {
    failures.push(`${scenario.name}: cenário crítico sem steps executados`);
    continue;
  }

  for (const step of steps) {
    const status = step?.result?.status || 'unknown';
    if (status !== 'passed') {
      failures.push(`${scenario.name} > ${step.name}: ${status}`);
    }
  }
}

console.log('[CRITICAL GATE] Cenários críticos encontrados:', criticalScenarios.length);
console.log('[CRITICAL GATE] Mínimo esperado:', minimumCriticalScenarios);
console.log('[CRITICAL GATE] Steps críticos não aprovados:', failures.length);

if (criticalScenarios.length < minimumCriticalScenarios) {
  console.error(`[CRITICAL GATE] Falha: cobertura crítica abaixo do mínimo (${criticalScenarios.length}/${minimumCriticalScenarios}).`);
  process.exit(1);
}

if (failures.length > 0) {
  failures.forEach((failure) => console.error(`[CRITICAL GATE] ${failure}`));
  process.exit(1);
}

console.log('[CRITICAL GATE] APROVADO — cobertura e execução crítica atendidas.');
