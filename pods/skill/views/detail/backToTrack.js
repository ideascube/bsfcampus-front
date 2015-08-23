define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'view',

        'text!pods/skill/templates/detail/back-to-track.html'
    ],
    function ($, _, Backbone, Config,
              AbstractView,
              backToTrackTemplate) {

        return AbstractView.extend({

            tagName: 'a',
            attributes: function(){
                return {
                    href: this.model.route()
                }
            },

            template: _.template(backToTrackTemplate),

            renderMinimum: function () {
                var html = this.template({
                    track: this.model.toJSON(true),
                    config: Config
                });
                this.$el.html(html);

                return this;
            }

        });

    }
);