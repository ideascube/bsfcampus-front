define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryserialize',
        'app/config',

        'pods/user/models/current',

        'app/abstract-view',

        'text!pods/user/connection/templates/register.html',

        'less!pods/user/connection/styles/register'
    ],
    function ($, _, Backbone, $serialize, Config,
              currentUser,
              AbstractView,
              registerTemplate) {

        return AbstractView.extend({

            tagName: 'div',

            template: _.template(registerTemplate),

            events: {
                'submit form': 'submit',
                'click #got-account-btn': 'redirect_to_login'
            },

            render: function () {
                var html = this.template({config: Config});
                this.$el.html(html);
                this.$('form input').focus();

                return this;
            },

            submit: function (e) {
                e.preventDefault();

                var formData = this.$('form').serializeJSON();
                var username = this.$('form #username').val();
                var password = this.$('form #password').val();

                var self = this;
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/users/register",
                    data: formData,
                    dataType: 'json'
                }).done(function (result) {
                    console.log("submit result = ", result);
                    currentUser
                        .logIn(username, password)
                        .done(function(){
                            self.trigger('close');
                        });
                }).fail(function (error) {
                    console.log("Could not submit register data", error);
                    self.$el.find('form .error').removeClass('error');
                    var $registerError = self.$el.find('#register-error');
                    switch (error.responseJSON.code){
                        case Config.constants.registerErrorsCode.USERNAME_ALREADY_EXISTS:
                            self.$el.find('form input#username').addClass('error');
                            $registerError.html(Config.stringsDict.USER.REGISTER_ERROR.USERNAME_ALREADY_EXISTS);
                            break;
                        case Config.constants.registerErrorsCode.INVALID_EMAIL_ADDRESS:
                            self.$el.find('form input#email').addClass('error');
                            $registerError.html(Config.stringsDict.USER.REGISTER_ERROR.INVALID_EMAIL_ADDRESS);
                            break;
                        case Config.constants.registerErrorsCode.PASSWORD:
                            self.$el.find('form input#password').addClass('error');
                            $registerError.html(Config.stringsDict.USER.REGISTER_ERROR.PASSWORD);
                            break;
                        case Config.constants.registerErrorsCode.PASSWORD_MATCH:
                            self.$el.find('form input#password_confirm').addClass('error');
                            $registerError.html(Config.stringsDict.USER.REGISTER_ERROR.PASSWORD_MATCH);
                            break;
                        case Config.constants.registerErrorsCode.ACCEPT_CGU:
                            self.$el.find('form input#accept_cgu+label.check-box').addClass('error');
                            $registerError.html(Config.stringsDict.USER.REGISTER_ERROR.ACCEPT_CGU);
                            break;
                        default:
                            $registerError.html(Config.stringsDict.USER.REGISTER_ERROR.DEFAULT_ERROR);
                            break;
                    }
                });
            },

            redirect_to_login: function () {
                Backbone.history.loadUrl("/login/redirect");
            }
        });
    }
);
