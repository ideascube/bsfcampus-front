/**
 * Created by FredFourcade on 22/05/2015.
 */
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'text!pods/home/template.html',

        'less!pods/home/style'
    ],
    function($, _, Backbone, Config,
             homeTemplate
    ) {

        return Backbone.View.extend({

            tagName: 'div',

            template: _.template(homeTemplate),

            render: function() {
                $("body").removeAttr("style");
                this.$el.html(this.template({config: Config}));

                return this;
            }

        });

    }
);
