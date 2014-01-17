var app = require('derby')
  .createApp(module)
  .use(require('../../ui'))
  .use(require('derby-ui-github-buttons'));

require('./controllerFns')(app);
require('./routes')(app);