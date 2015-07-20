define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'text!app/header/notifications/template.html'

    ],
    function ($, _, Backbone, Config,
              template) {

        return Backbone.View.extend({

            template: _.template(template),

            classNames: 'notification',

            events: {
                'click button.accept': 'accept',
                'click button.decline': 'decline'
            },

            render: function () {
                var html = this.template({
                    requestingUser: this.requestingUser,
                    config: Config,
                    isTutorRequest: this.isTutorRequest
                });
                this.$el.html(html);

                return this.$el;
            },

            accept: function (e) {
                this.trigger('accept', this, this.requestingUser["_id"]);
            },

            decline: function (e) {
                this.trigger('decline', this, this.requestingUser["_id"]);
            }

        });

    }
);