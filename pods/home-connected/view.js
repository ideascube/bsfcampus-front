define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/user/models/current',

        'text!pods/home-connected/template.html',

        'less!pods/home-connected/style'
    ],
    function($, _, Backbone, Config,
             currentUser,
             homeTemplate
    ) {

        return Backbone.View.extend({

            template: _.template(homeTemplate),

            events: {
                'click #button_formations': 'goToTracks',
                'click #button_tutorat': 'goToProfile',
                'click #scroll-arrow': 'scrollTo'
            },

            initialize: function () {
                this.listenTo(currentUser, "change", this.render);
            },

            render: function() {
                var html = this.template({
                    currentUser: currentUser.toJSON(true),
                    config: Config
                });
                this.$el.html(html);

                this.$("#first-window").css('background-image', 'url(' + Config.imagesDict.home.bsfHomeImage + ')');

                return this;
            },

            goToTracks: function(e) {
                e.preventDefault();

                Backbone.history.navigate("/track", {trigger:true});
            },

            goToProfile: function(e) {
                e.preventDefault();

                Backbone.history.navigate("/user/profile/" + Config.constants.userProfile.TUTORING, {trigger:true});
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
