var app = require('derby')
  .createApp(module)
  .use(require('../../ui'))
  .use(require('derby-ui-github-buttons'));

require('derby-validate')(app);
require('./controllerFns')(app);
require('./reactiveFns')(app);
require('./routes')(app);