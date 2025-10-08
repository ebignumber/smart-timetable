const fs = require('fs');

let report = '## 🔍 ESLint Results\n\n';
let totalErrors = 0;
let totalWarnings = 0;

const projects = ['frontend', 'backend'];

projects.forEach(project => {
  const jsonPath = `${project}/eslint-results.json`;
  
  if (!fs.existsSync(jsonPath)) {
    report += `### ${project.charAt(0).toUpperCase() + project.slice(1)}\n`;
    report += '✅ No ESLint configuration or results found\n\n';
    return;
  }
  
  const results = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  const projectErrors = results.reduce((sum, file) => sum + file.errorCount, 0);
  const projectWarnings = results.reduce((sum, file) => sum + file.warningCount, 0);
  
  totalErrors += projectErrors;
  totalWarnings += projectWarnings;
  
  report += `### ${project.charAt(0).toUpperCase() + project.slice(1)}\n\n`;
  
  if (projectErrors === 0 && projectWarnings === 0) {
    report += '✅ No issues found!\n\n';
    return;
  }
  
  const filesWithIssues = results.filter(file => file.errorCount > 0 || file.warningCount > 0);
  
  filesWithIssues.forEach(file => {
    const fileName = file.filePath.split(`${project}/`)[1] || file.filePath;
    const issueCount = `${file.errorCount} error${file.errorCount !== 1 ? 's' : ''}, ${file.warningCount} warning${file.warningCount !== 1 ? 's' : ''}`;
    
    report += `<details>\n<summary>📄 <code>${fileName}</code> (${issueCount})</summary>\n\n`;
    report += '```\n';
    
    file.messages.forEach(msg => {
      const severity = msg.severity === 2 ? '❌' : '⚠️';
      report += `${severity} Line ${msg.line}:${msg.column} - ${msg.message}`;
      if (msg.ruleId) {
        report += ` (${msg.ruleId})`;
      }
      report += '\n';
    });
    
    report += '```\n</details>\n\n';
  });
  
  report += `**${project.charAt(0).toUpperCase() + project.slice(1)} Summary:** ${projectErrors} error${projectErrors !== 1 ? 's' : ''}, ${projectWarnings} warning${projectWarnings !== 1 ? 's' : ''}\n\n`;
});

report += '---\n';
report += `**Total: ${totalErrors} error${totalErrors !== 1 ? 's' : ''}, ${totalWarnings} warning${totalWarnings !== 1 ? 's' : ''} found**\n`;

fs.writeFileSync('eslint-report.txt', report);
