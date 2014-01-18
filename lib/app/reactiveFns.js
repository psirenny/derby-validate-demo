var validator = require('validator');

module.exports = function (app) {
  app.on('model', function (model) {
    model.fn('validate', function (value, schema) {
      var errors = [];
      value = validator.trim(value);

      if (validator.isNull(value)) {
        if (schema.field.required) return ['required'];
      }

      if (!validator.isAlphanumeric(value)) {
        if (schema.field.alphanumeric) errors.push('alphanumeric');
      }

      if (!validator.isLength(value, schema.field.minimumLength)) {
        if (schema.field.minimumLength) errors.push('minimumLength');
      }

      if (!validator.isLength(value, 0, schema.field.maximumLength)) {
        if (schema.field.maximumLength) errors.push('maximumLength');
      }

      return errors;
    });
  });
};