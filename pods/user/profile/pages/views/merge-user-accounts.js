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

                return this;
            },

            submitMerge: function (e) {
                e.preventDefault();

                var formData = JSON.stringify(this.$el.find('form').serializeObject());
                var self = this;
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/users/phagocyte",
                    data: formData,
                    dataType: 'json'
                }).done(function(result){
                    console.log("Yeah!");
                }).fail(function(error){
                    console.log("Oh :(");
                });
            }
        });
    }
);
