define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryserialize',
        'app/config',

        'text!pods/user/connection/templates/reset-password.html',

        'less!pods/user/connection/styles/reset-password'
    ],
    function ($, _, Backbone, $serialize, Config,
              resetPasswordTemplate) {

        return Backbone.View.extend({

            template: _.template(resetPasswordTemplate),

            className: 'modal',

            events: {
                'submit form': 'submit'
            },

            render: function () {
                var html = this.template({config: Config});
                this.$el.html(html);

                this.$resetError = this.$("#register-error");

                return this;
            },

            submit: function (e) {
                e.preventDefault();

                this.$resetError.empty();

                var formData = JSON.stringify(this.$('form').serializeObject());
                var username = this.$('form #username').val();
                var email = this.$('form #email').val();

                var self = this;
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/users/reset_password",
                    data: formData,
                    dataType: 'json'
                }).done(function (result) {
                    alert(Config.stringsDict.USER.RESET_PASSWORD_MESSAGE.PASSWORD_SENT);
                    self.trigger('close');
                }).fail(function (error) {
                    self.$('form .has-error').removeClass('has-error');
                    switch (error.responseJSON.code){
                        case Config.constants.resetPasswordErrorsCode.LOCAL_SERVER:
                            $registerError.html(Config.stringsDict.USER.RESET_PASSWORD_MESSAGE.LOCAL_SERVER);
                            break;
                        case Config.constants.resetPasswordErrorsCode.INVALID_EMAIL_ADDRESS:
                            self.$('form input#email').closest('.form-control').addClass('has-error');
                            self.$registerError.html(Config.stringsDict.USER.RESET_PASSWORD_MESSAGE.INVALID_EMAIL_ADDRESS);
                            break;
                        case Config.constants.resetPasswordErrorsCode.INVALID_USERNAME:
                            self.$('form input#username').closest('.form-control').addClass('has-error');
                            self.$registerError.html(Config.stringsDict.USER.RESET_PASSWORD_MESSAGE.INVALID_USERNAME);
                            break;
                        default:
                            self.$registerError.html(Config.stringsDict.USER.RESET_PASSWORD_MESSAGE.DEFAULT_ERROR);
                            break;
                    }
                });
            }
        });
    }
);
