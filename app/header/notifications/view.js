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

            tagName: 'li',

            className: 'notification',

            template: _.template(template),

            events: {
                'click .btn-accept': 'accept',
                'click .btn-decline': 'decline',
                'click .btn-acknowledge': 'acknowledge'
            },

            render: function () {
                var html = this.template({
                    user: this.user,
                    config: Config,
                    isTutorRequest: this.isTutorRequest,
                    isAcknowledgeNotification: this.isAcknowledgeNotification
                });
                this.$el.html(html);

                return this;
            },

            accept: function (e) {
                this.trigger('accept', this, this.user["_id"]);
            },

            decline: function (e) {
                this.trigger('decline', this, this.user["_id"]);
            },

            acknowledge: function (e) {
                this.trigger('acknowledge', this, this.user["_id"]);
            }

        });

    }
);