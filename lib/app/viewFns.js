module.exports = function (app) {
  app.view.fn('msg', function (message, schema) {
    switch (message) {
      case 'alphanumeric':
        return 'Field must be alphanumeric.';
      case 'maximumLength':
        return 'Field must be at most ' + schema.field.maximumLength + ' characters long.';
      case 'minimumLength':
        return 'Field must be at least ' + schema.field.minimumLength + ' characters long.';
      case 'required':
        return 'Field is required.';
    }
  });
};