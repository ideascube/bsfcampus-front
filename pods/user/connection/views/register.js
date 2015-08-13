define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryserialize',
        'app/config',

        'pods/user/models/current',

        'text!pods/user/connection/templates/register.html',

        'less!pods/user/connection/styles/register'
    ],
    function ($, _, Backbone, $serialize, Config,
              currentUser,
              AbstractView,
              registerTemplate) {

        return Backbone.View.extend({

            className: 'modal fade',

            id: 'register-modal',

            template: _.template(registerTemplate),

            events: {
                'submit form': 'submit',
                'click #got-account-btn': 'redirectToLogin'
            },

            render: function () {
                var html = this.template({config: Config});
                this.$el.html(html);

                this.$registerError = this.$("#register-error");

                return this;
            },

            submit: function (e) {
                e.preventDefault();

                this.$registerError.empty();

                var formData = JSON.stringify(this.$('form').serializeObject());
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
                    currentUser
                        .logIn(username, password)
                        .done(function(){
                            self.$el.modal('hide');
                        });
                }).fail(function (error) {
                    self.$('form .has-error').removeClass('has-error');
                    switch (error.responseJSON.code){
                        case Config.constants.registerErrorsCode.USERNAME_ALREADY_EXISTS:
                            self.$('form #username').closest('.form-group').addClass('has-error');
                            self.$registerError.html(Config.stringsDict.USER.REGISTER_ERROR.USERNAME_ALREADY_EXISTS);
                            break;
                        case Config.constants.registerErrorsCode.INVALID_EMAIL_ADDRESS:
                            self.$('form #email').closest('.form-group').addClass('has-error');
                            self.$registerError.html(Config.stringsDict.USER.REGISTER_ERROR.INVALID_EMAIL_ADDRESS);
                            break;
                        case Config.constants.registerErrorsCode.PASSWORD:
                            self.$('form #password').closest('.form-group').addClass('has-error');
                            self.$registerError.html(Config.stringsDict.USER.REGISTER_ERROR.PASSWORD);
                            break;
                        case Config.constants.registerErrorsCode.PASSWORD_MATCH:
                            self.$('form #password_confirm').closest('.form-group').addClass('has-error');
                            self.$registerError.html(Config.stringsDict.USER.REGISTER_ERROR.PASSWORD_MATCH);
                            break;
                        case Config.constants.registerErrorsCode.ACCEPT_CGU:
                            self.$('#accept-cgu-container').addClass('has-error');
                            self.$registerError.html(Config.stringsDict.USER.REGISTER_ERROR.ACCEPT_CGU);
                            break;
                        default:
                            self.$registerError.html(Config.stringsDict.USER.REGISTER_ERROR.DEFAULT_ERROR);
                            break;
                    }
                });
            },

            redirectToLogin: function () {
                Backbone.history.loadUrl("/login");
            }
        });
    }
);
