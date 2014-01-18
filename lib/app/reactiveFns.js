var validator = require('validator');

module.exports = function (app) {
  app.on('model', function (model) {
    model.fn('validate', function (value, schema) {
      var errors = [];
      value = validator.trim(value);

      if (validator.isNull(value)) {
        return schema.field.required ? ['Field is required.'] : [];
      }

      if (!validator.isAlphanumeric(value)) {
        if (schema.field.alphanumeric) errors.push['Field must be alphanumeric.'];
      }

      if (!validator.isLength(value, schema.field.minimumLength)) {
        if (schema.field.minimumLength) {
          errors.push['Field must be at least ' + schema.field.minimumLength +  ' characters long.'];
        }
      }

      if (!validator.isLength(value, 0, schema.field.maximumLength)) {
        if (schema.field.maximumLength) {
          errors.push['Field must be at most ' + schema.field.maximumLength +  ' characters long.'];
        }
      }

      return errors;
    });
  });
};