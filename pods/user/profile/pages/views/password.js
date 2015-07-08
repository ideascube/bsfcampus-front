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

            tagName: 'div',

            id: 'user-profile-password-container',

            template: _.template(accountTemplate),

            events: {
                'click button.save_modification': 'saveModifications'
            },

            render: function() {
                var html = this.template({config: Config});
                this.$el.html(html);

                return this;
            },

            saveModifications: function() {
                console.log("save user profile modifications");
                var formData = this.$el.find('form').serializeJSON();
                var $saveButton = this.$el.find('button.save_modification');
                $saveButton.addClass('disabled');
                var $passwordSaveResult = this.$el.find('.save-result');
                $passwordSaveResult.html('');
                $passwordSaveResult.removeClass('success');
                $passwordSaveResult.removeClass('fail');
                var $successIcons = this.$el.find('form img.success-icon');
                $successIcons.removeAttr('src');
                var self = this;
                $.ajax({
                    type: 'PATCH',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/users/current/password",
                    data: formData,
                    dataType: 'json'
                }).done(function(result){
                    console.log(JSON.stringify(result));
                    $successIcons.attr('src', Config.imagesDict.greenCheck);
                    $passwordSaveResult.html(Config.stringsDict.USER.PROFILE.PASSWORD.SAVE_SUCCESS_MESSAGE);
                    $passwordSaveResult.addClass('success');
                    $saveButton.removeClass('disabled');
                }).fail(function(error){
                    console.log("Could not change user password", error);
                    var errorCode = error.responseJSON.code;
                    switch (errorCode) {
                        case Config.constants.changePasswordErrorsCode.INVALID_CURRENT_PASSWORD:
                            self.$el.find("form input#current_password+img.success-icon").attr('src', Config.imagesDict.wrongRed);
                            break;
                        case Config.constants.changePasswordErrorsCode.INVALID_NEW_PASSWORD:
                            self.$el.find("form input#current_password+img.success-icon").attr('src', Config.imagesDict.greenCheck);
                            self.$el.find("form input#new_password+img.success-icon").attr('src', Config.imagesDict.wrongRed);
                            break;
                        case Config.constants.changePasswordErrorsCode.INVALID_CONFIRM_PASSWORD:
                            self.$el.find("form input#current_password+img.success-icon").attr('src', Config.imagesDict.greenCheck);
                            self.$el.find("form input#new_password+img.success-icon").attr('src', Config.imagesDict.greenCheck);
                            self.$el.find("form input#confirm_new_password+img.success-icon").attr('src', Config.imagesDict.wrongRed);
                            break;
                    }
                    $passwordSaveResult.html(Config.stringsDict.USER.PROFILE.PASSWORD.SAVE_FAIL_MESSAGE);
                    $passwordSaveResult.addClass('fail');
                    $saveButton.removeClass('disabled');
                });
            }

        });

    }
);
