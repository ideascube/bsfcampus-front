define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryserialize',
        'app/config',

        'model',

        'pods/user/models/current',

        'text!pods/user/profile/pages/templates/merge-user-accounts.html'
    ],
    function ($, _, Backbone, $serialize, Config,
              AbstractModel,
              currentUser,
              mergeTemplate) {

        return Backbone.View.extend({

            className: 'modal',

            template: _.template(mergeTemplate),

            events: {
                'submit form': 'submitMerge'
            },

            render: function () {
                var html = this.template({config: Config});
                this.$el.html(html);

                this.$localServerSelect = this.$('select#local_server');
                this.$submitButton = this.$('form button[type="submit"]');
                this.$feedback = this.$("#merge-feedback").hide();

                this.loadLocalServers();

                return this;
            },

            submitMerge: function (e) {
                e.preventDefault();

                var formData = JSON.stringify(this.$('form').serializeObject());
                var self = this;
                this.$feedback.removeClass("text-success text-danger").empty().hide();
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/users/phagocyte",
                    data: formData,
                    dataType: 'json'
                }).done(function(result){
                    alert(Config.stringsDict.USER.PROFILE.MERGE.SUCCESS);
                    self.$el.modal('hide');
                }).fail(function(jqXHR, textStatus, errorThrown){
                    var message = Config.stringsDict.USER.PROFILE.MERGE.UNKNOWN_ERROR;
                    switch(jqXHR.responseJSON.code) {
                        case 1:
                            message = Config.stringsDict.USER.PROFILE.MERGE.INVALID_CREDENTIALS;
                            break;
                        case 3:
                            message = Config.stringsDict.USER.PROFILE.MERGE.COULD_NOT_PERFORM_MERGE;
                            break;
                    }
                    self.$feedback.addClass("text-danger").html(message).show();
                });
            },

            loadLocalServers: function() {
                var self = this;
                $.get(Config.constants.serverGateway + "/local_servers").done(
                    function(result) {
                        _.each(result.data, function(localServer){
                            // FIXME This way of getting the id is not clean.
                            // Use a Backbone Model instead, in order to use the parse method.
                            var localServerModel = new AbstractModel({data: localServer}, {parse: true});
                            var $option = $('<option></option>');
                            $option.attr("value", localServerModel.id);
                            $option.html(localServerModel.get("name") + " [" + localServerModel.get("key") + "]");
                            self.$localServerSelect.append($option);
                        });
                        self.$submitButton.prop('disabled', false);
                    }
                )
            }

        });
    }
);
