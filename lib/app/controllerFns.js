module.exports = function (app) {
  app.fn('event', function (e) {
    e.at().at('event').set(e.type);
  });
};