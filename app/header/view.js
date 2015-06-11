define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/user/models/current',

        'text!app/header/template.html'
    ],
    function ($, _, Backbone, Config,
              currentUser,
              template) {

        return Backbone.View.extend({

            el: $('#header'),

            template: _.template(template),

            events: {
                'click #navbar-login-btn': 'login'
            },

            initialize: function () {
                this.listenTo(currentUser, "change", this.render);
            },

            render: function () {
                var html = this.template({currentUser: currentUser.forTemplate(), config: Config});
                this.$el.html(html);

                this.updateHeaderButtonFocus(this.currentFocusedElement);
            },

            login: function (e) {
                e.preventDefault();
                console.log('header -> login');
                Backbone.history.loadUrl("/login");
            },

            resetHeaderButtonFocus: function () {
                this.$el.find('#navbar-home-btn').removeClass('focus');
                this.$el.find('#navbar-tracks-btn').removeClass('focus');
                this.$el.find('#navbar-login-btn').removeClass('focus');
            },

            updateHeaderButtonFocus: function (element) {
                this.resetHeaderButtonFocus();
                this.currentFocusedElement = element;
                var buttonId = null;
                switch (element) {
                    case 'home':
                        buttonId = '#navbar-home-btn';
                        break;
                    case 'hierarchy':
                        buttonId = '#navbar-tracks-btn';
                        break;
                    case 'user':
                        buttonId = 'navbar-user-btn';
                        break;
                }
                if (buttonId != null)
                {
                    this.$el.find(buttonId).addClass('focus');
                }
            }

        });

    }
);
