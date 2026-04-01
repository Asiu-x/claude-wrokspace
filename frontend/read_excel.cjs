const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const dir = 'C:/Users/jchu4.IFLYTEK/Downloads/requirements/requirements';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.xlsx')).sort();

for (const fileName of files) {
  const filePath = path.join(dir, fileName);
  console.log('='.repeat(80));
  console.log(`FILE: ${fileName}`);
  console.log('='.repeat(80));

  let workbook;
  try {
    workbook = XLSX.readFile(filePath);
  } catch (e) {
    console.log(`ERROR reading file: ${e.message}`);
    console.log('');
    continue;
  }

  console.log(`Sheets: ${workbook.SheetNames.join(', ')}`);
  console.log('');

  for (const sheetName of workbook.SheetNames) {
    console.log('-'.repeat(60));
    console.log(`SHEET: ${sheetName}`);
    console.log('-'.repeat(60));

    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '', raw: false });

    if (data.length === 0) {
      console.log('(empty sheet)');
      console.log('');
      continue;
    }

    // Find max columns
    let maxCols = 0;
    for (const row of data) {
      if (row.length > maxCols) maxCols = row.length;
    }

    // Print each row
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const cells = [];
      for (let j = 0; j < maxCols; j++) {
        const val = j < row.length ? String(row[j]) : '';
        cells.push(val);
      }
      console.log(`Row ${i}: ${cells.join(' | ')}`);
    }
    console.log('');
  }
  console.log('');
}
