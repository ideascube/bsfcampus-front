define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryserialize',
        'app/config',

        'pods/user/models/current',
        'text!pods/user/profile/pages/templates/account.html',

        'less!pods/user/profile/pages/styles/account'
    ],
    function($, _, Backbone, $serialize, Config,
             currentUser, accountTemplate
    ) {

        return Backbone.View.extend({

            tagName: 'div',

            id: 'user-profile-account-container',

            className: 'border_radius',

            template: _.template(accountTemplate),

            events: {
                'click button.save_modification': 'saveModifications'
            },

            initialize: function () {
                this.listenTo(currentUser, "change", this.render);
            },

            render: function() {
                var userModel = currentUser.forTemplate();
                var html = this.template({user: userModel, config: Config});
                this.$el.html(html);

                return this;
            },

            saveModifications: function() {
                console.log("save user profile modifications");
                var formData = JSON.stringify(this.$el.find('form').serializeObject());
                var $saveButton = this.$el.find('button.save_modification');
                $saveButton.addClass('disabled');
                var $accountSaveResult = this.$el.find('.save-result');
                $accountSaveResult.removeClass('success');
                $accountSaveResult.removeClass('fail');
                $.ajax({
                    type: 'PATCH',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/users/current",
                    data: formData,
                    dataType: 'json'
                }).done(function(result){
                    console.log(JSON.stringify(result));
                    currentUser.set(currentUser.parse(result));
                    $accountSaveResult.html(Config.stringsDict.USER.PROFILE.ACCOUNT.SAVE_SUCCESS_MESSAGE);
                    $accountSaveResult.addClass('success');
                    $saveButton.removeClass('disabled');
                }).fail(function(error){
                    console.log("Could not post user modifications", error);
                    $accountSaveResult.html(Config.stringsDict.USER.PROFILE.ACCOUNT.SAVE_FAIL_MESSAGE);
                    $accountSaveResult.addClass('fail');
                    $saveButton.removeClass('disabled');
                });
            }

        });

    }
);
