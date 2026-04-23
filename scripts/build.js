const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

function listJsFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listJsFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      files.push(fullPath);
    }
  }

  return files;
}

function checkSyntax(filePath) {
  const result = spawnSync(process.execPath, ['--check', filePath], {
    stdio: 'inherit'
  });
  return result.status === 0;
}

function main() {
  const root = path.join(__dirname, '..');
  const targets = [path.join(root, 'src'), path.join(root, 'test')]
    .filter((p) => fs.existsSync(p));

  const files = targets.flatMap(listJsFiles);
  if (files.length === 0) {
    console.log('No JS files found to check.');
    process.exit(0);
  }

  let ok = true;
  for (const f of files) {
    ok = checkSyntax(f) && ok;
  }

  if (!ok) {
    process.exit(1);
  }

  console.log('Build OK (syntax check).');
}

main();
