const editJsonFile = require("edit-json-file");

// If the file doesn't exist, the content will be an empty object by default.
const sourceFile = editJsonFile(`${__dirname}/package.json`);
const targerFile = editJsonFile(`${__dirname}/dist/ngx-lazy-directive/package.json`);

targerFile
    .set('version', sourceFile.get('version'))
    .set('repository', sourceFile.get('repository'))
    .set('author', sourceFile.get('author'))
    .set('keywords', sourceFile.get('keywords'))
    .set('homepage', sourceFile.get('homepage'));

targerFile.save();
