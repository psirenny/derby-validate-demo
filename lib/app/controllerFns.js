module.exports = function (app) {
  app.fn('form.event', function (e) {
    e.at().set('event', e.type);
  });

  app.fn('form.reset', function (e) {
    e.at().del();
  });
};