define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryserialize',
        'app/config',

        'pods/user/models/current',
        'text!pods/user/profile/pages/templates/password.html',

        'less!pods/user/profile/pages/styles/password'
    ],
    function($, _, Backbone, $serialize, Config,
             currentUser, accountTemplate
    ) {

        return Backbone.View.extend({

            id: 'user-profile-password-container',

            className: 'panel panel-default',

            template: _.template(accountTemplate),

            events: {
                'submit form': 'saveModifications'
            },

            render: function() {
                var html = this.template({
                    user: currentUser.toJSON(true),
                    config: Config
                });
                this.$el.html(html);
                this.$form = this.$("form");

                return this;
            },

            saveModifications: function(e) {
                e.preventDefault();

                var formData = JSON.stringify(this.$('form').serializeObject());
                var $saveButton = this.$('button.save_modification');
                $saveButton.prop('disabled', true);
                var $passwordSaveResult = this.$('#save-result');
                $passwordSaveResult.empty();
                $passwordSaveResult.removeClass('text-success text-danger');
                var $successIcons = this.$('form img.success-icon');
                $successIcons.removeAttr('src');
                var self = this;
                $.ajax({
                    type: 'PATCH',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/users/current/password",
                    data: formData,
                    dataType: 'json'
                }).done(function(result){
                    $successIcons.attr('src', Config.imagesDict.greenCheck);
                    $passwordSaveResult.html(Config.stringsDict.USER.PROFILE.PASSWORD.SAVE_SUCCESS_MESSAGE);
                    $passwordSaveResult.addClass('text-success');
                    $saveButton.prop('disabled', false);
                    self.$form.find(":input:not([readonly])").val("");
                }).fail(function(error){
                    console.log("Could not change user password", error);
                    var errorCode = error.responseJSON.code;
                    switch (errorCode) {
                        case Config.constants.changePasswordErrorsCode.INVALID_CURRENT_PASSWORD:
                            $passwordSaveResult.html(Config.stringsDict.USER.PROFILE.PASSWORD.CURRENT_PASSWORD_ERROR);
                            self.$("form input#current_password+img.success-icon").attr('src', Config.imagesDict.wrongRed);
                            break;
                        case Config.constants.changePasswordErrorsCode.INVALID_NEW_PASSWORD:
                            $passwordSaveResult.html(Config.stringsDict.USER.PROFILE.PASSWORD.ERROR_NEW_PASSWORD);
                            self.$("form input#current_password+img.success-icon").attr('src', Config.imagesDict.greenCheck);
                            self.$("form input#new_password+img.success-icon").attr('src', Config.imagesDict.wrongRed);
                            break;
                        case Config.constants.changePasswordErrorsCode.INVALID_CONFIRM_PASSWORD:
                            $passwordSaveResult.html(Config.stringsDict.USER.PROFILE.PASSWORD.ERROR_CONFIRM_NEW_PASSWORD);
                            self.$("form input#current_password+img.success-icon").attr('src', Config.imagesDict.greenCheck);
                            self.$("form input#new_password+img.success-icon").attr('src', Config.imagesDict.greenCheck);
                            self.$("form input#confirm_new_password+img.success-icon").attr('src', Config.imagesDict.wrongRed);
                            break;
                    }
                    $passwordSaveResult.addClass('text-danger');
                    $saveButton.prop('disabled', false);
                });
            }

        });

    }
);
