module.exports = function (app) {
  app.get('/', function (page, model) {
    model.setNull('_page.form', {
      data: {
        validate: true
      },
      rules: {
        field: {
          blur: {
            alphanumeric: true,
            maximumLength: true,
            minimumLength: true
          },
          keypress: {
            alphanumeric: true,
            maximumLength: true
          }
        }
      },
      schema: {
        field: {
          alphanumeric: true,
          minimumLength: 5,
          maximumLength: 10,
          required: true
        }
      }
    });

    model.start(
      'validate',
      '_page.form.data.field.errors',
      '_page.form.data.field.value',
      '_page.form.data.validate',
      '_page.form.schema'
    );

    model.start(
      '$validate.messages',
      '_page.form.data.field.messages',
      '_page.form.data.field.errors',
      '_page.form.data.field.event',
      '_page.form.data.event',
      '_page.form.rules.field'
    );

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
};