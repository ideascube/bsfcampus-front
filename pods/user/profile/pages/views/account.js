define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryserialize',
        'app/config',

        'pods/user/models/current',
        'text!pods/user/profile/pages/templates/account.html',

        'pods/user/profile/pages/views/merge-user-accounts',

        'less!pods/user/profile/pages/styles/account'
    ],
    function($, _, Backbone, $serialize, Config,
             currentUser, accountTemplate,
             MergeAccountModalView
    ) {

        return Backbone.View.extend({

            tagName: 'div',

            id: 'user-profile-account-container',

            template: _.template(accountTemplate),

            events: {
                'submit form': 'saveModifications',
                'click .btn-merge-user-account': 'openMergeUsersModal'
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

            saveModifications: function(e) {
                e.preventDefault();

                var formData = JSON.stringify(this.$('form').serializeObject());
                var $saveButton = this.$('button.btn-save-modification');
                $saveButton.addClass('disabled');
                var $accountSaveResult = this.$('.save-result');
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
            },

            openMergeUsersModal: function(e) {
                var mergeAccountModalView = new MergeAccountModalView({});
                mergeAccountModalView.render();

                var $modal = $('#modal');
                var $modalDialog = $modal.find('.modal-dialog');
                $modalDialog.html(mergeAccountModalView.$el);
                $modal.modal({show: true});
            }

        });

    }
);
