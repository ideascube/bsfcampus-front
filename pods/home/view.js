/**
 * Created by FredFourcade on 22/05/2015.
 */
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
                'click #home-login-btn': 'login',
                'click #home-register-btn': 'register',
                'click #arrow_center': 'scrollTo'
            },

            initialize: function () {
                this.listenTo(currentUser, "change", this.render);
            },

            render: function() {
                $("body").removeAttr("style");
                console.log("home render", currentUser.id);
                this.$el.html(this.template({currentUser: currentUser.forTemplate(), config: Config}));
                this.$el.find("#first_window").css('background-image', 'url(' + Config.imagesDict.home.bsfHomeImage + ')');
                this.$el.find("#second_window").css('background-image', 'url(' + Config.imagesDict.default_background_image + ')');
                this.$el.find("#third_window").css('background-image', 'url(' + Config.imagesDict.home.bsfHomeImage3 + ')');

                return this;
            },

            login: function() {
                console.log('home -> login');
                Backbone.history.loadUrl("/login");
            },

            register: function() {
                console.log('home -> register');
                Backbone.history.loadUrl("/register");
            },

            scrollTo: function (e) {
                e.preventDefault();

                var the_id = $(e.currentTarget).find('a').attr("href");
                var $target = this.$el.find(the_id);

                $('html, body').stop().animate({
                    'scrollTop': $target.offset().top
                }, 'slow');
            }
        });
    }
);
