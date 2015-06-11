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
                'click #home-register-btn': 'register'
            },

            initialize: function () {
                this.listenTo(currentUser, "change", this.render);
            },

            render: function() {
                $("body").removeAttr("style");
                console.log("home render", currentUser.id);
                this.$el.html(this.template({currentUser: currentUser, config: Config}));

                return this;
            },

            login: function() {
                console.log('home -> login');
                Backbone.history.loadUrl("/login");
            },

            register: function() {
                console.log('home -> register');
                Backbone.history.loadUrl("/register");
            }

        });

    }
);
