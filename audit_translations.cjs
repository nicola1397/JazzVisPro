
const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/nicol/Desktop/GEMINI/Update Android App/jazz-viz-pro/src';
const enPath = path.join(srcDir, 'i18n/en.js');
const itPath = path.join(srcDir, 'i18n/it.js');

function getFiles(dir, allFiles) {
  const files = fs.readdirSync(dir);
  allFiles = allFiles || [];
  files.forEach(file => {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, allFiles);
    } else {
      if (name.endsWith('.vue') || name.endsWith('.js')) {
        allFiles.push(name);
      }
    }
  });
  return allFiles;
}

const keysInCode = new Set();

// Regex for t('key') or t("key")
const tRegex = /t\(['"]([^'"]+)['"]\)/g;

// Also look for meta: { title: 'key' } in router
const metaRegex = /title\s*:\s*['"]([^'"]+)['"]/g;

const files = getFiles(srcDir);
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = tRegex.exec(content)) !== null) {
    keysInCode.add(match[1]);
  }
  while ((match = metaRegex.exec(content)) !== null) {
    if (match[1].includes('.') || match[1].startsWith('quiz.title')) {
       keysInCode.add(match[1]);
    }
  }
});

// Load translations
function loadTranslations(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const keys = {};
  const regex = /['"]([^'"]+)['"]\s*:\s*['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    keys[match[1]] = true;
  }
  return keys;
}

const enKeys = loadTranslations(enPath);
const itKeys = loadTranslations(itPath);

console.log('--- AUDIT RESULTS ---');

const missingInEn = [];
const missingInIt = [];

keysInCode.forEach(key => {
  if (!enKeys[key]) missingInEn.push(key);
  if (!itKeys[key]) missingInIt.push(key);
});

console.log('\nMissing in EN:');
missingInEn.sort().forEach(k => console.log(k));

console.log('\nMissing in IT:');
missingInIt.sort().forEach(k => console.log(k));

const onlyInEn = Object.keys(enKeys).filter(k => !itKeys[k]);
const onlyInIt = Object.keys(itKeys).filter(k => !enKeys[k]);

console.log('\nOnly in EN (Not in IT):');
onlyInEn.sort().forEach(k => console.log(k));

console.log('\nOnly in IT (Not in EN):');
onlyInIt.sort().forEach(k => console.log(k));

// Special checks for dynamic keys
console.log('\n--- DYNAMIC KEYS CHECK ---');

// Quiz categories
// Need to find which categories are used in code or data
// Usually in src/utils/quiz_db.js
const quizDbPath = path.join(srcDir, 'utils/quiz_db.js');
if (fs.existsSync(quizDbPath)) {
    const quizDb = fs.readFileSync(quizDbPath, 'utf8');
    const catRegex = /category\s*:\s*['"]([^'"]+)['"]/g;
    const cats = new Set();
    let m;
    while ((m = catRegex.exec(quizDb)) !== null) {
        cats.add('quiz.cat.' + m[1]);
    }
    console.log('Quiz categories found in quiz_db.js:');
    cats.forEach(c => {
        if (!enKeys[c] || !itKeys[c]) {
            console.log(`MISSING: ${c} (EN: ${!!enKeys[c]}, IT: ${!!itKeys[c]})`);
        } else {
            // console.log(`OK: ${c}`);
        }
    });
}

// Groove Trainer presets
// gt.preset-*
const gtPath = path.join(srcDir, 'views/GrooveTrainerView.vue');
if (fs.existsSync(gtPath)) {
    const gtContent = fs.readFileSync(gtPath, 'utf8');
    const presetRegex = /['"]gt\.preset-([^'"]+)['"]/g;
    let m;
    while ((m = presetRegex.exec(gtContent)) !== null) {
        const k = 'gt.preset-' + m[1];
        if (!enKeys[k] || !itKeys[k]) {
            console.log(`MISSING GT Preset: ${k} (EN: ${!!enKeys[k]}, IT: ${!!itKeys[k]})`);
        }
    }
}
