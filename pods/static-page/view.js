define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'text!pods/static-page/template.html',

        'less!pods/static-page/style'
    ],
    function ($, _, Backbone, Config,
              staticPageTemplate) {

        return Backbone.View.extend({

            className: 'static-page',

            template: _.template(staticPageTemplate),

            events: {
                'click .internal-link': 'scrollTo'
            },

            initialize: function () {
                this.listenTo(this.model, "change", this.render);
            },

            render: function () {
                var html = this.template({
                    content: this.model.toJSON(true)
                });
                this.$el.html(html);

                return this;
            },

            scrollTo: function (e) {
                e.preventDefault();

                var the_id = $(e.currentTarget).attr("href");
                var $target = this.$(the_id);
                var navbarHeight = $('#navbar').height();

                $('html, body').stop().animate({
                    'scrollTop': $target.offset().top - navbarHeight
                }, 'slow');
            }

        });

    }
);
