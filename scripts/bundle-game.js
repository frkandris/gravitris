const fs = require('fs')
const path = require('path')

// Read all game files
const basePath = path.join(__dirname, '../app-old-express/client')
const outputPath = path.join(__dirname, '../public/game')

// Ensure output directory exists
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true })
}

// Read all include files
const includes = {
  gameLevelEnvironment: fs.readFileSync(path.join(basePath, 'includes/gameLevelEnvironment.js'), 'utf8'),
  playerLevelEnvironment: fs.readFileSync(path.join(basePath, 'includes/playerLevelEnvironment.js'), 'utf8'),
  blockMap: fs.readFileSync(path.join(basePath, 'includes/blockMap.js'), 'utf8'),
  colorRelated: fs.readFileSync(path.join(basePath, 'includes/colorRelated.js'), 'utf8'),
  calculationAreaDefinitions: fs.readFileSync(path.join(basePath, 'includes/calculationAreaDefinitions.js'), 'utf8'),
  statRelated: fs.readFileSync(path.join(basePath, 'includes/statRelated.js'), 'utf8'),
  drawBlock: fs.readFileSync(path.join(basePath, 'includes/drawBlock.js'), 'utf8'),
  chat: fs.readFileSync(path.join(basePath, 'includes/chat.js'), 'utf8'),
  recordGame: fs.readFileSync(path.join(basePath, 'includes/recordGame.js'), 'utf8'),
  blockGenerator: fs.readFileSync(path.join(basePath, 'includes/blockGenerator.js'), 'utf8'),
}

const mainJs = fs.readFileSync(path.join(basePath, 'main.js'), 'utf8')

// Create a simple require system
const bundle = `
(function() {
  'use strict';
  
  // Simple module system
  const modules = {};
  const moduleExports = {};
  
  function require(name) {
    if (moduleExports[name]) {
      return moduleExports[name];
    }
    
    if (modules[name]) {
      const module = { exports: {} };
      modules[name](module, module.exports, require);
      moduleExports[name] = module.exports;
      return module.exports;
    }
    
    throw new Error('Module not found: ' + name);
  }
  
  // Register modules
  ${Object.entries(includes).map(([name, code]) => {
    // Fix require paths within modules to include './includes/' prefix
    let fixedCode = code.replace(/require\('\.\/(\w+)'\)/g, "require('./includes/$1')");
    
    // Remove axios require statements
    fixedCode = fixedCode.replace(/const axios = require\('axios'\);?\n?/g, '');
    fixedCode = fixedCode.replace(/const axios = require\("axios"\);?\n?/g, '');
    
    // Replace axios.get() with fetch()
    fixedCode = fixedCode.replace(
      /axios\.get\(([^)]+)\)\s*\.then\(function\s*\(response\)\s*\{[^}]*\}\)\s*\.catch\(function\s*\(error\)\s*\{[^}]*console\.log\(error\);?[^}]*\}\)\s*\.finally\(function\s*\(\)\s*\{[^}]*\}\);?/gs,
      "fetch($1).catch(error => console.error('Fetch error:', error));"
    );
    
    // Replace axios.post() with fetch()
    fixedCode = fixedCode.replace(
      /axios\.post\('([^']+)',\s*(\w+)\)\s*\.then\(function\s*\(response\)\s*\{[^}]*\}\)\s*\.catch\(function\s*\(error\)\s*\{[^}]*console\.log\(error\);?[^}]*\}\)\s*\.finally\(function\s*\(\)\s*\{[^}]*\}\);?/gs,
      "fetch('$1', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify($2) }).catch(error => console.error('Fetch error:', error));"
    );
    
    // Update API endpoint paths from Express to Next.js format
    fixedCode = fixedCode.replace(/['"]\/increase-linesCleared-counter\//g, "'/api/counters/lines-cleared/");
    fixedCode = fixedCode.replace(/['"]\/save-game-status\/['"]/g, "'/api/game/save'");
    
    return `
  modules['./includes/${name}'] = function(module, exports, require) {
    ${fixedCode}
  };
  `;
  }).join('\n')}
  
  // Main game code
  ${mainJs.replace(/const (\w+) = require\('\.\/includes\/(\w+)'\);/g, (match, varName, moduleName) => {
    return `const ${varName} = require('./includes/${moduleName}');`
  })}
  
})();
`

// Write bundle
fs.writeFileSync(path.join(outputPath, 'main.js'), bundle, 'utf8')
console.log('Game bundle created successfully!')
