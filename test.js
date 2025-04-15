console.log('Starting test...');

// Test loading some modules
try {
  const fs = require('fs');
  console.log('Successfully loaded fs module');
  
  // Try to read package.json
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  console.log('React version:', packageJson.dependencies.react);
  console.log('Package.json loaded successfully');
} catch (err) {
  console.error('Error loading modules:', err);
}

console.log('Test completed'); 