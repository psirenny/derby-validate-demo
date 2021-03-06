var validator = require('validator');

module.exports = function (app) {
  app.on('model', function (model) {
    model.fn('validate', function (value, validate, schema) {
      var errors = [];
      value = validator.trim(value);

      if (!validate) return [];

      if (validator.isNull(value)) {
        return schema.field.required ? ['required'] : [];
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