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

                this.$resetError = this.$("#reset-error");
                this.$resetBtn = this.$("#reset-btn");

                return this;
            },

            submit: function (e) {
                e.preventDefault();

                this.$('form .has-error').removeClass('has-error');
                this.$resetError.empty();
                this.$resetBtn.html(Config.stringsDict.USER.RESETTING);
                this.$resetBtn.addClass('disabled');
                this.$resetBtn.attr('disabled', true);

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
                    self.$resetBtn.html(Config.stringsDict.USER.RESET_PASSWORD);
                    self.$resetBtn.removeClass('disabled');
                    self.$resetBtn.attr('disabled', false);
                    switch (error.responseJSON.code){
                        case Config.constants.resetPasswordErrorsCode.LOCAL_SERVER:
                            $resetError.html(Config.stringsDict.USER.RESET_PASSWORD_MESSAGE.LOCAL_SERVER);
                            break;
                        case Config.constants.resetPasswordErrorsCode.INVALID_EMAIL_ADDRESS:
                            self.$('form input#email').closest('.form-control').addClass('has-error');
                            self.$resetError.html(Config.stringsDict.USER.RESET_PASSWORD_MESSAGE.INVALID_EMAIL_ADDRESS);
                            break;
                        case Config.constants.resetPasswordErrorsCode.INVALID_USERNAME:
                            self.$('form input#username').closest('.form-control').addClass('has-error');
                            self.$resetError.html(Config.stringsDict.USER.RESET_PASSWORD_MESSAGE.INVALID_USERNAME);
                            break;
                        default:
                            self.$resetError.html(Config.stringsDict.USER.RESET_PASSWORD_MESSAGE.DEFAULT_ERROR);
                            break;
                    }
                });
            }
        });
    }
);
