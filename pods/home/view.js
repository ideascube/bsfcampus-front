define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/user/models/current',

        'text!pods/home/template.html',

        'less!pods/home/style'
    ],
    function($, _, Backbone, Config,
             currentUser,
             homeTemplate
    ) {

        return Backbone.View.extend({

            tagName: 'div',

            template: _.template(homeTemplate),

            events: {
                'click .btn-login': 'login',
                'click .btn-register': 'register',
                'click #scroll-arrow': 'scrollTo'
            },

            render: function() {
                this.$el.html(this.template({currentUser: currentUser.forTemplate(), config: Config}));
                this.$("#first-window").css('background-image', 'url(' + Config.imagesDict.home.bsfHomeImage + ')');
                this.$("#third-window").css('background-image', 'url(' + Config.imagesDict.home.bsfHomeImage3 + ')');

                return this;
            },

            login: function(e) {
                e.preventDefault();

                Backbone.history.loadUrl("/login");
            },

            register: function(e) {
                e.preventDefault();

                Backbone.history.loadUrl("/register");
            },

            scrollTo: function (e) {
                e.preventDefault();

                var the_id = $(e.currentTarget).attr("href");
                var $target = this.$(the_id);

                $('html, body').stop().animate({
                    'scrollTop': $target.offset().top
                }, 'slow');
            }
        });
    }
);
