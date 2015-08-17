define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryserialize',
        'viewmanager',
        'app/config',

        'pods/user/models/current',
        'text!pods/user/profile/pages/templates/account.html',

        'pods/user/profile/pages/views/merge-user-accounts',

        'less!pods/user/profile/pages/styles/account'
    ],
    function($, _, Backbone, $serialize, VM, Config,
             currentUser, accountTemplate,
             MergeAccountModalView
    ) {

        return Backbone.View.extend({

            id: 'user-profile-dashboard-container',

            className: 'panel panel-default',

            template: _.template(accountTemplate),

            events: {
                'submit form': 'saveModifications',
                'click .btn-merge-user-account': 'openMergeUsersModal'
            },

            initialize: function () {
                this.listenTo(currentUser, "change", this.render);
            },

            render: function() {
                var userModel = currentUser.toJSON(true);
                var html = this.template({user: userModel, config: Config});
                this.$el.html(html);

                return this;
            },

            saveModifications: function(e) {
                e.preventDefault();

                var formData = JSON.stringify(this.$('form').serializeObject());
                var $saveButton = this.$('button.btn-save-modification');
                $saveButton.prop('disabled', true);
                var $accountSaveResult = this.$('#save-result');
                $accountSaveResult.removeClass('text-success text-danger');
                $.ajax({
                    type: 'PATCH',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/users/current",
                    data: formData,
                    dataType: 'json'
                }).done(function(result){
                    currentUser.set(currentUser.parse(result));
                    $accountSaveResult.html(Config.stringsDict.USER.PROFILE.ACCOUNT.SAVE_SUCCESS_MESSAGE);
                    $accountSaveResult.addClass('text-success');
                    $saveButton.prop('disabled', false);
                }).fail(function(error){
                    console.log("Could not post user modifications", error);
                    $accountSaveResult.html(Config.stringsDict.USER.PROFILE.ACCOUNT.SAVE_FAIL_MESSAGE);
                    $accountSaveResult.addClass('text-danger');
                    $saveButton.prop('disabled', false);
                });
            },

            openMergeUsersModal: function(e) {
                var mergeAccountModalView = VM.createView(Config.constants.VIEWS_ID.MERGE_ACCOUNT_MODAL, function() {
                    return new MergeAccountModalView();
                });
                $('body').append(mergeAccountModalView.render().$el);
                mergeAccountModalView.$el.on('hidden.bs.modal', function(){
                    VM.closeView(Config.constants.VIEWS_ID.MERGE_ACCOUNT_MODAL);
                }).modal('show');
            }

        });

    }
);
