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

            tagName: 'div',

            template: _.template(homeTemplate),

            events: {
                'click button#button_formations': 'goToTracks',
                'click button#button_tutorat': 'goToProfile',
                'click #arrow_center': 'scrollTo'
            },

            initialize: function () {
                this.listenTo(currentUser, "change", this.render);
            },

            render: function() {
                $("body").removeAttr("style");

                this.$el.html(this.template({currentUser: currentUser.forTemplate(), config: Config}));
                this.$el.find("#first_window").css('background-image', 'url(' + Config.imagesDict.home.bsfHomeImage + ')');
                this.$el.find("#second_window").css('background-image', 'url(' + Config.imagesDict.default_background_image + ')');

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

                var the_id = $(e.currentTarget).find('a').attr("href");
                var $target = this.$el.find(the_id);

                $('html, body').stop().animate({
                    'scrollTop': $target.offset().top
                }, 'slow');
            }
        });
    }
);
