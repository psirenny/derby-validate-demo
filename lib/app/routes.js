module.exports = function (app) {
  app.get('/', function (page) {
    page.render('home');
  });

  app.get('/403', function (page) {
    page.render('403');
  });

  app.get('/404', function (page) {
    page.render('404');
  });

  app.get('/500', function (page) {
    page.render('500');
  });

  app.get('/forgot', function (page, model) {
    model.set('_page.public', true);
    page.render('forgot');
  });

  app.get('/reset/:userId/:token', function (page, model) {
    model.set('_page.form.token', page.params.token);
    model.set('_page.form.userId', page.params.userId);
    model.set('_page.public', true);
    page.render('reset');
  });

  app.get('/settings', function (page, model) {
    model.setNull('_page.form.username.username', model.get('_page.user.public.local.username'));
    model.setNull('_page.form.email.email', model.get('_page.user.private.local.emails.0.value'));
    model.set('_page.private', true);
    page.render('settings');
  });

  app.get('/signin', function (page, model) {
    model.set('_page.public', true);
    page.render('signin');
  });

  app.get('/signup', function (page, model) {
    model.set('_page.public', true);
    model.set('$user.validate.config', {
      email: {
        blur: ['user.validate.email.invalid']
      },
      password: {
        blur: ['user.validate.password.maximumLength', 'user.validate.password.minimumLength'],
        keypress: ['user.validate.password.maximumLength']
      },
      username: {
        blur: ['user.validate.username.maximumLength', 'user.validate.username.minimumLength'],
        keypress: ['user.validate.username.maximumLength']
      }
    });
    model.start('$user.validate.signup.form.errors', '_page.form.errors', '_page.form.email.value', '_page.form.password.value', '_page.form.username.value', '$user.validate.schema');
    model.start('$user.validate.signup.email.errors', '_page.form.email.errors', '_page.form.email.value', '$user.validate.schema');
    model.start('$user.validate.signup.password.errors', '_page.form.password.errors', '_page.form.password.value', '$user.validate.schema');
    model.start('$user.validate.signup.username.errors', '_page.form.username.errors', '_page.form.username.value', '$user.validate.schema');
    model.start('$validate.messages', '_page.form.email.messages', '_page.form.email.errors', '_page.form.email.event', '_page.form.event', '$user.validate.config.email');
    model.start('$validate.messages', '_page.form.password.messages', '_page.form.password.errors', '_page.form.password.event', '_page.form.event', '$user.validate.config.password');
    model.start('$validate.messages', '_page.form.username.messages', '_page.form.username.errors', '_page.form.username.event', '_page.form.event', '$user.validate.config.username');
    page.render('signup');
  });

  app.get('/user/auth/:provider/done', function (page, model) {
    page.render('home');
  });

  app.enter('/user/auth/:provider/done', function (model) {
    if (!window.opener) return;
    var userId = model.get('_session.user.id');
    window.opener.DERBY.app.model.set('_session.user.id', userId);
    window.opener.DERBY.app.model.set('_session.user.registered', true);
    window.close();
  });
};