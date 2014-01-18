module.exports = function (app) {
  app.fn('form.reset', function (e) {
    e.at().set({validate: true});
  });
};