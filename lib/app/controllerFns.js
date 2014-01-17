module.exports = function (app) {
  app.fn('form', {
    event: function (e, el) {
      e.at().at('event').set(e.type);
    },
  });

  app.fn('user', {
    changeEmail: function (e) {
      var origin = this.model.get('$config.origin');
      $.post(origin + '/user/changeEmail', e.at().get());
    },
    changePassword: function (e) {
      var origin = this.model.get('$config.origin');
      $.post(origin + '/user/changePassword', e.at().get(), function () {
        e.at().del();
      });
    },
    changeUsername: function (e) {
      var origin = this.model.get('$config.origin');
      $.post(origin + '/user/changeUsername', e.at().get());
    },
    connect: {
      facebook: function (e) {
        var origin = this.model.get('$config.origin');
        $.popupWindow(origin + '/user/auth/facebook');
      },
      google: function (e) {
        var origin = this.model.get('$config.origin');
        $.popupWindow(origin + '/user/auth/google');
      },
      twitter: function (e) {
        var origin = this.model.get('$config.origin');
        $.popupWindow(origin + '/user/auth/twitter');
      }
    },
    forgotPassword: function (e) {
      var origin = this.model.get('$config.origin');
      $.post(origin + '/user/forgotPassword', e.at().get(), function () {
        e.at().del();
        e.at().set('success', true);
      });
    },
    resetPassword: function (e) {
      var self = this, origin = this.model.get('$config.origin');
      $.post(origin + '/user/resetPassword', e.at().get(), function (data) {
        self.model.set('_session.user.id', e.at().get('userId'));
        self.model.set('_session.user.isRegistered', true);
      });
    },
    signin: function (e) {
      var self = this, origin = this.model.get('$config.origin');
      $.post(origin + '/user/signin', e.at().get(), function (data) {
        self.model.set('_session.user.id', data.user.id);
        self.model.set('_session.user.isRegistered', true);
      });
    },
    signout: function (e) {
      var self = this, origin = this.model.get('$config.origin');
      $.post(origin + '/user/signout', function (data) {
        self.model.set('_session.user.id', data.user.id);
        self.model.set('_session.user.isRegistered', false);
      });
    },
    signup: function (e) {
      var self = this, origin = this.model.get('$config.origin');
      e.at().set('event', 'submit');
      console.log(e.at().get('errors'));
      return;
      $.post(origin + '/user/signup', e.at().get('data'), function () {
        self.model.set('_session.user.isRegistered', true);
      });
    },
    verifyEmail: function (e) {
      var self = this, origin = this.model.get('$config.origin');
      $.post(origin + '/user/verifyEmail', e.at().get());
    }
  });
};