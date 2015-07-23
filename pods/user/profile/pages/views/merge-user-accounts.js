define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryserialize',
        'app/config',

        'pods/user/models/current',

        'text!pods/user/profile/pages/templates/merge-user-accounts.html'
    ],
    function ($, _, Backbone, $serialize, Config,
              currentUser,
              mergeTemplate) {

        return Backbone.View.extend({

            tagName: 'div',

            template: _.template(mergeTemplate),

            events: {
                'submit form': 'submitMerge'
            },

            render: function () {
                var html = this.template({config: Config});
                this.$el.html(html);

                this.$localServerSelect = this.$('select#local_server');
                this.$('form button[type="submit"]').prop('disabled', true);

                this.loadLocalServers();

                return this;
            },

            submitMerge: function (e) {
                e.preventDefault();

                var formData = JSON.stringify(this.$('form').serializeObject());
                var self = this;
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/users/phagocyte",
                    data: formData,
                    dataType: 'json'
                }).done(function(result){
                    alert("Successfuly absorbed user account :)");
                }).fail(function(error){
                    alert("Could not absorb user account :(");
                    console.log(error);
                });
            },

            loadLocalServers: function() {
                var self = this;
                $.get(Config.constants.serverGateway + "/local_servers").done(
                    function(result) {
                        _.each(result.data, function(localServer){
                            // FIXME This way of getting the id is not clean.
                            // Use a Backbone Model instead, in order to use the parse method.
                            var html = "<option value=\"" + localServer['_id']['$oid'] + "\">"
                                + localServer['name']
                                + " [" + localServer['key'] + "]"
                                + "</option>\n";
                            self.$localServerSelect.append(html);
                        });
                        self.$('form button[type="submit"]').prop('disabled', false);
                    }
                )
            }

        });
    }
);
